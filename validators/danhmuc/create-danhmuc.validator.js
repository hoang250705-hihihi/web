import { z } from "zod";

export const createDanhMucSchema = z.object({
  tendm: z.string().min(1, "Tên danh mục không được để trống"),
});

export function validateCreateDanhMuc(data) {
  return createDanhMucSchema.parse(data);
}
