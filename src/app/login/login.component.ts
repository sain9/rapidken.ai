import { Component, EventEmitter, Output } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { LoginModel } from '../models/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide=false;
  Hide(){
    if(this.hide)
    this.hide =false
else{
  this.hide= true
}
  }
  //admin
  public admin = { username: "admin", password: "admin"}
  
  // User without model
  public user = new LoginModel();
 
  isAdmin= false;
  
constructor( private service: AppServiceService ) {  }

 submit =() => {
  console.log("User : ",this.user);
  localStorage.setItem('UserData',JSON.stringify(this.user));
 }

 isAdm(){
  this.user = JSON.parse(localStorage.getItem("UserData") || "") 
 console.log("here : ",this.user.username);

 if(this.user.password === this.admin.password && this.user.username === this.admin.username)
 this.isAdmin = true;
 this.service.success.next(this.isAdmin)
  }

}


