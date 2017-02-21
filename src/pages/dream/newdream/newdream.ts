import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Dream, DreamBox } from '../../../datamodel/datamodel'

@Component({
  selector: 'page-contact',
  templateUrl: 'newdream.html'
})
export class NewDreamPage {
  dream:Dream;

  constructor(public navCtrl: NavController,
              public dreamBox:DreamBox) {
    //TODO: move to page exit
    this.dream = dreamBox.newDream();
  }

}
