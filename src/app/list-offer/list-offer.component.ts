import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { OfferAddEditComponent } from '../offer-add-edit/offer-add-edit.component';

import { OfferService } from '../services/offer.service'
import { SnackBarService } from '../services/snack-bar.service';

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
    private _coreService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getOfferList();
  }

  openAddEditOfferForm() {
    const dialogRef = this._dialog.open(OfferAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOfferList();
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
        this._coreService.openSnackBar('Offer deleted!', 'done');
        this.getOfferList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(OfferAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOfferList();
        }
      },
    });
  }
}
