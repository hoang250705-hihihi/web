export class CreateKhachHangDTO {
  constructor({ tenkh, phone, user_id }) {
    this.tenkh = tenkh;
    this.phone = phone || null;
    this.user_id = user_id;
  }
}
