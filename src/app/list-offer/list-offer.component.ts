import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { OfferAddEditComponent } from '../offer-add-edit/offer-add-edit.component';

import { OfferService } from '../services/offer.service'
import { SnackBarService } from '../services/snack-bar.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'points',
    'businessId',
    'actions'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _offerService: OfferService,
    private _coreService: SnackBarService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getOfferList();
  }

  openAddEditOfferForm() {
    this.location.replaceState('/admin/offers/new');
    const dialogRef = this._dialog.open(OfferAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOfferList();
          this.location.replaceState('/business/offers');
        }
      },
    });
  }

  getOfferList() {
    this._offerService.getOfferList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteOffer(id: number) {
    this._offerService.deleteOffer(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Offer eliminado con éxtio');
        this.getOfferList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    this.location.replaceState(`/admin/offers/edit/${data.id}`);
    const dialogRef = this._dialog.open(OfferAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOfferList();
          this.location.replaceState('/business/offers');
        }
      },
    });
  }
}
