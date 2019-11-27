import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paymentgift-modal',
  templateUrl: './paymentgift-modal.component.html',
  styleUrls: ['./paymentgift-modal.component.scss'],
})
export class PaymentgiftModalComponent implements OnInit {

  @Input() PaymentgiftData: any

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  dismiss() {
    this.modalController.dismiss();
  }

}
