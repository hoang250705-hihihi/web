document.addEventListener("DOMContentLoaded", () => {
  const qtyInput = document.getElementById("quantity");
  const btnIncrease = document.getElementById("btn-increase");
  const btnDecrease = document.getElementById("btn-decrease");
  const btnAddCart = document.getElementById("btn-add-cart");

  if (!qtyInput || !btnAddCart) return;

  const maxStock = Number(btnAddCart.dataset.stock);

  // ================= TĂNG SỐ LƯỢNG =================
  if (btnIncrease) {
    btnIncrease.addEventListener("click", () => {
      let current = Number(qtyInput.value);
      if (current < maxStock) {
        qtyInput.value = current + 1;
      }
    });
  }

  // ================= GIẢM SỐ LƯỢNG =================
  if (btnDecrease) {
    btnDecrease.addEventListener("click", () => {
      let current = Number(qtyInput.value);
      if (current > 1) {
        qtyInput.value = current - 1;
      }
    });
  }

  // ================= THÊM VÀO GIỎ HÀNG =================
  btnAddCart.addEventListener("click", () => {

    // ❌ CHƯA ĐĂNG NHẬP → KHÔNG CHO THÊM
    if (typeof isLoggedIn !== "undefined" && !isLoggedIn) {
      alert("⚠️ Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      window.location.href = "/login";
      return;
    }

    const productId = btnAddCart.dataset.id;
    const name = btnAddCart.dataset.name;
    const price = Number(btnAddCart.dataset.price);
    const image = btnAddCart.dataset.image;
    const quantity = Number(qtyInput.value);

    if (quantity > maxStock) {
      alert("Số lượng mua vượt quá số lượng còn!");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id == productId);

    if (existing) {
      if (existing.quantity + quantity > maxStock) {
        alert("Tổng số lượng trong giỏ vượt quá tồn kho!");
        return;
      }
      existing.quantity += quantity;
    } else {
      cart.push({
        id: productId,
        name,
        price,
        image,
        quantity,
        stock: maxStock,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng 🛒");

    updateCartCount();
  });
});

// ================= CẬP NHẬT SỐ LƯỢNG ICON GIỎ =================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = total;
  }
}

// ================= HIỂN THỊ GIỎ HÀNG =================
document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.getElementById("cart-body");
  const cartTotal = document.getElementById("cart-total");

  if (!cartBody) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartBody.innerHTML = "";

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartBody.innerHTML += `
      <tr>
        <td>
          <img src="/uploads/sanpham/${item.image}" alt="${item.name}" style="width:60px">
        </td>
        <td>${item.name}</td>
        <td>${item.price.toLocaleString()} VNĐ</td>
        <td>${item.quantity}</td>
        <td>${itemTotal.toLocaleString()} VNĐ</td>
      </tr>
    `;
  });

  if (cartTotal) {
    cartTotal.textContent = `Tổng tiền: ${total.toLocaleString()} VNĐ`;
  }
});

// ================= THANH TOÁN =================
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("btn-checkout");
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener("click", async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Thanh toán thất bại");
        return;
      }

      alert("Thanh toán thành công 🎉");

      localStorage.removeItem("cart");
      updateCartCount();
      window.location.href = "/";
    } catch (err) {
      alert("Có lỗi xảy ra khi thanh toán");
    }
  });
});

// ================= CHẠY KHI LOAD =================
updateCartCount();
