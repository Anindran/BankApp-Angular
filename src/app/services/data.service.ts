import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const options={
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
 

  constructor(private http:HttpClient) {
   
   }

  

  getOption(){
    //fetch token from local storage
    const token=JSON.parse(localStorage.getItem('token')||'')
    //to get header create object from HttpHeader
    let headers=new HttpHeaders()
    // append token inside header
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers
    }
    return options
  }

  register(acno:any,password:any,username:any){
    const data={
      acno,password,username
    }
    //register api-asynchronous
     return this.http.post('http://localhost:3000/register',data,)
    }

  
  
  login(acno:any,pswd:any){
    
    const data={
      acno,pswd
    }
    //register api-asynchronous
     return this.http.post('http://localhost:3000/login',data)
  }
  deposit(acno:any,pswd:any,amt:any){
    const data={
      acno,pswd,amt
    }
    //register api-asynchronous
     return this.http.post('http://localhost:3000/deposit',data,this.getOption())
  }


  withdraw(acno:any,pswd:any,amt:any){
    const data={
      acno,pswd,amt
    }
    //register api-asynchronous
     return this.http.post('http://localhost:3000/withdraw',data,this.getOption())
  }
  
  getTransaction(acno:any){
    const data={
      acno
    }
    //register api-asynchronous
     return this.http.post('http://localhost:3000/transaction',data,this.getOption())  }
     //delete api
     delete(acno:any){
      
      return this.http.delete('http://localhost:3000/onDelete/'+acno)
    }

}
