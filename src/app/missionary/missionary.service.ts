import { Missionary } from './missionary';
import { MissionaryFilter } from './missionary-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class MissionaryService {
  missionaryList: Missionary[] = [];

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Missionary> {
    const url = `http://www.angular.at/api/missionary/${id}`;
    const params = { 'id': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Missionary>(url, {params, headers});
  }

  load(filter: MissionaryFilter): void {
    this.find(filter).subscribe(result => {
        this.missionaryList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: MissionaryFilter): Observable<Missionary[]> {
    const url = `http://www.angular.at/api/missionary`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = {
      'from': filter.from,
      'to': filter.to,
    };

    return this.http.get<Missionary[]>(url, {params, headers});
  }

  save(entity: Missionary): Observable<Missionary> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://www.angular.at/api/missionary/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.put<Missionary>(url, entity, {headers, params});
    } else {
      url = `http://www.angular.at/api/missionary`;
      return this.http.post<Missionary>(url, entity, {headers, params});
    }
  }

  delete(entity: Missionary): Observable<Missionary> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.id) {
      url = `http://www.angular.at/api/missionary/${entity.id.toString()}`;
      params = new HttpParams().set('ID', entity.id.toString());
      return this.http.delete<Missionary>(url, {headers, params});
    }
    return EMPTY;
  }
}

