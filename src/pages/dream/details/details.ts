import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dream } from '../../../datamodel/datamodel'

@Component({
  selector: 'page-contact',
  templateUrl: 'details.html'
})
export class DreamDetailsPage {
  dream: Dream;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dream = navParams.get('item');
  }

}
