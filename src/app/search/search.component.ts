import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  suggestions$: Observable<string[]>;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      date: [''],
      category: [''],
      status: ['']
    });

    this.suggestions$ = this.searchForm.get('searchTerm')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.getSuggestions(term))
    );
  }

  ngOnInit(): void {}

  getSuggestions(term: string): Observable<string[]> {
    if(term.length < 2) {
      return of([]);
    }

    // Example static suggestions
    const allSuggestions = ['Angular', 'React', 'Vue', 'JavaScript', 'TypeScript'];
    return of(allSuggestions.filter(suggestion => suggestion.toLowerCase().includes(term.toLowerCase())));
  }

  onSearch(): void {
    const filters = this.searchForm.value;
    console.log('Searching with filters:', filters);
    // Logique de recherche à implémenter
  }
}