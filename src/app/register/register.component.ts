import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname=''
  acno=''
  pswd=''
// form group
registerForm=this.fb.group({
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    var uname=this.registerForm.value.uname
    var acno=this.registerForm.value.acno
    var pswd=this.registerForm.value.pswd

  console.log(this.registerForm.get('uname')?.errors);
  

    if(this.registerForm.valid){
//call register in dataservices-asynchronous

const result=this.ds.register(acno,pswd,uname)
.subscribe((result:any)=>{
  if(result){
    alert(result.message)
    this.router.navigateByUrl("")
  }

},
result=>{
  alert(result.error.message)
  this.router.navigateByUrl("")
}
)
// if(result){
//   alert('successfully register')
//   this.router.navigateByUrl("")
// }
// else{
//   alert("user already exist...plz log in")
//   this.router.navigateByUrl("")
// }

    }
    else{
      alert('Invalid form')
    }
    
  }
}

