import { z } from "zod";

export const updateKhachHangSchema = z.object({
  tenkh: z.string().min(1).optional(),
  phone: z.string().optional().nullable(),
});

export function validateUpdateKhachHang(data) {
  return updateKhachHangSchema.parse(data);
}
