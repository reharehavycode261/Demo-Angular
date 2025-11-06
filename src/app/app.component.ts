import { Component, HostListener } from '@angular/core';
import { ExportDataService } from './export-data.service';
import { RegionService } from './region/region.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-angular';
  showBackToTopButton = false;

  constructor(
    private exportDataService: ExportDataService, 
    private regionService: RegionService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showBackToTopButton = scrollPosition > 300; // Show button after 300px
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  exportData(format: string) {
    this.regionService.getRegions().subscribe(data => {
      this.exportDataService.export(data, format);
    });
  }
}