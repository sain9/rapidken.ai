import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Employee } from '../models/employee.model';
DatePipe

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  
  showFiller = false;
  hide =false;

  add: boolean=false;
  cardView: boolean = false;
  listView:boolean = false;
  clr: string = 'primary';

  public isAdmin: boolean = false;

  // 3// <---   from app-service
  public searchValue : string = ' ' ;

  //for displaying employees 
  public emp: Employee[] =[]; // for editing and deleting //container
  editMode: boolean =false;
  selectedEmployee!: Employee;
  panelOpenState = false;

  addEmpBtn(){
    
  this.add = true;
  this.cardView =false;
  this.listView =false;
}
 listViewBtn(){
  this.listView=true;
  this.cardView = false;
  this.add = false;
  this.editMode=false;
}
cardViewBtn(){
  this.listView=false;
  this.cardView = true;
  this.add = false;
  this.editMode=false;
}

  empForm!: FormGroup ;
  employee =new Employee( );
    
    constructor(
      //for logoutbtn
      private service: AppServiceService,
      //date format
      private datePipe: DatePipe,
      //form
      private fb: FormBuilder

      ) {  this.emp = this.service.Emp
      console.log("const: searchvalue: ",this.searchValue);
       }
      
ngOnInit(): void {
this.listView=true
  this.empForm = this.editEmployeeForm;

  this.service.success.subscribe((isAdmin)=> {
    console.log("isAdmin from Login to employeeComp: ",isAdmin);
      this.isAdmin = isAdmin;
  });

  this.service.success_Search.subscribe(searchValue => {
    this.searchValue = searchValue;
    console.log("search value recived in employee : ", this.searchValue);
  });
  // console.log("emp from service : ",this.emp);
  
}


//creating employee with formatted date
    onSubmit() {
      if(this.empForm.valid){
        //date format
      this.employee.joining_date = this.datePipe.transform(this.employee.joining_date,'dd-MM-yyyy');
      console.log("date: ",this.employee.joining_date);
      this.service.addEmployee(this.employee);
      //for display
      this.emp = this.service.Emp;
      this.cardViewBtn(); 
      }
        this.empForm.reset();
        if( this.editMode && this.isAdmin){
        this.empForm.patchValue(this.selectedEmployee);
      }
      
    };
    

    editEmployeeForm = this.fb.group({
 
      name: ['', Validators.required],
      position: ['', Validators.required],
      about: ['', Validators.required],
      joining_date: ['',Validators.required]
    });

    setFormValue(emp: Employee ) {
      console.log("incoming emp in setFormValue : ",emp);
      
      this.editEmployeeForm.setValue({
       
        name: emp.name,
        position: emp.position,
        about: emp.about,
        joining_date: emp.joining_date
      })
      console.log((emp.name));
      // console.log((this.editEmpForm));
        if( this.editMode && this.isAdmin){
        this.empForm.patchValue(this.selectedEmployee);
      }
    }

       //Edit method
       onEdit(item: Employee, index: number){
        this.editMode = true;
         if(this.isAdmin) {
          this.addEmpBtn();
               this.selectedEmployee = item;
              // console.log("selectedEmoloyee : ",this.selectedEmployee);
      
                let ind = this.emp.indexOf(this.emp[index]);
                this.emp.splice(ind, 1);
                this.emp.splice(ind, this.empForm.value);

          localStorage.setItem("employee",JSON.stringify(this.emp));
          this.service.Emp = this.emp;
        }
          
      }


    //delete method
    onDelete(index:number){

   
     console. log(`Delted index : ${index}` );

     //delete using splice method
     if(index > -1 && this.isAdmin){
      this.emp.splice(index, 1)
     }
     localStorage.setItem("employee",JSON.stringify(this.emp));
    //  this.service.Emp = this.emp;
    }
 
}
