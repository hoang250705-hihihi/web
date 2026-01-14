import { z } from "zod";

export const updateDanhMucSchema = z.object({
  tendm: z.string().min(1).optional(),
});

export function validateUpdateDanhMuc(data) {
  return updateDanhMucSchema.parse(data);
}