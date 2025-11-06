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
  showScrollToTop = false;

  constructor(private exportDataService: ExportDataService, private regionService: RegionService) {}

  exportData(format: string) {
    this.regionService.getRegions().subscribe(regions => {
      this.exportDataService.export(regions, format);
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.pageYOffset;
    this.showScrollToTop = yOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}