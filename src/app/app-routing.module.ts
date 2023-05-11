import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListOfferComponent } from './list-offer/list-offer.component';

const routes: Routes = [
  { path: '', redirectTo: '/business/offers', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'business/offers', component: ListOfferComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
