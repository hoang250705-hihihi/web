import { khachhangService } from "../services/khachhang.service.js";
import { CreateKhachHangDTO } from "../dtos/khachhang/create-khachhang.dto.js";
import { UpdateKhachHangDTO } from "../dtos/khachhang/update-khachhang.dto.js";

import { validateCreateKhachHang } from "../validators/khachhang/create-khachhang.validator.js";
import { validateUpdateKhachHang } from "../validators/khachhang/update-khachhang.validator.js";

import { logger } from "../config/logger.js";

export const khachhangController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /khachhang");
      const data = await khachhangService.getAll();
      res.json(data);
    } catch (err) {
      logger.error("Controller Error: getAll khachhang failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    const makh = +req.params.makh;
    logger.info(`Controller: GET /khachhang/${makh}`);

    try {
      const data = await khachhangService.getById(makh);
      res.json(data);
    } catch (err) {
      logger.error(`Controller Error: getById khachhang failed (${makh})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /khachhang");

      const validData = validateCreateKhachHang(req.body);

      const dto = new CreateKhachHangDTO({
        ...validData,
        user_id:
          req.user.role === "admin"
            ? validData.user_id
            : req.user.id,
      });

      const data = await khachhangService.create(dto);
      res.status(201).json(data);
    } catch (err) {
      logger.error("Controller Error: create khachhang failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const makh = +req.params.makh;
    logger.info(`Controller: PUT /khachhang/${makh}`);

    try {
      const validData = validateUpdateKhachHang(req.body);
      const dto = new UpdateKhachHangDTO(validData);

      const data = await khachhangService.update(makh, dto);
      res.json(data);
    } catch (err) {
      logger.error(`Controller Error: update khachhang failed (${makh})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const makh = +req.params.makh;
    logger.info(`Controller: DELETE /khachhang/${makh}`);

    try {
      const result = await khachhangService.delete(makh);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete khachhang failed (${makh})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
