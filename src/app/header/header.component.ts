import { Component,EventEmitter,OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
title= "header";
public show = false;
  public logoutbtn: boolean = false;
constructor(private service: AppServiceService){}
  
ngOnInit(): void {
    this.service.success.subscribe((isAdmin)=> {
      console.log("isAdmin from Login to header: ",isAdmin);
      this.logoutbtn = isAdmin;
     
      
    });
    // console.log("logoutbtn status: ",this.logoutbtn);
    
  } 

//1// --> sending from service
searchValue : string = ' ' ;
searchTxtChanged : EventEmitter<string> = new EventEmitter<string>;
onSearchTxtChanged () {
  this.searchTxtChanged.emit(this.searchValue);
  console.log("search value in header: ",this.searchValue);
  this.service.success_Search.next(this.searchValue);
}
search(){

  console.log("log from header: searchvalue",this.searchValue);
  if(!this.show)
  this.show = true;
  else
  this.show = false;
}

logOut(){
  localStorage.removeItem('UserData');
}

}
