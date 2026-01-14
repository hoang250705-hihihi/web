export class UpdateKhachHangDTO {
  constructor({ tenkh, phone }) {
    this.tenkh = tenkh;
    this.phone = phone || null;
  }
}
