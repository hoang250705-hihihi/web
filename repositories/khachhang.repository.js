import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const khachhangRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all khachhang");
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM khachhang");
    return rows;
  },

  getById: async (makh) => {
    logger.info(`Repository: Fetching khachhang ${makh}`);
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM khachhang WHERE makh = ?",
      [makh]
    );
    return rows[0];
  },

  getByUserId: async (user_id) => {
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM khachhang WHERE user_id = ?",
      [user_id]
    );
    return rows[0];
  },

  create: async ({ tenkh, phone, user_id }) => {
    logger.info("Repository: Creating khachhang");
    const db = await pool;
    const [result] = await db.query(
      `
      INSERT INTO khachhang (tenkh, phone, user_id)
      VALUES (?, ?, ?)
      `,
      [tenkh, phone, user_id]
    );
    return { makh: result.insertId, tenkh, phone, user_id };
  },

  update: async (makh, { tenkh, phone }) => {
    logger.info(`Repository: Updating khachhang ${makh}`);
    const db = await pool;
    await db.query(
      `
      UPDATE khachhang
      SET tenkh = ?, phone = ?
      WHERE makh = ?
      `,
      [tenkh, phone, makh]
    );
    return { makh, tenkh, phone };
  },

  delete: async (makh) => {
    logger.info(`Repository: Deleting khachhang ${makh}`);
    const db = await pool;
    await db.query("DELETE FROM khachhang WHERE makh = ?", [makh]);
    return true;
  },
};
