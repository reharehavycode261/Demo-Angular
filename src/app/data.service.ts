import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get('/api/dashboard-data');
  }

  getExportData(): Observable<any> {
    return this.http.get('/api/export-data');
  }
}