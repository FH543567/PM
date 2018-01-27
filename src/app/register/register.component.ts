import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  roles = [
    { value: 0, viewValue: 'Developer' },
    { value: 1, viewValue: 'Scrum Master' },
    { value: 2, viewValue: 'Admin' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['', [Validators.required]]
    });
  }

  // Prueft ob die eingabe im Feld ungültig ist; liefert ein Boolean als Antwort
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // Prueft ob sich der im field befindliche value zu kurz oder zu lang ist  FUNKTIONIRT NICHT
  isFieldLengthInvalid(field: string) {
    let bool: boolean;
    bool = (this.form.get(field).value.length < 6 || this.form.get(field).value.length > 20);
    console.log(bool);
    console.log(field + ': ' + (this.form.get(field).value.length < 6 || this.form.get(field).value.length > 20));
    console.log(this.form.get(field).value.length);
    return (this.form.get(field).value.length < 6 || this.form.get(field).value.length > 20);
  }

  // daten aus dem Formular werden an den DataService zur Weitergabe an den Server uebergeben
  onSubmit() {
    console.log(this.form.valid);
    if (this.form.valid) {
      //TODO: habe register() umgeschrieben in userService. evtl. noch zu überprüfen. (von Malte)
      //this.dataService.register(this.form.value); 
      let user: User = new User();
      if (this.form.value.username) user.username = this.form.value.username;
      if (this.form.value.password) user.password = this.form.value.password;
      if (this.form.value.firstname) user.firstname = this.form.value.firstname;
      if (this.form.value.lastname) user.lastname = this.form.value.lastname;
      console.log("role: " + this.form.value.role.value);
      if (this.form.value.role) user.role = this.form.value.role.value;
      /*
      switch (this.form.value.role) {
        case "ProductOwner":
          user.role = 0;
          break;
        case "ScrumMaster":
          user.role = 1;
          break;
        case "Developer":
          user.role = 2;
          break;
        default:
          break;
      }
      */
      this.userService.create(user).subscribe(registerResult => this.afterRegister(registerResult))
    }
    this.formSubmitAttempt = true;
  }

  //Bei erfolgreicher Registrierung, sende loginRequest
  afterRegister(user: User) {
    console.log("login mit user null: " + (user === null));
    if (user)
      this.authService.login(user);
    else
      console.error("Registrierung fehlgeschlagen");
  }
}
