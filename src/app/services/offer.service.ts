import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private _http: HttpClient) { }

  //'https://my-json-server.typicode.com/Haisha10/offers-app-u202012770'
  url = 'http://localhost:3000';

  addOffer(data: any): Observable<any> {
    return this._http.post(`${this.url}/artist`, data);
  }

  updateOffer(id: number, data: any): Observable<any> {
    return this._http.put(`${this.url}/artist/${id}`, data);
  }

  getOfferList(): Observable<any> {
    return this._http.get(`${this.url}/artist`);
  }

  deleteOffer(id: number): Observable<any> {
    return this._http.delete(`${this.url}/artist/${id}`);
  }
}
