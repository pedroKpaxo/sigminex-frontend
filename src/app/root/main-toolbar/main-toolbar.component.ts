import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@app/domain/models/user.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
})
export class MainToolbarComponent implements OnInit {
  public user!: UserModel;
  constructor(
    public router: Router,
    private modalController: ModalController,
  ) {
  }

  ngOnInit() { }

  userIsLogged(): boolean {
    return false;
  }


}
