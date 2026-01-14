document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("tr[data-id]").forEach(row => {
    const id = row.dataset.id;
    const input = row.querySelector(".dm-input");

    const btnEdit = row.querySelector(".btn-edit-dm");
    const btnSave = row.querySelector(".btn-save-dm");
    const btnCancel = row.querySelector(".btn-cancel-dm");

    // ===== BẤM SỬA =====
    btnEdit.addEventListener("click", () => {
      input.removeAttribute("readonly");
      input.focus();

      btnEdit.style.display = "none";
      btnSave.style.display = "inline-block";
      btnCancel.style.display = "inline-block";
    });

    // ===== HỦY =====
    btnCancel.addEventListener("click", () => {
      input.value = input.dataset.original;
      input.setAttribute("readonly", true);

      btnEdit.style.display = "inline-block";
      btnSave.style.display = "none";
      btnCancel.style.display = "none";
    });

    // ===== LƯU =====
    btnSave.addEventListener("click", async () => {
      const newName = input.value.trim();

      if (!newName) {
        alert("Tên danh mục không được để trống");
        return;
      }

      try {
        const res = await fetch(`/admin/danhmuc/sua/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tendm: newName }),
        });

        if (!res.ok) {
          alert("Cập nhật thất bại");
          return;
        }

        input.dataset.original = newName;
        input.setAttribute("readonly", true);

        btnEdit.style.display = "inline-block";
        btnSave.style.display = "none";
        btnCancel.style.display = "none";
      } catch (err) {
        alert("Có lỗi xảy ra");
      }
    });
  });
});
