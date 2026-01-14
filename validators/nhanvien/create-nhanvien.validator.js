import { z } from "zod";

export const createNhanVienSchema = z.object({
  tennv: z.string().min(1, "Tên nhân viên không được để trống"),
  gioitinh: z.number().int().min(1).max(3),
  namsinh: z.number().int().min(1900).max(new Date().getFullYear()),
  phone: z.string().max(20).optional().nullable(),
  user_id: z.number().int().optional().nullable(),
});

export function validateCreateNhanVien(data) {
  return createNhanVienSchema.parse(data);
}
