import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(
    
    private appComponent: AppComponent 
    ){}

    ngOnInit(): void{
      this.appComponent.showNavbar = true;
    }
}
