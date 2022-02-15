import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required)
  })
  

  constructor(private _router:Router,private _user:UserService) { }
  ngOnInit(): void {
    
  }
  login(){
    if(!this.loginForm.valid){
      console.log(this.loginForm.controls[0])
      console.log('Invalid Form'); return;
    }
    console.log(this.loginForm.value)
    console.log(this._user.login(JSON.stringify(this.loginForm.value)))
    this._user.login(JSON.stringify(this.loginForm.value)).subscribe(
      
      (data)=>{        
        if(data){
          this._router.navigate(['/homepage'])
        }else{
          this._router.navigate(['/login'])
        }
        
      },(err)=>{
        console.log(err)
      }
      
      
    )
  }
  moveToRegister(){
    this._router.navigate(['/register'])
  }

}
