import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

 success: BehaviorSubject<boolean>=new BehaviorSubject(false);
 
 //2//  <------   header -searchValue   <---- //1//
 success_Search: BehaviorSubject<string>=new BehaviorSubject(' ');

Emp : Employee[] = [];
  constructor() {
    if(localStorage.getItem('employee')) 
    this.getEmployees()
   }

  addEmployee(employee: Employee){
    let employees: Employee[] = [ ];
    if(localStorage.getItem('employee')) {
      employees = JSON.parse(localStorage.getItem('employee') || "");
      employees =[employee, ...employees];
      // this.Emp = employees;//for display
      
    }else {
      employees = [employee]
    }
    localStorage.setItem('employee',JSON.stringify(employees) );
  }

  


  getEmployees(){
    let employees: Employee[ ] = [ ];
      employees = JSON.parse(localStorage.getItem('employee') || "");
      this.Emp = employees;//for display
      // console.log("get Emp :",this.Emp);
  }


}


