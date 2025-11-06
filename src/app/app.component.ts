import { Component } from '@angular/core';
import { ExportDataService } from './export-data.service';
import { RegionService } from './region/region.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular';

  constructor(
    private exportDataService: ExportDataService,
    private regionService: RegionService,
    private spinner: NgxSpinnerService
  ) {}

  async exportData(format: string) {
    this.spinner.show();
    try {
      const regions = await this.regionService.getRegions().toPromise();
      // Effectuer l'exportation des données
    } catch (error) {
      console.error('Erreur lors de l\'exportation des données:', error);
    } finally {
      this.spinner.hide();
    }
  }
}