import { khachhangRepository } from "../repositories/khachhang.repository.js";
import { KhachHangDTO } from "../dtos/khachhang/khachhang.dto.js";
import { logger } from "../config/logger.js";

export const khachhangService = {
  getAll: async () => {
    logger.info("Service: Getting all khachhang");
    const rows = await khachhangRepository.getAll();
    return rows.map((k) => new KhachHangDTO(k));
  },

  getById: async (makh) => {
    logger.info(`Service: Getting khachhang ${makh}`);
    const kh = await khachhangRepository.getById(makh);
    if (!kh) throw new Error("Khách hàng không tồn tại");
    return new KhachHangDTO(kh);
  },

  getByUserId: async (user_id) => {
    const kh = await khachhangRepository.getByUserId(user_id);
    if (!kh) throw new Error("Khách hàng không tồn tại");
    return new KhachHangDTO(kh);
  },

  create: async (dto) => {
    logger.info("Service: Creating khachhang");
    const kh = await khachhangRepository.create(dto);
    return new KhachHangDTO(kh);
  },

  update: async (makh, dto) => {
    logger.info(`Service: Updating khachhang ${makh}`);
    const existing = await khachhangRepository.getById(makh);
    if (!existing) throw new Error("Khách hàng không tồn tại");
    const kh = await khachhangRepository.update(makh, dto);
    return new KhachHangDTO(kh);
  },

  delete: async (makh) => {
    logger.info(`Service: Deleting khachhang ${makh}`);
    const existing = await khachhangRepository.getById(makh);
    if (!existing) throw new Error("Khách hàng không tồn tại");
    await khachhangRepository.delete(makh);
    return { message: "Xóa khách hàng thành công" };
  },
};
