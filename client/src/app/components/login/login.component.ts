import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import ValidateFrom from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  eyeIcon: string = "fa-eye-slash"
  isText: boolean = false
  passwordType = "password"
  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router,
     private notify:NotifierService){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email:['', Validators.compose([ Validators.required, Validators.email])],
      password:['',Validators.required]
    })
  }

  handleHiddenPassword(){
    this.isText= !this.isText
    this.isText? this.passwordType="text": this.passwordType="password"
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon="fa-eye-slash"
  }

  OnSubmit(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) => {
          this.notify.notify('success',"successful login")
          this.loginForm.reset()
          this.auth.storeToken(res.token)
          this.router.navigate(["dashboard"])
        },
        error: (err) => {
          console.log(err)
          this.notify.notify('error',err.error.message) 
        }    
      })
    }
    else if (this.loginForm.invalid){
      ValidateFrom.validateAllFormFields(this.loginForm)
    }

  }


}
