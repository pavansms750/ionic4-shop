import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { PayforService } from './payfor.service';

@Component({
  selector: 'app-payfor',
  templateUrl: './payfor.page.html',
  styleUrls: ['./payfor.page.scss'],
})
export class PayforPage implements OnInit {
  payforDataList: any;

  constructor(private router: Router, private payforService : PayforService, private _location: Location) { }

  ngOnInit() {
    this.payforService.onPayforDataListChanged.subscribe((payforDataList:any)=>{
      console.log(payforDataList);
      this.payforDataList = payforDataList;
    })
  }
  goBackClick() {
    this._location.back();
  }
}