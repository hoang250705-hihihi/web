import { sanphamService } from "../services/sanpham.service.js";
import { CreateSanPhamDTO } from "../dtos/sanpham/create-sanpham.dto.js";
import { UpdateSanPhamDTO } from "../dtos/sanpham/update-sanpham.dto.js";

import { validateCreateSanPham } from "../validators/sanpham/create-sanpham.validator.js";
import { validateUpdateSanPham } from "../validators/sanpham/update-sanpham.validator.js";

import { logger } from "../config/logger.js";

export const sanphamController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /sanpham");
      const data = await sanphamService.getAll();
      res.json(data);
    } catch (err) {
      logger.error("Controller Error: getAll sanpham failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    const masp = +req.params.masp;
    logger.info(`Controller: GET /sanpham/${masp}`);
    try {
      const data = await sanphamService.getById(masp);
      res.json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const dto = new CreateSanPhamDTO({
        ...req.body,
        mota: req.body.mota,
        hinhanh: req.file ? req.file.filename : null,
      });

      const result = await sanphamService.create(dto);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },


  update: async (req, res) => {
    const masp = +req.params.masp;
    try {
      logger.info(`Controller: PUT /sanpham/${masp}`);
      const validData = validateUpdateSanPham(req.body);
      const dto = new UpdateSanPhamDTO(validData);
      const data = await sanphamService.update(masp, dto);
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const masp = +req.params.masp;
    try {
      logger.info(`Controller: DELETE /sanpham/${masp}`);
      const result = await sanphamService.delete(masp);
      res.json(result);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },
};
