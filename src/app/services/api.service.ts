import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './../service.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://vishnuprashob360.pythonanywhere.com/homepageinput';

  constructor(private http: HttpClient) {}

  fetchDynamicContent(): Observable<any> {
    return this.http.get<Service>(this.apiUrl);
  }
}
