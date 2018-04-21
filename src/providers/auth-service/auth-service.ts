import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
// import * as Config from '../../config/config.json';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var require: any; 
const Config = require('../../config/config.json');

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://192.168.43.144/proderma/';

@Injectable()
export class AuthServiceProvider {

  private errorObserver: any;
  public error: any;
  private token;

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello AuthServiceProvider Provider');
    console.log('CONFIG', localStorage.getItem(Config.TOKENKEY));
    this.errorObserver = null;
    this.error = Observable.create(observer => {
      this.errorObserver = observer;
    });
  }

  private createAuthorizationHeader() {
    return (new HttpHeaders())
      .set('Authorization', 'Bearer XXXX')
      .set('Accept-Language', 'en_US')
      .set('Content-Type', 'application/json')
      .set('X-Auth-Token', localStorage.getItem(Config.TOKENKEY));
  }

  async createSession(data) {

    this.token = data.token;
    await localStorage.setItem(Config.TOKENKEY, data.token);
    await localStorage.setItem(Config.USERPROFILE, data);
  }

  login(params) : Observable <Response> {
    let header = new HttpHeaders();
    // this.createAuthorizationHeader(header);
    return this.http.post(apiUrl + 'api/Api_Login/login', JSON.stringify(params),{headers: header})
    .map(res => res)
    .catch(error => this.handleError(error));
  }

  private handleError(error) {
      this.errorObserver.next(error);
      return Observable.throw(error.json().error || 'Server error');
  }

register(data) : Observable <boolean> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(apiUrl + 'api/register', JSON.stringify(data),{headers: headers})
    .map(res => res)
    .catch(error => this.handleError(error));
}

listArea() : Observable <Response> {
    const header = this.createAuthorizationHeader();
    return this.http.get(apiUrl + 'api/get_master_area', {headers: header})
    .map(res => res)
    .catch(error => this.handleError(error));
}

logout() : Observable < boolean > {
  return new Observable < boolean > ((observer) => {
    this.storage.ready().then(() => {
      localStorage.clear();
      observer.next(true);
      observer.complete();
    });
  });
}

}
