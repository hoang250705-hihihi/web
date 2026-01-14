document
  .getElementById("login-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("login-error");

    errorBox.textContent = "";

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // ❌ Sai thông tin
      if (!res.ok) {
        errorBox.textContent = data.message || "Đăng nhập thất bại";
        return;
      }

      // ✅ Đăng nhập thành công
      // Lưu token (nếu cần)
      localStorage.setItem("token", data.token);
      // Sau khi nhận về data.token
      localStorage.setItem("token", data.token);

      // Lưu token vào cookie để server-side views nhận biết
      document.cookie = `token=${data.token}; Max-Age=3600; Path=/; SameSite=Lax`;

      // Quay về trang chủ
      window.location.href = "/";
      // Quay về trang chủ
      window.location.href = "/";
    } catch (err) {
      errorBox.textContent = "Có lỗi xảy ra, vui lòng thử lại";
    }
  });
