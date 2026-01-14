import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const sanphamRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all sanpham");
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM sanpham");
    return rows;
  },

  getById: async (masp) => {
    logger.info(`Repository: Fetching sanpham ${masp}`);
    const db = await pool;
    const [rows] = await db.query(
      "SELECT * FROM sanpham WHERE masp = ?",
      [masp]
    );
    return rows[0];
  },

  create: async (data) => {
    const db = await pool;
    const [result] = await db.query(
      `
      INSERT INTO sanpham (tensp, madm, giatien, soluongcon, mota, hinhanh)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        data.tensp,
        data.madm,
        data.giatien,
        data.soluongcon,
        data.mota,
        data.hinhanh,
      ]
    );

    return { masp: result.insertId, ...data };
  },


  update: async (masp, dto) => {
    logger.info(`Repository: Updating sanpham ${masp}`);
    const db = await pool;
    await db.query(
      `
      UPDATE sanpham
      SET tensp=?, madm=?, mota=?, giatien=?, soluongcon=?
      WHERE masp=?
      `,
      [
        dto.tensp,
        dto.madm,
        dto.mota,
        dto.giatien,
        dto.soluongcon,
        masp,
      ]
    );
    return { masp, ...dto };
  },

  delete: async (masp) => {
    logger.info(`Repository: Deleting sanpham ${masp}`);
    const db = await pool;
    await db.query("DELETE FROM sanpham WHERE masp = ?", [masp]);
    return true;
  },
  // Cho giao dien
  // lấy sản phẩm theo danh mục
  getByDanhMuc: async (madm) => {
  const db = await pool;
  const [rows] = await db.query(
    "SELECT * FROM sanpham WHERE madm = ?",
    [madm]
  );
  return rows;
  },
  // cap nhat so luong con
  updateStock: async (id, newStock) => {
    const db = await pool;
    await db.query(
      "UPDATE sanpham SET soluongcon = ? WHERE masp = ?",
      [newStock, id]
    );
  },

  searchByName: async (keyword) => {
    logger.info(`Repository: Searching sanpham by name: ${keyword}`);
    const db = await pool;
    const [rows] = await db.query(
      `
      SELECT * FROM sanpham
      WHERE tensp LIKE ?
      ORDER BY masp DESC
      `,
      [`%${keyword}%`]
    );
    return rows;
  }
};
