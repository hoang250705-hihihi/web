// Chỉ ADMIN
export const adminGuard = (req, res, next) => {
  const user = res.locals.user;

  if (!user || user.role !== "admin") {
    return res.status(403).render("error", {
      message: "Chỉ admin mới được truy cập",
    });
  }

  next();
};

// ADMIN + NHÂN VIÊN
export const adminOrNhanVienGuard = (req, res, next) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).render("error", {
      message: "Bạn chưa đăng nhập",
    });
  }

  if (user.role !== "admin" && user.role !== "nhanvien") {
    return res.status(403).render("error", {
      message: "Bạn không có quyền truy cập",
    });
  }

  next();
};
