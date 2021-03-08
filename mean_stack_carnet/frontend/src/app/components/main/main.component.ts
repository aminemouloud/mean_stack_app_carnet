

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { CarnetsService } from '../../services/carnets.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  carnets: any;

  constructor(
    private _CarnetsService: CarnetsService,
    private _userService: UserService,
    private _flash: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
      this._fetchCarnets();
  }

  deleteCarnet(carnetId) {
    this._CarnetsService.deleteCarnet(carnetId).subscribe(
      resp => {
        if(!resp.success) {
          this._flash.show(resp.message, { cssClass : 'alert-danger '});
        }else{
          this._fetchCarnets();
          this._flash.show('Carnet Deleted', { cssClass : 'alert-success '});
        }

        this._router.navigate(['/main']);
      }
    );
  }

  editCarnet(carnetId) {

  }

  private _fetchCarnets() {
    const currentUser = this._userService.getCurrentUser();
    const query = { owner : currentUser.id };
    this._CarnetsService.getCarnets(query).subscribe(
      resp => {
        this.carnets = resp.carnets;
      }
    )
  }

}
