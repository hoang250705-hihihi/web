import { z } from "zod";

export const createSanPhamSchema = z.object({
  tensp: z.string().min(1, "Tên sản phẩm không được rỗng"),
  madm: z.coerce.number(),
  giatien: z.coerce.number().positive(),
  soluongcon: z.coerce.number().int().nonnegative(),
  mota: z.string().optional(),   // ✅ THÊM
});

export function validateCreateSanPham(data) {
  return createSanPhamSchema.parse(data);
}
