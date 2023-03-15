const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const fs = require('fs');
const mail_util = require('../../utils/mail');

const userDao = require('../models/dao/userDao.js');
const { reject } = require('bcrypt/promises');

const userController = {
  Register: async (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;
    let user = await userDao.FindUserEmail(email);
    if (user.length === 1) {
      res.json({
        error: true,
        message: 'Register failed, email has been registered',
      })
      return;
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        try {
          let result = await userDao.Register(name, phone, email, hash);
          res.json({
            error: false,
            message: 'Register success'
          })
        } catch (err) {
          res.json({
            error: true,
            message: 'Register failed'
          })
        }
      })
    }
  },
  Login: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await userDao.Login(email);
    if (user.length === 1) {
      if (await bcrypt.compare(password, user[0].password)) {
        let token = jwt.sign({
          id: user[0].id,
          email: user[0].email
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 30 });
        let refreshToken = jwt.sign({
          id: user[0].id,
          email: user[0].email
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        const merge = user.map((item) => {
          return {
            id: item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            is_admin: item.is_admin
          }
        })
        res.json({
          error: false,
          message: 'Login success',
          data: {
            token: token,
            refreshToken: refreshToken,
            user: merge[0]
          }
        })
      } else {
        res.json({
          error: true,
          message: 'Incorrect password',
          data: {
            user: null
          }
        });
      }
    } else {
      res.json({
        error: true,
        message: "Account does not exist",
        data: {
          user: null
        }
      });
    }
  },
  UpdateUser: async (req, res) => {
    let user_id = req.params.user_id;
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;

    bcrypt.hash(password, 10, async (err, hash) => {
      try {
        let result = await userDao.UpdateUser(user_id, name, phone, email, hash);
        res.json({
          error: false,
          message: 'Update success'
        })
      } catch (err) {
        res.json({
          error: true,
          message: 'Update failed'
        })
      }
    })
  },
  RefreshToken: async (req, res) => {
    let refreshToken = req.body.refreshToken;
    let token = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (token) {
      let user = await userDao.FindUserId(token.id);
      if (user.length === 1) {
        let newToken = jwt.sign({
          id: user[0].id,
          email: user[0].email
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({
          error: false,
          message: 'Refresh token success',
          data: {
            token: newToken,
            user: user[0]
          }
        })
      } else {
        res.json({
          error: true,
          message: 'Refresh token failed',
          data: {
            user: null
          }
        })
      }
    }
  },
  GetUser: async (req, res) => {
    let user_id = req.params.id;
    try {
      let user = await userDao.GetUser(user_id);
      if (user.length === 1) {
        res.json({
          error: false,
          message: 'Get user success',
          user: { ...user[0], password: null }
        });
      }
    } catch (error) {
      reject(error);
    }
  },
  GetAllUser: async (req, res) => {
    try {
      let users = await userDao.GetAllUser();
      if (users.length > 0) {
        res.json({
          error: false,
          message: 'Get all user success',
          data: {
            users: users.map((item) => {
              return {
                id: item.id,
                name: item.name,
                email: item.email,
                phone: item.phone,
                is_admin: item.is_admin === 1 ? true : false,
                store: {
                  id: item.store_id,
                  name: item.store_name
                }
              }
            })
          }
        });
      } else {
        res.json({
          error: true,
          message: 'Get all user failed'
        });
      }
    } catch (error) {
      reject(error);
    }
  },
  // delete user by id
  DeleteUser: async (req, res) => {
    let user_id = req.params.user_id;
    try {
      let result = await userDao.DeleteUser(user_id);
      if (result.affectedRows === 1) {
        res.json({
          error: false,
          message: 'Delete user success'
        });
      }
    } catch (error) {
      reject(error);
    }
  },
  UpdatePassword: async (req, res) => {
    let user_id = req.params.user_id;
    let password = req.body.password;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.json({
          error: true,
          message: 'Update password failed, please try again'
        });
        return;
      }
      let result = await userDao.UpdatePassword(user_id, hash);
      if (result.affectedRows > 0) {
        res.json({
          error: false,
          message: 'Update password success'
        });
        return;
      } else {
        res.json({
          error: true,
          message: 'Update password failed, please try again'
        });
        return;
      }
    })
  },
  UploadImage: async (req, res) => {
    let user_id = req.params.id;
    const file = req.file;
    var file_path = ""
    if (file != null) {
      file_path = file.path
    }
    // delete old image
    let oldImage = await userDao.GetImageUser(user_id);
    try {
      fs.unlinkSync(oldImage[0].image);
    }
    catch (err) {
      reject(err);
    }
    // upload new image
    let result = await userDao.UploadImage(user_id, file_path);
    if (result.affectedRows > 0) {
      res.json({
        error: false,
        message: 'Upload image success'
      })
    }
  },
  GetUserImage: async (req, res) => {
    let user_id = req.params.id;
    try {
      let image = await userDao.GetUserImage(user_id);
      if (image.length === 1) {
        res.json({
          error: false,
          message: 'Get image success',
          user: {
            image: image[0].image
          }
        });
      } else {
        res.json({
          error: true,
          message: 'Get image failed'
        });
      }
    } catch (error) {
      reject(error);
    }
  },
  GetUserOtp: async (req, res) => {
    let email = req.body.email;
    let user = await userDao.EmailExist(email);
    try {
      if (user.length > 0) {
        console.log(user[0].email);
        let otp = mail_util.getRandomInt(100000, 999999);
        mail_util.sendOtpMail(email, otp);
        res.json({
          error: false,
          message: 'Send otp success'
        })
      } else {
        res.json({
          error: true,
          message: 'Email not exist'
        })
      }
    }
    catch (err) {
      reject(err);
    }
  }
};

module.exports = userController;