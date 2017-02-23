import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Dream, DreamBox } from '../../../datamodel/datamodel'

@Component({
  selector: 'page-contact',
  templateUrl: 'newsprint.html'
})
export class NewSprintPage {
  dream:Dream;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamBox:DreamBox) {
    this.dream = navParams.get('dream');
  }

  ngOnDestroy() {
  }

}
