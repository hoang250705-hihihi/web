import { z } from "zod";

export const updateNhanVienSchema = z.object({
  tennv: z.string().min(1).optional(),
  gioitinh: z.number().int().min(1).max(3).optional(),
  namsinh: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  phone: z.string().max(20).optional().nullable(),
});

export function validateUpdateNhanVien(data) {
  return updateNhanVienSchema.parse(data);
}
