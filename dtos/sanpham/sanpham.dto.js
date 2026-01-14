export class SanPhamDTO {
  constructor({ masp, tensp, madm, giatien, soluongcon, mota, hinhanh }) {
    this.masp = masp;
    this.tensp = tensp;
    this.madm = madm;
    this.giatien = giatien;
    this.soluongcon = soluongcon;
    this.mota = mota || null;
    this.hinhanh = hinhanh || null;
  }
}
