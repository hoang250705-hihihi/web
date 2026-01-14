import { z } from "zod";

export const updateSanPhamSchema = z.object({
  tensp: z.string().optional(),
  madm: z.coerce.number().optional(),
  giatien: z.coerce.number().positive().optional(),
  soluongcon: z.coerce.number().int().nonnegative().optional(),
  mota: z.string().optional(),   // ✅ THÊM
});

export function validateUpdateSanPham(data) {
  return updateSanPhamSchema.parse(data);
}
