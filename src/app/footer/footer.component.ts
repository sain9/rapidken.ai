import { Component ,OnInit} from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  
  length : number = 6;
  pos: boolean = false; 

  isAdmin: boolean=false;
  constructor(private service : AppServiceService){  
    this.length =  this.service.Emp.length;
    console.log("length: ",this.length);
  
    if(this.length > 6 ){
      this.pos = true;
      console.log("pos: ",this.pos);
    }
  
    console.log("pos: ",this.pos);
  }
  
ngOnInit(): void {
  this.service.success.subscribe((isAdmin)=> {
    console.log("isAdmin from Login to employeeComp: ",isAdmin);
      this.isAdmin = isAdmin;
  });

 
  
}

}
