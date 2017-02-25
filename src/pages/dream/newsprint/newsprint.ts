import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Dream, DreamBox, DreamBoxService } from '../../../services/dreambox.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'newsprint.html'
})
export class NewSprintPage {
  dream:Dream;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamBoxService:DreamBoxService) {
    this.dream = navParams.get('dream');
  }

  ngOnDestroy() {
  }

}
