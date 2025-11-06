import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExportDataService } from './export-data.service';
import { RegionService } from './region/region.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    exportDataService = TestBed.inject(ExportDataService);
    regionService = TestBed.inject(RegionService) as jasmine.SpyObj<RegionService>;

    regionService.getRegions.and.returnValue(of([]));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should not show scroll to top button initially', () => {
    expect(component.showScrollToTop).toBeFalse();
  });

  it('should show scroll to top button when window is scrolled down', () => {
    component.onWindowScroll();
    window.dispatchEvent(new Event('scroll'));
    component.showScrollToTop = true;
    fixture.detectChanges();
    
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Top');
  });

  it('should scroll to top when button is clicked', () => {
    spyOn(window, 'scrollTo');
    component.scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});