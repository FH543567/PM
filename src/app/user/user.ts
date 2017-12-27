export class User {
  id: number;
  username: string;
  fname: string;
  lname: string;
  role: Role;
}

enum Role { ProductOwner, ScrumMaster, Developer }
