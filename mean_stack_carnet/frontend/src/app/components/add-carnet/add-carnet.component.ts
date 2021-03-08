

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { UserService } from '../../services/user.service';
import { CarnetsService } from '../../services/carnets.service';

@Component({
  selector: 'app-add-carnet',
  templateUrl: './add-carnet.component.html',
  styleUrls: ['./add-carnet.component.css']
})
export class AddCarnetComponent implements OnInit {
  owner: string;
  nom: string;
  age: string;
  famille: string;
  race: string;
  origine: string;


  constructor(
    private _carnets: CarnetsService,
    private _userService: UserService,
    private _router: Router,
    private _flash: FlashMessagesService
  ) { }

  ngOnInit() {
    const user = this._userService.getCurrentUser();
    this.owner = user.id;
  }

  onAddCarnet() {

    if (!this.nom) {
      this._flash.show('nom du schtroumf is requried', { cssClass : 'alert-danger'});
      return false;
    }

    const carnet = {
      nom : this.nom,
      age : this.age,
      famille : this.famille,
      race : this.race,
      origine : this.origine,
      owner: this.owner
    };

    this._carnets.saveCarnet(carnet).subscribe(
      resp => {
        this._flash.show('Carnet Saved', { cssClass : 'alert-success'});
        this._router.navigate(['/main']);
      }
    );
  }


}
