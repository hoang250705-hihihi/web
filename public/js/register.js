document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault(); // ⛔ chặn submit mặc định

    const form = e.target;

    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        document.getElementById("register-message").innerText =
          result.message || "Đăng ký thất bại";
        return;
      }

      // ✅ THÀNH CÔNG
      alert("🎉 Đăng ký thành công!");
      window.location.href = "/"; // quay về trang chủ
    } catch (err) {
      document.getElementById("register-message").innerText =
        "Lỗi kết nối server";
    }
  });
