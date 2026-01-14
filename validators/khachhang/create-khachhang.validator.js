import { z } from "zod";

export const createKhachHangSchema = z.object({
  tenkh: z.string().min(1),
  phone: z.string().optional().nullable(),
  user_id: z.number().int().optional(), // admin dùng
});

export function validateCreateKhachHang(data) {
  return createKhachHangSchema.parse(data);
}
