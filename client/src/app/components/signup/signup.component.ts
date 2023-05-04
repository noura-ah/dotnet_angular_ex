import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import ValidateFrom from 'src/app/helpers/ValidateForm';
import { checkPasswords } from 'src/app/helpers/checkPasswords';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  eyeIcon: string = "fa-eye-slash"
  isText: boolean = false
  passwordType = "password"
  signupForm!: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
    private notify: NotifierService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name:[''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: checkPasswords })
  }

  handleHiddenPassword() {
    this.isText = !this.isText
    this.isText ? this.passwordType = "text" : this.passwordType = "password"
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
  }

  OnSignup() {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value)
        .subscribe({
          next: (res) => {
            this.signupForm.reset()
            this.notify.notify('success', 'Signed up successfully')
            this.router.navigate(["login"])
          },
          error: (err) => {
            this.notify.notify('error', err.error.message)
          }
        })
    }

    else if (this.signupForm.invalid) {
      // to show errors after clicking on submit btn
      ValidateFrom.validateAllFormFields(this.signupForm)
    }
  }

}
