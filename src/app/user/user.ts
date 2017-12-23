/*export interface User {
  username: string;
  password: string;
}*/
import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class User {
  @JsonProperty('_id', Number)
  id: number;
  @JsonProperty('_username', String)
  username: string;
  @JsonProperty('_password', String)
  password: string;
  @JsonProperty('_fname', String)
  fname: string;
  @JsonProperty('_lname', String)
  lname: string;
  @JsonProperty('_role', Number)
  role: number;

  constructor(id?: number, username?: string, password?: string, fname?: string, lname?: string, role?: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fname = fname;
    this.lname = lname;
    this.role = role;
  }

}

/*


// enum Role { ProductOwner, ScrumMaster, Developer }

@JsonObject
export class User {
  @JsonProperty('_id', Number)
  _id: number;
  @JsonProperty('_username', String)
  _username: string;
  @JsonProperty('_password', String)
  _password: string;
  @JsonProperty('_fname', String)
  _fname: string;
  @JsonProperty('_lname', String)
  _lname: string;
  @JsonProperty('_role', Number)
  _role: number;

  constructor(id?: number, username?: string, password?: string, fname?: string, lname?: string, role?: number) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._fname = fname;
    this._lname = lname;
    this._role = role;
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get fname(): string {
    return this._fname;
  }

  get lname(): string {
    return this._lname;
  }

  get role(): number {
    return this._role;
  }

  set username(value: string) {
    this._username = value;
  }

  set password(value: string) {
    this._password = value;
  }
}*/
