export class KhachHangDTO {
  constructor({ makh, tenkh, phone, user_id }) {
    this.makh = makh;
    this.tenkh = tenkh;
    this.phone = phone || null;
    this.user_id = user_id;
  }
}
