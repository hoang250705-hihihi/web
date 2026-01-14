import { Router } from "express";
import { danhmucService } from "../services/danhmuc.service.js";
import { sanphamService } from "../services/sanpham.service.js";
import {adminGuard,adminOrNhanVienGuard,} from "../middlewares/adminOrNhanVienGuard.middleware.js";
import { uploadSanPham } from "../middlewares/upload.middleware.js";
import { validateCreateSanPham } from "../validators/sanpham/create-sanpham.validator.js";
import { CreateSanPhamDTO } from "../dtos/sanpham/create-sanpham.dto.js";    

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


router.get("/admin/khachhang", adminOrNhanVienGuard, (req, res) => {
  res.render("admin/khachhang");
});
// ================= ADMIN - SẢN PHẨM =================
router.get("/admin/sanpham", adminOrNhanVienGuard, async (req, res) => {
  const keyword = req.query.keyword || "";

  const sanphams = keyword
    ? await sanphamService.searchByName(keyword)
    : await sanphamService.getAll();

  const danhmucs = await danhmucService.getAll();

  res.render("admin/sanpham", {
    sanphams,
    danhmucs,
    keyword,
    success_msg: req.query.success_msg,
    error_msg: req.query.error_msg,
  });
});


// Xử lý POST từ giao diện admin để thêm sản phẩm
router.post(
  "/admin/sanpham",
  adminOrNhanVienGuard,
  uploadSanPham.single("hinhanh"),
  async (req, res) => {
    try {
      const valid = validateCreateSanPham(req.body);
      const dto = new CreateSanPhamDTO({
        ...valid,
        hinhanh: req.file ? req.file.filename : null,
      });

      await sanphamService.create(dto);

      res.redirect(
        "/admin/sanpham?success_msg=" +
          encodeURIComponent("Thêm sản phẩm thành công")
      );
    } catch (err) {
      console.error("Error creating sanpham:", err);
      const params = new URLSearchParams();
      if (err.errors) {
        const errorMsgs = err.errors.map((e) => e.message || e);
        params.set("errors", JSON.stringify(errorMsgs));
      } else {
        params.set("error_msg", err.message || String(err));
      }
      params.set("formData", JSON.stringify(req.body || {}));
      res.redirect("/admin/sanpham?" + params.toString());
    }
  }
);

// ===== FORM SỬA SẢN PHẨM =====
router.get(
  "/admin/sanpham/sua/:masp",
  adminOrNhanVienGuard,
  async (req, res) => {
    const masp = Number(req.params.masp);

    const sanpham = await sanphamService.getById(masp);
    const danhmucs = await danhmucService.getAll();

    if (!sanpham) {
      return res.redirect(
        "/admin/sanpham?error_msg=" +
          encodeURIComponent("Không tìm thấy sản phẩm")
      );
    }

    res.render("admin/sanpham-sua", {
      sanpham,
      danhmucs,
    });
  }
);
// ===== XỬ LÝ SỬA SẢN PHẨM =====
router.post(
  "/admin/sanpham/sua/:masp",
  adminOrNhanVienGuard,
  uploadSanPham.single("hinhanh"),
  async (req, res) => {
    try {
      const masp = Number(req.params.masp);

      const data = {
        tensp: req.body.tensp,
        giatien: req.body.giatien,
        soluongcon: req.body.soluongcon,
        madm: req.body.madm,
        mota: req.body.mota,
      };

      if (req.file) {
        data.hinhanh = req.file.filename;
      }

      await sanphamService.update(masp, data);

      res.redirect(
        "/admin/sanpham?success_msg=" +
          encodeURIComponent("Cập nhật sản phẩm thành công")
      );
    } catch (err) {
      console.error("Error update sanpham:", err);
      res.redirect(
        "/admin/sanpham?error_msg=" +
          encodeURIComponent(err.message || "Lỗi cập nhật sản phẩm")
      );
    }
  }
);

// ===== XÓA SẢN PHẨM =====
router.get(
  "/admin/sanpham/xoa/:masp",
  adminOrNhanVienGuard,
  async (req, res) => {
    try {
      const masp = Number(req.params.masp);

      await sanphamService.delete(masp);

      res.redirect(
        "/admin/sanpham?success_msg=" +
          encodeURIComponent("Xóa sản phẩm thành công")
      );
    } catch (err) {
      console.error("Error delete sanpham:", err);
      res.redirect(
        "/admin/sanpham?error_msg=" +
          encodeURIComponent(err.message || "Lỗi xóa sản phẩm")
      );
    }
  }
);
// ================= ADMIN - DANH MỤC =================
router.get("/admin/danhmuc", adminOrNhanVienGuard, async (req, res) => {
  const danhmucs = await danhmucService.getAll();

  res.render("admin/danhmuc", {
    danhmucs,
    success_msg: req.query.success_msg || null,
    error_msg: req.query.error_msg || null,
  });
});

router.post("/admin/danhmuc", adminOrNhanVienGuard, async (req, res) => {
  try {
    await danhmucService.create(req.body);
    res.redirect("/admin/danhmuc?success_msg=Thêm danh mục thành công");
  } catch (err) {
    res.redirect("/admin/danhmuc?error_msg=Lỗi khi thêm danh mục");
  }
});
router.post(
  "/admin/danhmuc/sua/:id",
  adminOrNhanVienGuard,
  async (req, res) => {
    const id = Number(req.params.id);
    const { tendm } = req.body;

    await danhmucService.update(id, tendm);
    res.sendStatus(200);
  }
);
router.get("/admin/danhmuc/xoa/:madm", adminOrNhanVienGuard, async (req, res) => {
  try {
    await danhmucService.delete(Number(req.params.madm));
    res.redirect("/admin/danhmuc?success_msg=Xóa thành công");
  } catch (err) {
    res.redirect("/admin/danhmuc?error_msg=Không thể xóa danh mục");
  }
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
