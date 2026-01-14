export class UserDTO {
  constructor(user, isAdmin = false) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone || null;

    //  Admin mới được xem role
    if (isAdmin) {
      this.role = user.role;
    }
  }
}

