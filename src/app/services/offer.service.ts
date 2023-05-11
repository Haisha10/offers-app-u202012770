import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private _http: HttpClient) { }

  addOffer(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/artist', data);
  }

  updateOffer(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/artist/${id}`, data);
  }

  getOfferList(): Observable<any> {
    return this._http.get('http://localhost:3000/artist');
  }

  deleteOffer(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/artist/${id}`);
  }
}
