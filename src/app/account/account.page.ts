import { ModalBrowsehistoryComponent } from './modal-browsehistory/modal-browsehistory.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { ScrollDetail } from '@ionic/core';
import { ModalController } from '@ionic/angular';
import { ModalMyorderComponent } from './modal-myorder/modal-myorder.component';
import { ModalLanguageComponent } from './modal-language/modal-language.component';
import { ModalCreditPointComponent } from '../credit/modal-credit-point/modal-credit-point.component';
import { ModalFavoriteComponent } from './modal-favorite/modal-favorite.component';
import { ModalFollowedshopComponent } from './modal-followedshop/modal-followedshop.component';
import { AddressListComponent } from '../casan/account/address-list/address-list.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  accountDataList: any;
  accountData: any;
  promotionData: any;
  creditData: any;
  scoreData: any;
  showToolbar: boolean;
  AddressData: any;
  creditDatas: any;
  CartDataList: any;
  BillDataList: any;
  recommendDataList: any;
 
;

  constructor(private router: Router, private accountService: AccountService, 
    public modalController: ModalController) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true
  };

  ngOnInit() {
    this.accountService.onAccountDataListChanged.subscribe((accountDataList: any) => {
      // console.log(accountDataList);
      this.accountDataList = accountDataList;
    })
    this.accountService.onAccountData2Changed.subscribe((accountData) => {
      // console.log(accountData);
      this.accountData = accountData;
    })
    this.accountService.onPromotionChanged.subscribe((promotionData) => {
      // console.log(promotionData);
      this.promotionData = promotionData;
    })
    this.accountService.onCreditDataChanged.subscribe((creditData) => {
      // console.log(creditData);
      this.creditData = creditData;
    })
    this.accountService.onAccountScoreDataChanged.subscribe((scoreData) => {
      // console.log(scoreData);
      this.scoreData = scoreData;
    })
    this.accountService.onAddressDataListChanged.subscribe((AddressData) => {
      // console.log(AddressData);
      this.AddressData = AddressData.address;
    })
    this.accountService.onCartDataListChanged.subscribe((CartDataList: any) => {
      console.log(CartDataList);
      this.CartDataList = CartDataList.carts;
    })
    this.accountService.onBillDataChanged.subscribe((BillDataList: any) => {
      // console.log(BillDataList);
      this.BillDataList = BillDataList;
      console.log(this.BillDataList);
    })
    this.accountService.onRecommendDataListChanged.subscribe((recommendDataList:any)=>{
      console.log(recommendDataList);
      this.recommendDataList = recommendDataList;
    })
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 50;
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  onToMePage() {
    this.router.navigate(['me']);
  }

  onToLoginPage() {
    console.log("onToLoginPage");
  }

  onToMessagePage() {
    this.router.navigate(['message']);
  }

  onToSettingPage() {
    console.log("555");
    this.router.navigate(['setting']);
  }



  async ModalViewAllMyOrdersPage() {
    const value = 0
    const modal = await this.modalController.create({
      component: ModalMyorderComponent,
      componentProps: {
        CartDataList: this.CartDataList,
        Tabs: value
      }
    });
    return await modal.present();
  }

  async ModalPayViewAllMyOrdersPage() {
    const value = 1
    const modal = await this.modalController.create({
      component: ModalMyorderComponent,
      componentProps: {
        CartDataList: this.CartDataList,
        Tabs: value
      }
    });
    return await modal.present();
  }

  async ModalShipViewAllMyOrdersPage() {
    const value = 2
    const modal = await this.modalController.create({
      component: ModalMyorderComponent,
      componentProps: {
        CartDataList: this.CartDataList,
        Tabs: value
      }
    });
    return await modal.present();
  }

  async ModalRecieveViewAllMyOrdersPage() {
    const value = 3
    const modal = await this.modalController.create({
      component: ModalMyorderComponent,
      componentProps: {
        CartDataList: this.CartDataList,
        Tabs: value
      }
    });
    return await modal.present();
  }

  async ModalReviewsViewAllMyOrdersPage() {
    const value = 4
    const modal = await this.modalController.create({
      component: ModalMyorderComponent,
      componentProps: {
        CartDataList: this.CartDataList,
        Tabs: value
      }
    });
    return await modal.present();
  }

  async openModalBills() {
    this.router.navigate(['/bill'])
  }

  async creditPointModal() {
    const modal = await this.modalController.create({
      component: ModalCreditPointComponent,
      componentProps: {
        creditPoint: this.creditData
      }
    });
    return await modal.present();
  }

  onToMyCouponPage() {
    this.router.navigate(["mycoupon"]);
  }

  onToTcoinPage() {
    this.router.navigate(['tcoin']);
  }

  onToCurrentAmountPage() {
    this.router.navigate(['current-amount']);
  }

  onToHelpCenterPage() {
    this.router.navigate(['helpcenter']);
  }

  onToCuustomerServicePage() {
    this.router.navigate(['callcenter']);
  }

  async ModalLanguage() {
    const modal = await this.modalController.create({
      component: ModalLanguageComponent,
    });
    return await modal.present();
  }

  async addresslModal() {
    const modal = await this.modalController.create({
      component: AddressListComponent,
      componentProps: {
        AddressData: this.AddressData
      }
    });
    return await modal.present();
  }


  onToPromotion(item) {
    console.log(item);
    if (item === "Tcoin Mall") {
      console.log('go to Tcoin Mall Page');
    }
    if (item === "Cash Reward") {
      console.log('go to Cash Reward Page');
    }
    if (item === "Super Discount") {
      console.log('go to Super Discount Page');
    }
    if (item === "Coupon Center") {
      console.log('go to Coupon Center Page');
    }



  }


}
