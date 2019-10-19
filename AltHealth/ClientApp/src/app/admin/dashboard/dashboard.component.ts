import { Component, OnInit } from '@angular/core';
import { SupplementsService } from 'src/app/shared/supplements/supplements.service';
import { Chart} from 'chart.js'
import { supplements } from 'src/app/shared/supplements/supplements.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
data : supplements[];
Min_levels = [];
Stock_levels = [];
Linechart : any;
  constructor(private service: SupplementsService,
    private router: Router) { }
 
  ngOnInit() {
    this.service.getStock()
    .subscribe((result : supplements[]) => { 
      result.forEach( x => {
        this.Min_levels.push(x.Min_levels , 'Min Levels');
        this.Stock_levels.push(x.Stock_levels, 'Stock Level');
      })
      this
      this.Linechart = new Chart ('canvas', {
        type : 'bar',
        data : {
          labels: this.Min_levels,
          
          datasets : [
            {
              data: this.Min_levels,
              borderColor: '#3cb371' ,
              backgroundColor : "0000ff",
              fill: false
            },
            {
              data: this.Stock_levels,
              borderColor: '#3cb371' ,
              backgroundColor : "#ffcc00",
              fill: false
            }
          ]

        } ,
        
        options: {
          legend: {
            display: false
          },
          scales : {
            xAxes: [{
              display : true
            }],
            yAxes : [{
              display: true
            }]
          },
        }
      })
    });
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
