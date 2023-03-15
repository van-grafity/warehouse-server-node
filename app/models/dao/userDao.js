const db = require('../db.js');

module.exports = {
  FindUserEmail: async (email) => {
    let sql = `SELECT * FROM user WHERE email = ?`;
    return await db.query(sql, [email]);
  },
  FindUserId: async (id) => {
    let sql = `SELECT * FROM user WHERE id = ?`;
    return await db.query(sql, [id]);
  },
  Register: async (name, phone, email, password) => {
    let sql = `INSERT INTO user (name, phone, email, password) VALUES (?, ?, ?, ?)`;
    return await db.query(sql, [name, phone, email, password]);
  },
  Login: async (email) => {
    let sql = `SELECT 
    user.id,
    user.password, 
    user.name, 
    user.email, 
    user.phone
    FROM user
    WHERE user.email = ?`;
    return await db.query(sql, [email]);
  },
  UpdateUser: async (user_id, name, phone, email, password) => {
    let sql = `UPDATE user SET name = ?, phone = ?, email = ?, password = ? WHERE id = ?`;
    return await db.query(sql, [name, phone, email, password, user_id]);
  },
  User: async (userId) => {
    const sql = 'SELECT * FROM user WHERE id = ?';
    return await db.query(sql, [userId]);
  },
  UpdateAvatar: async (userId, avatar) => {
    const sql = 'UPDATE user SET image = ? WHERE id = ?';
    return await db.query(sql, [avatar, userId]);
  },
  UpdateInfo: async (userId, name, phone, email) => {
    const sql = 'UPDATE user SET name = ?, phone = ?, email = ? WHERE id = ?';
    return await db.query(sql, [name, phone, email, userId]);
  },
  GetUser: async (userId) => {
    const sql = `SELECT * FROM user WHERE id = ?`;
    return await db.query(sql, [userId]);
  },
  GetAllUser: async () => {
    const sql = `SELECT * FROM user`;
    return await db.query(sql);
  },
  DeleteUser: async (userId) => {
    const sql = 'DELETE FROM user WHERE id = ?';
    return await db.query(sql, [userId]);
  },
  UpdatePassword: async (userId, password) => {
    const sql = `UPDATE user SET password = ? WHERE id = ?`;
    return await db.query(sql, [password, userId]);
  },
  GetUserImage: async (userId) => {
    const sql = `SELECT image FROM user WHERE id = ?`;
    return await db.query(sql, [userId]);
  },
  UploadImage: async (userId, avatar) => {
    const sql = `UPDATE user SET image = ? WHERE id = ?`;
    return await db.query(sql, [avatar, userId]);
  },
  EmailExist: async (email) => {
    const sql = `SELECT email FROM user WHERE email = ?`;
    return await db.query(sql, [email]);
  },
}