import { Missionary } from '../../missionary/missionary';
import { CountryFilter } from './country-filter';
import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CountryService {
  countriesList: string[] = [];

  constructor(private http: HttpClient) {
  }

  async load(filter: CountryFilter): Promise<string[]> {
    try {
      const result = await this.find(filter).toPromise();
      return this.countriesList = result.slice(0, 15).map(c => c?.name?.common).filter(c => c);
    } catch (err) {
      console.error('error loading', err);
      return [];
    }
  }

  find(filter: CountryFilter): Observable<any[]> {
    const url = filter.name
      ? `https://restcountries.com/v3.1/name/${filter.name}`
      : `https://restcountries.com/v3.1/all`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = {
        fields: 'name'
    };

    return this.http.get<any[]>(url, {params, headers});
  }
}

