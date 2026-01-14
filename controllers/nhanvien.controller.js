import { nhanvienService } from "../services/nhanvien.service.js";
import { CreateNhanVienDTO } from "../dtos/nhanvien/create-nhanvien.dto.js";
import { UpdateNhanVienDTO } from "../dtos/nhanvien/update-nhanvien.dto.js";

import { validateCreateNhanVien } from "../validators/nhanvien/create-nhanvien.validator.js";
import { validateUpdateNhanVien } from "../validators/nhanvien/update-nhanvien.validator.js";

import { logger } from "../config/logger.js";

export const nhanvienController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /nhanvien");
      const data = await nhanvienService.getAll();
      res.json(data);
    } catch (err) {
      logger.error("Controller Error: getAll nhanvien failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    const manv = +req.params.manv;
    logger.info(`Controller: GET /nhanvien/${manv}`);

    try {
      const data = await nhanvienService.getById(manv);
      res.json(data);
    } catch (err) {
      logger.error(`Controller Error: getById nhanvien failed (${manv})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /nhanvien");

      const validData = validateCreateNhanVien(req.body);

      const dto = new CreateNhanVienDTO({
        ...validData,
        user_id:
          req.user.role === "admin"
            ? validData.user_id // admin chỉ định
            : req.user.id,      // nhân viên tự tạo
      });

      const data = await nhanvienService.create(dto);
      res.status(201).json(data);
    } catch (err) {
      logger.error("Controller Error: create nhanvien failed", err);
      res.status(400).json({ message: err.message });
    }
  },


  update: async (req, res) => {
    const manv = +req.params.manv;
    logger.info(`Controller: PUT /nhanvien/${manv}`);

    try {
      const validData = validateUpdateNhanVien(req.body);
      const dto = new UpdateNhanVienDTO(validData);

      const data = await nhanvienService.update(manv, dto);
      res.json(data);
    } catch (err) {
      logger.error(`Controller Error: update nhanvien failed (${manv})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const manv = +req.params.manv;
    logger.info(`Controller: DELETE /nhanvien/${manv}`);

    try {
      const result = await nhanvienService.delete(manv);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete nhanvien failed (${manv})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
