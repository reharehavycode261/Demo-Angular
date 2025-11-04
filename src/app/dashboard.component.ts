import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getDashboardData().subscribe((data) => {
      this.loadCharts(data);
    });
  }

  loadCharts(data: any): void {
    // Exemple d'initialisation d'un graphique pie
    const ctx1 = document.getElementById('myPieChart') as HTMLCanvasElement;
    new Chart(ctx1, {
      type: 'pie',
      data: {
        labels: data.labels,
        datasets: [{
          data: data.values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });

    // Ajoutez ici d'autres graphiques si nécessaire
  }
}