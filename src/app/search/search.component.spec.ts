import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter suggestions based on search term', () => {
    const searchTermControl = component.searchForm.get('searchTerm');
    searchTermControl?.setValue('An');
    component.suggestions$.subscribe(suggestions => {
      expect(suggestions).toContain('Angular');
    });
  });

  it('should log filters on search', () => {
    spyOn(console, 'log');
    component.searchForm.setValue({ searchTerm: 'Angular', date: '', category: '', status: '' });
    component.onSearch();
    expect(console.log).toHaveBeenCalledWith('Searching with filters:', jasmine.any(Object));
  });
});