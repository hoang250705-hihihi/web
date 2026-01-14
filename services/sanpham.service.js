import { sanphamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanpham/sanpham.dto.js";

import { logger } from "../config/logger.js";

export const sanphamService = {
  getAll: async () => {
    logger.info("Service: Getting all sanpham");
    const rows = await sanphamRepository.getAll();
    return rows.map((sp) => new SanPhamDTO(sp));
  },

  getById: async (masp) => {
    logger.info(`Service: Getting sanpham ${masp}`);
    const sp = await sanphamRepository.getById(masp);
    if (!sp) throw new Error("Sản phẩm không tồn tại");
    return new SanPhamDTO(sp);
  },

  create: async (dto) => {
    logger.info("Service: Creating sanpham");
    const sp = await sanphamRepository.create(dto);
    return new SanPhamDTO(sp);
  },

  update: async (masp, dto) => {
    logger.info(`Service: Updating sanpham ${masp}`);
    const existing = await sanphamRepository.getById(masp);
    if (!existing) throw new Error("Sản phẩm không tồn tại");
    const sp = await sanphamRepository.update(masp, dto);
    return new SanPhamDTO(sp);
  },

  delete: async (masp) => {
    logger.info(`Service: Deleting sanpham ${masp}`);
    const existing = await sanphamRepository.getById(masp);
    if (!existing) throw new Error("Sản phẩm không tồn tại");
    await sanphamRepository.delete(masp);
    return { message: "Xóa sản phẩm thành công" };
  },

  //api cho giao diện 
  getAllPublic: async () => {
  return await sanphamRepository.getAllDangBan();
},

  getByDanhMuc: async (madm) => {
  return await sanphamRepository.getByDanhMuc(madm);
},
//trừ số lượng sản phẩm khi thanh toán
decreaseStock: async (id, quantity) => {
  const product = await sanphamRepository.getById(id);

  if (!product) {
    throw new Error("Sản phẩm không tồn tại");
  }

  if (product.soluongcon < quantity) {
    throw new Error(`Sản phẩm ${product.tensp} không đủ số lượng`);
  }

  await sanphamRepository.updateStock(id, product.soluongcon - quantity);
},

    async search(keyword) {
      logger.info(`Service: Searching sanpham by keyword: ${keyword}`);
      const rows = await sanphamRepository.searchByName(keyword);
      return rows.map((sp) => new SanPhamDTO(sp));
    },
  
};
