export class UpdateNhanVienDTO {
  constructor({ tennv, gioitinh, namsinh, phone }) {
    this.tennv = tennv;
    this.gioitinh = gioitinh;
    this.namsinh = namsinh;
    this.phone = phone || null;
  }
}
