export class CreateSanPhamDTO {
  constructor({ tensp, madm, giatien, soluongcon, mota, hinhanh }) {
    this.tensp = tensp;
    this.madm = madm;
    this.giatien = giatien;
    this.soluongcon = soluongcon; 
    this.mota = mota || null;
    this.hinhanh = hinhanh || null;
  }
}
