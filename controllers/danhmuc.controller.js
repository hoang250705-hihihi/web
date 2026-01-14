import { danhmucService } from "../services/danhmuc.service.js";
import { CreateDanhMucDTO } from "../dtos/danhmuc/create-danhmuc.dto.js";
import { UpdateDanhMucDTO } from "../dtos/danhmuc/update-danhmuc.dto.js";

import { validateCreateDanhMuc } from "../validators/danhmuc/create-danhmuc.validator.js";
import { validateUpdateDanhMuc } from "../validators/danhmuc/update-danhmuc.validator.js";

import { logger } from "../config/logger.js";

export const danhmucController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /danhmuc");
      const data = await danhmucService.getAll();
      res.json(data);
    } catch (err) {
      logger.error("Controller Error: getAll danhmuc failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    const madm = +req.params.madm;
    logger.info(`Controller: GET /danhmuc/${madm}`);

    try {
      const data = await danhmucService.getById(madm);
      res.json(data);
    } catch (err) {
      logger.error(`Controller Error: getById danhmuc failed (${madm})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /danhmuc");

      const validData = validateCreateDanhMuc(req.body);
      const dto = new CreateDanhMucDTO(validData);

      const data = await danhmucService.create(dto);
      res.status(201).json(data);
    } catch (err) {
      logger.error("Controller Error: create danhmuc failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const madm = +req.params.madm;
    logger.info(`Controller: PUT /danhmuc/${madm}`);

    try {
      const validData = validateUpdateDanhMuc(req.body);
      const dto = new UpdateDanhMucDTO(validData);

      const data = await danhmucService.update(madm, dto);
      res.json(data);
    } catch (err) {
      logger.error(`Controller Error: update danhmuc failed (${madm})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const madm = +req.params.madm;
    logger.info(`Controller: DELETE /danhmuc/${madm}`);

    try {
      const result = await danhmucService.delete(madm);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete danhmuc failed (${madm})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
