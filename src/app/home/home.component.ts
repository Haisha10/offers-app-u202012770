import { Component, OnInit } from '@angular/core';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data!: any[];
  dataCount!: number;

  constructor(private _offerService: OfferService) { }

  ngOnInit(): void {
    this.getOfferCount();
  }

  getOfferCount() {
    this._offerService.getOfferList().subscribe({
      next: (res) => {
        this.data = res;
        this.dataCount = this.data.length;
      },
      error: console.log,
    });
  }
}
