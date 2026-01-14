export class CreateNhanVienDTO {
  constructor({ tennv, gioitinh, namsinh, phone, user_id }) {
    this.tennv = tennv;
    this.gioitinh = gioitinh; // 1: Nam, 2: Nữ, 3: Khác
    this.namsinh = namsinh;   // chỉ năm
    this.phone = phone || null;
    this.user_id = user_id || null;
  }
}
