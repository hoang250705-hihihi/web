import { danhmucRepository } from "../repositories/danhmuc.repository.js";
import { DanhMucDTO } from "../dtos/danhmuc/danhmuc.dto.js";
import { logger } from "../config/logger.js";

export const danhmucService = {
  getAll: async () => {
    logger.info("Service: Getting all danhmuc");
    const data = await danhmucRepository.getAll();
    return data.map((d) => new DanhMucDTO(d));
  },

  getById: async (madm) => {
    logger.info(`Service: Getting danhmuc by id ${madm}`);
    const dm = await danhmucRepository.getById(madm);
    if (!dm) {
      logger.warn(`Service Warning: danhmuc ${madm} not found`);
      throw new Error("Danh mục không tồn tại");
    }
    return new DanhMucDTO(dm);
  },

  create: async (dto) => {
    logger.info("Service: Creating danhmuc");
    const dm = await danhmucRepository.create(dto);
    return new DanhMucDTO(dm);
  },

  update: async (madm, dto) => {
    logger.info(`Service: Updating danhmuc ${madm}`);

    const existing = await danhmucRepository.getById(madm);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update, danhmuc ${madm} not found`);
      throw new Error("Danh mục không tồn tại");
    }

    const dm = await danhmucRepository.update(madm, dto);
    return new DanhMucDTO(dm);
  },

  delete: async (madm) => {
    logger.info(`Service: Deleting danhmuc ${madm}`);

    const existing = await danhmucRepository.getById(madm);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete, danhmuc ${madm} not found`);
      throw new Error("Danh mục không tồn tại");
    }

    await danhmucRepository.delete(madm);
    return { message: "Xóa danh mục thành công" };
  },
};
