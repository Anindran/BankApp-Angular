import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  pswd=""
  amount=""
acnow=""
pswdw=""
amountw=""
// loginusername
user=""
depositForm=this.fb.group({
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
withdrawForm=this.fb.group({
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
acno:any
lDate:any
  constructor(private ds:DataService,private fb:FormBuilder, private router:Router) {
    if(localStorage.getItem('currentUsername')){
      //fetch username current
      this.user=JSON.parse(localStorage.getItem('currentUsername') || '')
   
   }
   this.lDate= new Date()
   }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert("Please log in")
      this.router.navigateByUrl("")

    }
  }
deposit(){
  var acno=this.depositForm.value.acno
  var pswd=this.depositForm.value.pswd
  var amount=this.depositForm.value.amount

 if(this.depositForm.valid){ 
  const result=this.ds.deposit(acno,pswd,amount)
  .subscribe((result:any)=>{
   
       alert(result.message)
     
   
   },
   result=>{
     alert(result.error.message)
   }
   )
}
else{
  alert("invalid form")
}
  
}
withdraw(){
  var acno=this.withdrawForm.value.acno
  var pswd=this.withdrawForm.value.pswd
  var amount=this.withdrawForm.value.amount
  if(this.withdrawForm.valid){ 
    this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>{
   
      alert(result.message)
    
  
  },
  result=>{
    alert(result.error.message)
  }
  )
  }
  else{
    alert("invalid form")
  }
  
  
}
logout(){
  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUsername')
  localStorage.removeItem('token')

  //login redirect
this.router.navigateByUrl("")

}
deleteParent(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno') || '')
  
}
cancel(){
  this.acno=""
}

onDelete(event:any){
  
  //asynchronous
  this.ds.delete(event)
  .subscribe(
    (result:any)=>{
  
    alert(result.message)
    this.logout()
  },
  result=>{
    alert(result.message)
  }
)
}
}
