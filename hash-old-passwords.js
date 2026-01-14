import bcrypt from "bcryptjs";
import { pool } from "./config/database.js";

async function hashOldPasswords() {
  const db = await pool;

  // Mật khẩu cũ đang là 123456
  const plainPassword = "123456";
  const hashed = bcrypt.hashSync(plainPassword, 8);

  // Update users id 1 → 4
  await db.query(
    `
    UPDATE users
    SET password = ?
    WHERE id BETWEEN 1 AND 4
    `,
    [hashed]
  );

  console.log("✅ Đã hash password cho users 1 → 4");
  process.exit(0);
}

hashOldPasswords();
