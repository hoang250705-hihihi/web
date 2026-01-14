import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const danhmucRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all danhmuc");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM danhmuc");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll danhmuc failed", err);
      throw err;
    }
  },

  getById: async (madm) => {
    logger.info(`Repository: Fetching danhmuc ${madm}`);
    try {
      const db = await pool;
      const [rows] = await db.query(
        "SELECT * FROM danhmuc WHERE madm = ?",
        [madm]
      );
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getById danhmuc failed (${madm})`, err);
      throw err;
    }
  },

  create: async ({ tendm }) => {
    logger.info("Repository: Creating danhmuc");
    try {
      const db = await pool;
      const [result] = await db.query(
        "INSERT INTO danhmuc (tendm) VALUES (?)",
        [tendm]
      );
      return { madm: result.insertId, tendm };
    } catch (err) {
      logger.error("Repository Error: create danhmuc failed", err);
      throw err;
    }
  },

  update: async (madm, { tendm }) => {
    logger.info(`Repository: Updating danhmuc ${madm}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE danhmuc SET tendm = ? WHERE madm = ?",
        [tendm, madm]
      );
      return { madm, tendm };
    } catch (err) {
      logger.error(`Repository Error: update danhmuc failed (${madm})`, err);
      throw err;
    }
  },

  delete: async (madm) => {
    logger.info(`Repository: Deleting danhmuc ${madm}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM danhmuc WHERE madm = ?", [madm]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete danhmuc failed (${madm})`, err);
      throw err;
    }
  },
};
