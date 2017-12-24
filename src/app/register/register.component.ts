import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  roles = [
    {value: 0, viewValue: 'Developer'},
    {value: 1, viewValue: 'Scrum Master'},
    {value: 2, viewValue: 'Admin'}
  ];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
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
      this.dataService.register(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
}
