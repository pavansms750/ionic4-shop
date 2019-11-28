import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingService } from './setting.service';
import { Location } from '@angular/common'
import { ModalFeedbackComponent } from './modal-feedback/modal-feedback.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  settingDataList: any;

  constructor(private router: Router, 
              private settingService : SettingService,
              private _location: Location,
              public modalController: ModalController) { }

  ngOnInit() {
    this.settingService.onSettingDataListChanged.subscribe((settingDataList:any)=>{
      console.log(settingDataList);
      this.settingDataList = settingDataList;
    })
  }

  async feedbackModal() {
    const modal = await this.modalController.create({
      component: ModalFeedbackComponent,
    });
    return await modal.present();
  }


  onBackClick() {
    this._location.back();
  }

  onToMePage(){
    this.router.navigate(['me']);
  }

  onToAboutApp(){
    console.log("onToAboutApp");
  }

  onToLogout(){
    console.log("onLogout");
  }
}
