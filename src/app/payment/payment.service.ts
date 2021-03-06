import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const api_url = environment.apiUrl;
const mockup = environment.mockup;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  routeParams: any;
  creditpoint: any = {
    "credit": {
      "creditremain": {}
    }
  };

  onDownDataListChanged: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  onCartDataListChanged: BehaviorSubject<any> = new BehaviorSubject({
    "totalcart": {
      "total_discount": 0
    }
  });
  onAddressDataChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onVouchersDataChanged: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  onSelectdownDataChanged: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  onAddressModalDataChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onCreditStatusChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onCreditPointChanged: BehaviorSubject<any> = new BehaviorSubject(this.creditpoint);

  constructor(private http: HttpClient) { }

  private authorizationHeader() {
    const token = window.localStorage.getItem(`token@${environment.appName}`);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    console.log("resolve with params : " + JSON.stringify(this.routeParams));
    this.getDownDataList();
    this.getCartDataList();
    this.getAddressData();
    this.getVouchersModalData();
    this.getSelectdownModalData();
    this.getAddressModalData();
    this.getCreditStatus();
    this.getCreditPointData();


    return;
  }




  getCartDataList(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/payment/payment.json').subscribe((res: any) => {
          this.onCartDataListChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onCartDataListChanged.next(res.data);
        }, reject)
      }
    })
  }
  getDownDataList(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/payment/downData.json').subscribe((res: any) => {
          this.onDownDataListChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onDownDataListChanged.next(res.data);
        }, reject)
      }

    })
  }
  getAddressData(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/addaddress/addaddress.json').subscribe((res: any) => {
          this.onAddressDataChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onAddressDataChanged.next(res.data);
        }, reject)
      }

    })
  }

  getVouchersModalData(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/productdetail/vouchers-modal.json').subscribe((res: any) => {
          this.onVouchersDataChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onVouchersDataChanged.next(res.data);
        }, reject)
      }

    })
  }
  getSelectdownModalData(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/payment/selectdown.json').subscribe((res: any) => {
          this.onSelectdownDataChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onSelectdownDataChanged.next(res.data);
        }, reject)
      }

    })
  }
  getAddressModalData(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/me/me-detail.json').subscribe((res: any) => {
          this.onAddressModalDataChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url, { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onAddressModalDataChanged.next(res.data);
        }, reject)
      }

    })
  }
  getCreditStatus(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/regcredit/profile.json').subscribe((res: any) => {
          this.onCreditStatusChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url + '/api/cusprofilesbyuserid', { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onCreditStatusChanged.next(res.data);
        }, reject)
      }
    })
  };
  getCreditPointData(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      if (mockup) {
        this.http.get('../../assets/json/credit/credit-point.json').subscribe((res: any) => {
          this.onCreditPointChanged.next(res.data);
        }, reject)
      } else {
        this.http.get(api_url + '/api/creditpointsbyuserid', { headers: this.authorizationHeader() }).subscribe((res: any) => {
          this.onCreditPointChanged.next(res.data);
        }, reject)
      }
    })
  };

  createPaymentData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(api_url, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        // this.getPaymentDataList();
      }, reject)
    })
  }

  updatePaymentData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(api_url + body._id, body, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        // this.getPaymentDataList();
      }, reject)
    })
  }

  deletePaymentData(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(api_url + body._id, { headers: this.authorizationHeader() }).subscribe((res: any) => {
        // this.getPaymentDataList();
      }, reject)
    })
  }

}
