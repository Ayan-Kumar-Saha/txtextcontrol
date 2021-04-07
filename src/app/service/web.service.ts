import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(
    private _http: HttpClient
  ) { }

  getData(params) {
    const url = `${environment.apiBaseUrl}/apiTestGetMethodContent`
    return this._http.get(url, {params});
  }

  saveData(payload) {
    const url = `${environment.apiBaseUrl}/apiTestSaveMethodContent`
    return this._http.post(url, payload);
  }
}
