

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as AppUtil from '../common/app.util';

@Injectable()
export class CarnetsService {

  constructor(private _http :Http) { }

  createAuthHeader(headers: Headers){
    const token = localStorage.getItem(AppUtil.AUTH_TOKEN);
    headers.append('Authorization', `Bearer ${token}`);
  }

  saveCarnet(carnet) {
    const headers = new Headers();
    this.createAuthHeader(headers);

    return this._http.post('carnets/add', carnet, { headers })
      .map(resp => resp.json());
  }

  getCarnets(query) {
    const headers = new Headers();
    this.createAuthHeader(headers);

    return this._http.post('carnets/list', query, { headers })
      .map(resp => resp.json());
  }

  deleteCarnet(carnetId) {
    const headers = new Headers();
    this.createAuthHeader(headers);

    const url = `carnets/remove/${carnetId}`;
    return this._http.delete(url, { headers })
      .map(resp => resp.json());
  }

}
