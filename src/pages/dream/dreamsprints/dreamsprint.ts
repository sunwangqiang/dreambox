import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dream } from '../../../datamodel/datamodel'

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamsprints.html'
})
export class DreamSprintsPage {
  dream: Dream;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dream = navParams.get('dream');
  }

}
