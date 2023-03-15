const db = require('../db.js');

module.exports = {
    GetAllMaterial: async () => {
        let sql = `SELECT
        material.id,
        material.name,
        material.type_id,
        material.part_number,
        material.condition_id,
        material.quantity,
        material.price,
        material.color,
        material.comment,
        material.created_at,
        material.deleted_at,
        material_type.name AS type_name,
        material_condition.name AS condition_name
        FROM material
        INNER JOIN material_type ON material.type_id = material_type.id
        INNER JOIN material_condition ON material.condition_id = material_condition.id
        WHERE material.deleted_at IS NULL`;
        return await db.query(sql);
    },
    GetDeleteMaterial: async () => {
        let sql = `SELECT
        material.id,
        material.name,
        material.type_id,
        material.part_number,
        material.condition_id,
        material.quantity,
        material.price,
        material.color,
        material.comment,
        material.created_at,
        material.deleted_at,
        material_type.name AS type_name,
        material_condition.name AS condition_name
        FROM material
        INNER JOIN material_type ON material.type_id = material_type.id
        INNER JOIN material_condition ON material.condition_id = material_condition.id
        WHERE material.deleted_at IS NOT NULL`;
        return await db.query(sql);
    },
    AddMaterial: async (name, type_id, part_number, condition_id, quantity, price, color, comment) => {
        let sql = `INSERT INTO material (name, type_id, part_number, condition_id, quantity, price, color, comment, created_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NULL)`;
        return await db.query(sql, [name, type_id, part_number, condition_id, quantity, price, color, comment]);
    },
    UpdateMaterial: async (id, name, type_id, part_number, condition_id, quantity, price, color, comment) => {
        let sql = `UPDATE material SET name = ?, type_id = ?, part_number = ?, condition_id = ?, quantity = ?, price = ?, color = ?, comment = ? WHERE id = ?`;
        return await db.query(sql, [name, type_id, part_number, condition_id, quantity, price, color, comment, id]);
    },
    DeleteMaterial: async (name) => {
        let sql = `UPDATE material SET deleted_at = NOW() WHERE name = ?`;
        return await db.query(sql, [name]);
    },
    GetMaterialById: async (id) => {
        let sql = `SELECT
        material.id,
        material.name,
        material.type_id,
        material.part_number,
        material.condition_id,
        material.quantity,
        material.price,
        material.color,
        material.comment,
        material.created_at,
        material.deleted_at,
        material_type.name AS type_name,
        material_condition.name AS condition_name
        FROM material
        INNER JOIN material_type ON material.type_id = material_type.id
        INNER JOIN material_condition ON material.condition_id = material_condition.id
        WHERE material.id = ?`;
        return await db.query(sql, [id]);
    }
}