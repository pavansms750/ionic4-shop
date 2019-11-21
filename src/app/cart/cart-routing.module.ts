import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartPage } from './cart.page';
import { CartService } from './cart.service';

const routes: Routes = [
  {
    path: '',
    component: CartPage,
    resolve: [ CartService ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPageRoutingModule {}