import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExportDataService } from './export-data.service';
import { RegionService } from './region/region.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let exportDataService: ExportDataService;
  let regionService: jasmine.SpyObj<RegionService>;

  beforeEach(() => {
    const regionSpy = jasmine.createSpyObj('RegionService', ['getRegions']);
    const exportSpy = jasmine.createSpyObj('ExportDataService', ['exportToExcel', 'exportToCSV', 'exportToPDF']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ExportDataService, useValue: exportSpy },
        { provide: RegionService, useValue: regionSpy }
      ]
    });

    exportDataService = TestBed.inject(ExportDataService);
    regionService = TestBed.inject(RegionService) as jasmine.SpyObj<RegionService>;
  });

  it('should export data in Excel format when exportData is called with "excel"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const mockData = [{ id: 1, name: 'Region 1' }];
    regionService.getRegions.and.returnValue(of(mockData));

    app.exportData('excel');
    expect(exportDataService.exportToExcel).toHaveBeenCalledWith(mockData, 'Regions');
  });

  // Tests similaires pour CSV et PDF doivent être ajoutés
});