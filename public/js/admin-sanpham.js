async function deleteSanPham(id) {
  if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

  const res = await fetch(`/api/sanpham/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.ok) {
    alert("Xóa thành công");
    location.reload();
  } else {
    alert(data.message || "Xóa thất bại");
  }
}
