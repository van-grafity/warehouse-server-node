const materialDao = require('../models/dao/materialDao');

const materialController = {
    GetAllMaterial: async (req, res) => {
        try {
            let result = await materialDao.GetAllMaterial();
            let total = (await materialDao.GetAllMaterial()).length;
            let datas = [];
            for (let i = 0; i < result.length; i++) {
                datas.push({
                    id: result[i].id,
                    name: result[i].name,
                    type: {
                        id: result[i].type_id,
                        name: result[i].type_name
                    },
                    part_number: result[i].part_number,
                    condition: {
                        id: result[i].condition_id,
                        name: result[i].condition_name
                    },
                    quantity: result[i].quantity,
                    price: result[i].price,
                    color: result[i].color,
                    comment: result[i].comment,
                    created_at: result[i].created_at,
                    deleted_at: result[i].deleted_at,
                })
            }
            res.json({
                error: false,
                message: 'Get all material success',
                data: {
                    material: datas
                }
            })
        } catch (error) {
            res.json({
                error: true,
                message: 'Get all material failed'
            })
        }
    },
    GetDeleteMaterial: async (req, res) => {
        try {
            let result = await materialDao.GetDeleteMaterial();
            let total = (await materialDao.GetDeleteMaterial()).length;
            let datas = [];
            for (let i = 0; i < result.length; i++) {
                datas.push({
                    id: result[i].id,
                    name: result[i].name,
                    type: {
                        id: result[i].type_id,
                        name: result[i].type_name
                    },
                    part_number: result[i].part_number,
                    condition: {
                        id: result[i].condition_id,
                        name: result[i].condition_name
                    },
                    quantity: result[i].quantity,
                    price: result[i].price,
                    color: result[i].color,
                    comment: result[i].comment,
                    created_at: result[i].created_at,
                    deleted_at: result[i].deleted_at,
                })
            }
            res.json({
                error: false,
                message: 'Get all material success',
                data: {
                    material: datas
                }
            })
        } catch (error) {
            res.json({
                error: true,
                message: 'Get all material failed'
            })
        }
    },
    AddMaterial: async (req, res) => {
        let name = req.body.name;
        let type_id = req.body.type_id;
        let part_number = req.body.part_number;
        let condition_id = req.body.condition_id;
        let quantity = req.body.quantity;
        let price = req.body.price;
        let color = req.body.color;
        let comment = req.body.comment;
        try {
            let result = await materialDao.AddMaterial(name, type_id, part_number, condition_id, quantity, price, color, comment);
            let material = await materialDao.GetMaterialById(result.insertId);
            res.json({
                error: false,
                message: 'Add material success',
                id: result.insertId,
                data: {
                    material: {
                        id: material[0].id,
                        name: material[0].name,
                        type: {
                            id: material[0].type_id,
                            name: material[0].type_name
                        },
                        part_number: material[0].part_number,
                        condition: {
                            id: material[0].condition_id,
                            name: material[0].condition_name
                        },
                        quantity: material[0].quantity,
                        price: material[0].price,
                        color: material[0].color,
                        comment: material[0].comment,
                        created_at: material[0].created_at,
                        deleted_at: material[0].deleted_at,
                    }
                }
            })
        } catch (error) {
            res.json({
                error: true,
                message: 'Add material failed'
            })
        }
    },
    UpdateMaterial: async (req, res) => {
        let id = req.query.id;
        let name = req.body.name;
        let type_id = req.body.type_id;
        let part_number = req.body.part_number;
        let condition_id = req.body.condition_id;
        let quantity = req.body.quantity;
        let price = req.body.price;
        let color = req.body.color;
        let comment = req.body.comment;

        try {
            let result = await materialDao.UpdateMaterial(id, name, type_id, part_number, condition_id, quantity, price, color, comment);
            res.json({
                error: false,
                message: 'Update material success'
            })
        } catch (error) {
            res.json({
                error: true,
                message: 'Update material failed'
            })
        }
    },
    DeleteMaterial: async (req, res) => {
        let name = req.query.name;
        try {
            let result = await materialDao.DeleteMaterial(name);
            res.json({
                error: false,
                message: 'Delete material success'
            })
        } catch (error) {
            res.json({
                error: true,
                message: 'Delete material failed'
            })
        }
    }
}

module.exports = materialController;