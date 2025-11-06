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
    const exportSpy = jasmine.createSpyObj('ExportDataService', ['export']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ExportDataService, useValue: exportSpy },
        { provide: RegionService, useValue: regionSpy }
      ]
    });

    exportDataService = TestBed.inject(ExportDataService);
    regionService = TestBed.inject(RegionService) as jasmine.SpyObj<RegionService>;
    regionService.getRegions.and.returnValue(of([]));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should show back-to-top button when scrolled more than 300px', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    window.scrollTo(0, 301);
    window.dispatchEvent(new Event('scroll'));

    expect(app.showBackToTopButton).toBeTruthy();
  });

  it('should hide back-to-top button when scrolled less than 300px', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    window.scrollTo(0, 299);
    window.dispatchEvent(new Event('scroll'));

    expect(app.showBackToTopButton).toBeFalsy();
  });

  it('should scroll to top when back-to-top button is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(window, 'scrollTo');
    
    app.scrollToTop();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});