import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const nhanvienRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all nhanvien");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM nhanvien");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll nhanvien failed", err);
      throw err;
    }
  },

  getById: async (manv) => {
    logger.info(`Repository: Fetching nhanvien with id ${manv}`);
    try {
      const db = await pool;
      const [rows] = await db.query(
        "SELECT * FROM nhanvien WHERE manv = ?",
        [manv]
      );
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getById nhanvien failed (${manv})`, err);
      throw err;
    }
  },

  create: async ({ tennv, gioitinh, namsinh, phone, user_id }) => {
    logger.info("Repository: Creating nhanvien");
    const db = await pool;

    const [result] = await db.query(
      `
      INSERT INTO nhanvien (tennv, gioitinh, namsinh, phone, user_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [tennv, gioitinh, namsinh, phone, user_id]
    );

    return { manv: result.insertId, tennv, gioitinh, namsinh, phone, user_id };
  },


  update: async (manv, { tennv, gioitinh, namsinh, phone }) => {
    logger.info(`Repository: Updating nhanvien ${manv}`);
    try {
      const db = await pool;
      await db.query(
        `
        UPDATE nhanvien
        SET tennv = ?, gioitinh = ?, namsinh = ?, phone = ?
        WHERE manv = ?
        `,
        [tennv, gioitinh, namsinh, phone, manv]
      );
      return { manv, tennv, gioitinh, namsinh, phone };
    } catch (err) {
      logger.error(`Repository Error: update nhanvien failed (${manv})`, err);
      throw err;
    }
  },

  delete: async (manv) => {
    logger.info(`Repository: Deleting nhanvien ${manv}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM nhanvien WHERE manv = ?", [manv]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete nhanvien failed (${manv})`, err);
      throw err;
    }
  },
};
