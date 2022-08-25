import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
acno:any
transaction:any
  constructor(private ds:DataService) {
    // get login acno
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')
    // get transaction
  this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
   
      this.transaction=result.transaction
    
  
  },
  result=>{
    alert(result.error.message)
  }
  )    
   }

  ngOnInit(): void {
  }

}
