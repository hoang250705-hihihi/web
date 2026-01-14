import { nhanvienRepository } from "../repositories/nhanvien.repository.js";
import { NhanVienDTO } from "../dtos/nhanvien/nhanvien.dto.js";
import { logger } from "../config/logger.js";

export const nhanvienService = {
  getAll: async () => {
    logger.info("Service: Getting all nhanvien");
    const rows = await nhanvienRepository.getAll();
    return rows.map((nv) => new NhanVienDTO(nv));
  },

  getById: async (manv) => {
    logger.info(`Service: Getting nhanvien by id ${manv}`);
    const nv = await nhanvienRepository.getById(manv);
    if (!nv) {
      logger.warn(`Service Warning: nhanvien ${manv} not found`);
      throw new Error("Nhân viên không tồn tại");
    }
    return new NhanVienDTO(nv);
  },

  create: async (dto) => {
    logger.info("Service: Creating nhanvien");
    const nv = await nhanvienRepository.create(dto);
    return new NhanVienDTO(nv);
  },

  update: async (manv, dto) => {
    logger.info(`Service: Updating nhanvien ${manv}`);

    const existing = await nhanvienRepository.getById(manv);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update, nhanvien ${manv} not found`);
      throw new Error("Nhân viên không tồn tại");
    }

    const nv = await nhanvienRepository.update(manv, dto);
    return new NhanVienDTO(nv);
  },

  delete: async (manv) => {
    logger.info(`Service: Deleting nhanvien ${manv}`);

    const existing = await nhanvienRepository.getById(manv);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete, nhanvien ${manv} not found`);
      throw new Error("Nhân viên không tồn tại");
    }

    await nhanvienRepository.delete(manv);
    return { message: "Xóa nhân viên thành công" };
  },
};
