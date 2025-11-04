import { Component } from '@angular/core';
import { ExportDataService } from './export-data.service';

@Component({
  selector: 'app-export',
  template: `
    <button (click)="exportToCSV()">Export as CSV</button>
    <button (click)="exportToPDF()">Export as PDF</button>
    <button (click)="exportToExcel()">Export as Excel</button>
  `
})
export class ExportComponent {

  constructor(private exportDataService: ExportDataService) {}

  exportToCSV(): void {
    this.exportDataService.exportToCSV();
  }

  exportToPDF(): void {
    this.exportDataService.exportToPDF();
  }

  exportToExcel(): void {
    this.exportDataService.exportToExcel();
  }

}