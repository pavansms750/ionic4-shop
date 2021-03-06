import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const api_url = environment.apiUrl + '/api/mes/';
const mockup = environment.mockup;

@Injectable({
  providedIn: 'root'
})
export class MeService {
  routeParams: any;

  onMeDataListChanged: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  onMeDataChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onMeData2Changed: BehaviorSubject<any> = new BehaviorSubject({});
  onCreditDataChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    console.log("resolve with params : " + JSON.stringify(this.routeParams));
    if (this.routeParams.id) {
      this.getMeData(this.routeParams.id);
    } else {
      this.getMeDataList();
      this.getMeData2();
      this.getCreditPointData();
    }
    return;
  }

  getCreditPointData(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/credit/credit-point.json').subscribe((res: any) => {
          this.onCreditDataChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onCreditDataChanged.next(res.data);
        }, reject)
      }
    })
  }

  

  getMeData2(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/me/me-detail.json').subscribe((res: any) => {
          this.onMeData2Changed.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onMeData2Changed.next(res.data);
        }, reject)
      }
    })
  }

  getMeDataList(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/me/me.json').subscribe((res: any) => {
          this.onMeDataListChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onMeDataListChanged.next(res.data);
        }, reject)
      }
    })
  }

  getMeData(id: string): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/me/me-detail.json').subscribe((res: any) => {
          this.onMeDataListChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url + id, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onMeDataChanged.next(res.data);
        }, reject)
      }

    })
  }

  createMeData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(api_url, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.getMeDataList();
      }, reject)
    })
  }

  updateMeData(body): Promise<any> {
    if (mockup) {
      const data: any = {
        "status": 200,
        "data": body
      }
      return data
    } else {
      return new Promise((resolve, reject) => {
        this.http.put(api_url + body._id, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.getMeDataList();
        }, reject)
      })
    }

  }

  deleteMeData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(api_url + body._id, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        this.getMeDataList();
      }, reject)
    })
  }



}
