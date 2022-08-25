import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
//to hold acno
acno=''
pswd=''
  //database
userDetails:any={
  1000:{acno:1000,uname:'max',password:1000,balance:5000},
  1001:{acno:1001,uname:'laisha',password:1001,balance:5000},
  1002:{acno:1002,uname:'nyin',password:1002,balance:5000},
}
loginForm=this.fb.group({
  
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  
  acnoChange(event:any){
    this.acno=event.target.value
    console.log(this.acno);
    
  }
  pswdChange(event:any){
    this.pswd=event.target.value
    console.log(this.pswd);
    
  }
  login(){
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd

    if(this.loginForm.valid){ //caling data service

   this.ds.login(acno,pswd)
   .subscribe((result:any)=>{
   localStorage.setItem('currentUsername',JSON.stringify(result.currentUsername))
   localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
   localStorage.setItem('token',JSON.stringify(result.token))

      alert(result.message)
      this.router.navigateByUrl("dashboard")
    
  
  },
  result=>{
    alert(result.error.message)
  }
  )
  }
  else{
    alert("Invalid Form")
  }
}
 

}

