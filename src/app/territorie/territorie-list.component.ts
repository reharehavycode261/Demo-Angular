import { Component, OnInit } from '@angular/core';
import { Territorie } from './territorie';
import { TerritorieService } from './territorie.service';
import {NgFor, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { PaginationComponent } from '../pagination.component';

@Component({
  selector: 'app-territories-list',
  templateUrl: './territorie-list.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    FormsModule,
    PaginationComponent
  ]
})
export class TerritorieListComponent implements OnInit {
  territories: Territorie[] = [];
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(private territorieService: TerritorieService) {}

  ngOnInit() {
    this.loadTerritories();
  }

  loadTerritories() {
    // Simulated service call
    this.territorieService.getTerritories(this.currentPage).subscribe(data => {
      this.territories = data.items;
      this.totalItems = data.total;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTerritories();
  }
}