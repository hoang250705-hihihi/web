import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { nhanvienController } from "../controllers/nhanvien.controller.js";
import { danhmucController } from "../controllers/danhmuc.controller.js";
import { khachhangController } from "../controllers/khachhang.controller.js";
import { sanphamController } from "../controllers/sanpham.controller.js";
import { uploadSanPham } from "../middlewares/upload.middleware.js";
import { sanphamService } from "../services/sanpham.service.js";

import {
  registerSchema,
  loginSchema,
} from "../validators/authens/auth.validator.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { POLICIES } from "../utils/constants/policies.js";
import { authorizePolicy } from "../middlewares/policy.middleware.js";

const router = Router();

/* ================= AUTH ================= */
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

/* ================= USERS ================= */
router.get(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_ALL),
  userController.getAll
);

router.get(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_VIEW_SELF),
  userController.getById
);

router.post(
  "/users",
  authenticate,
  authorizePolicy(POLICIES.USER_CREATE),
  userController.create
);

router.put(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_UPDATE),
  userController.update
);

router.delete(
  "/users/:id",
  authenticate,
  authorizePolicy(POLICIES.USER_DELETE),
  userController.delete
);

/* ================= NHÂN VIÊN ================= */
router.get(
  "/nhanvien",
  authenticate,
  authorizePolicy(POLICIES.NHANVIEN_VIEW_ALL),
  nhanvienController.getAll
);

router.get(
  "/nhanvien/:manv",
  authenticate,
  authorizePolicy(POLICIES.NHANVIEN_VIEW_SELF),
  nhanvienController.getById
);

router.post(
  "/nhanvien",
  authenticate,
  authorizePolicy(POLICIES.NHANVIEN_CREATE),
  nhanvienController.create
);

router.put(
  "/nhanvien/:manv",
  authenticate,
  authorizePolicy(POLICIES.NHANVIEN_UPDATE),
  nhanvienController.update
);

router.delete(
  "/nhanvien/:manv",
  authenticate,
  authorizePolicy(POLICIES.NHANVIEN_DELETE),
  nhanvienController.delete
);

/* ================= DANH MỤC ================= */
/* API nên có auth, web routes mới public */
router.get(
  "/danhmuc",
  authenticate,
  authorizePolicy(POLICIES.DANHMUC_VIEW_ALL),
  danhmucController.getAll
);

router.get(
  "/danhmuc/:madm",
  authenticate,
  authorizePolicy(POLICIES.DANHMUC_VIEW_SELF),
  danhmucController.getById
);

router.post(
  "/danhmuc",
  authenticate,
  authorizePolicy(POLICIES.DANHMUC_CREATE),
  danhmucController.create
);

router.put(
  "/danhmuc/:madm",
  authenticate,
  authorizePolicy(POLICIES.DANHMUC_UPDATE),
  danhmucController.update
);

router.delete(
  "/danhmuc/:madm",
  authenticate,
  authorizePolicy(POLICIES.DANHMUC_DELETE),
  danhmucController.delete
);

/* ================= KHÁCH HÀNG ================= */
router.get(
  "/khachhang",
  authenticate,
  authorizePolicy(POLICIES.KHACHHANG_VIEW_ALL),
  khachhangController.getAll
);

router.get(
  "/khachhang/:makh",
  authenticate,
  authorizePolicy(POLICIES.KHACHHANG_VIEW_SELF),
  khachhangController.getById
);

router.post(
  "/khachhang",
  authenticate,
  authorizePolicy(POLICIES.KHACHHANG_CREATE),
  khachhangController.create
);

router.put(
  "/khachhang/:makh",
  authenticate,
  authorizePolicy(POLICIES.KHACHHANG_UPDATE),
  khachhangController.update
);

router.delete(
  "/khachhang/:makh",
  authenticate,
  authorizePolicy(POLICIES.KHACHHANG_DELETE),
  khachhangController.delete
);

/* ================= SẢN PHẨM ================= */
/* Xem sản phẩm: public */
router.get("/sanpham", sanphamController.getAll);
router.get("/sanpham/:masp", sanphamController.getById);

/* Quản lý sản phẩm */
router.post(
  "/sanpham",
  authenticate,
  authorizePolicy(POLICIES.SANPHAM_CREATE),
  uploadSanPham.single("hinhanh"),
  sanphamController.create
);

router.put(
  "/sanpham/:masp",
  authenticate,
  authorizePolicy(POLICIES.SANPHAM_UPDATE),
  sanphamController.update
);

router.delete(
  "/sanpham/:masp",
  authenticate,
  authorizePolicy(POLICIES.SANPHAM_DELETE),
  sanphamController.delete
);

/* ================= THANH TOÁN ================= */
router.post(
  "/checkout",
  authenticate, // ❗ BẮT BUỘC
  async (req, res) => {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    try {
      for (const item of cart) {
        await sanphamService.decreaseStock(item.id, item.quantity);
      }

      res.json({ message: "Thanh toán thành công" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

export default router;
