import { Router } from "express";
import { danhmucService } from "../services/danhmuc.service.js";
import { sanphamService } from "../services/sanpham.service.js";
import {adminGuard,adminOrNhanVienGuard,} from "../middlewares/adminOrNhanVienGuard.middleware.js";

const router = Router();

// ================= TRANG CHỦ =================
router.get("/", async (req, res) => {
  const danhmucs = await danhmucService.getAll();
  const sanphams = await sanphamService.getAll();

  res.render("home/index", {
    danhmucs,
    sanphams,
    selectedMadm: null,
  });
});

// ================= LỌC THEO DANH MỤC =================
router.get("/danhmuc/:madm", async (req, res) => {
  const madm = Number(req.params.madm);

  const danhmucs = await danhmucService.getAll();
  const sanphams = await sanphamService.getByDanhMuc(madm);

  res.render("home/index", {
    danhmucs,
    sanphams,
    selectedMadm: madm,
  });
});

// ================= SẢN PHẨM =================
router.get("/sanpham", async (req, res) => {
  const keyword = req.query.keyword || "";
  const sanphams = keyword
    ? await sanphamService.search(keyword)
    : await sanphamService.getAll();

  res.render("sanpham/list", { sanphams, keyword });
});

// ================= CHI TIẾT SẢN PHẨM =================
router.get("/sanpham/:id", async (req, res) => {
  const id = Number(req.params.id);
  const sanpham = await sanphamService.getById(id);

  if (!sanpham) {
    return res.status(404).send("Không tìm thấy sản phẩm");
  }

  res.render("sanpham/detail", { sanpham });
});

// ================= GIỎ HÀNG =================
router.get("/giohang", (req, res) => {
  res.render("giohang/index");
});

// ================= ADMIN =================
router.get("/admin", adminOrNhanVienGuard, (req, res) => {
  res.render("admin/quantri");
});
router.get("/admin/users", adminGuard, (req, res) => {
  res.render("admin/users");
});

router.get("/admin/nhanvien", adminGuard, (req, res) => {
  res.render("admin/nhanvien");
});
router.get("/admin/danhmuc", adminOrNhanVienGuard, (req, res) => {
  res.render("admin/danhmuc");
});

// router.get("/admin/sanpham", adminOrNhanVienGuard, (req, res) => {
//   res.render("admin/sanpham");
// });

router.get("/admin/khachhang", adminOrNhanVienGuard, (req, res) => {
  res.render("admin/khachhang");
});
// ================= ADMIN - SẢN PHẨM =================
router.get("/admin/sanpham", adminOrNhanVienGuard, async (req, res) => {
  console.log("👉 ĐÃ VÀO ROUTE /admin/sanpham");

  const sanphams = await sanphamService.getAll();

  console.log("👉 SỐ LƯỢNG SP:", sanphams.length);

  res.render("admin/sanpham", {
    sanphams,
  });
});



// ================= AUTH (GIAO DIỆN) =================
router.get("/login", (req, res) => {
  res.render("auth/login", {
    email: "",
    error: null,
  });
});

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});


export default router;
