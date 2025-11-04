import { Component } from '@angular/core';
import { ExportDataService } from './export-data.service';
import { RegionService } from './region/region.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular';

  constructor(private exportDataService: ExportDataService, private regionService: RegionService) {}

  exportData(format: string) {
    this.regionService.getRegions().subscribe(data => {
      if (format === 'excel') {
        this.exportDataService.exportToExcel(data, 'Regions');
      } else if (format === 'csv') {
        this.exportDataService.exportToCSV(data, 'Regions');
      } else if (format === 'pdf') {
        this.exportDataService.exportToPDF(data, 'Regions');
      }
    });
  }
}