import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Dream, DreamBox } from '../../../datamodel/datamodel'

@Component({
  selector: 'page-contact',
  templateUrl: 'newdream.html'
})
export class NewDreamPage {
  dream:Dream;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamBox:DreamBox) {
    //TODO: move to page exit
    let dream = navParams.get('dream');
    if(dream == undefined) {
      this.dream = dreamBox.newDream();
    }else{
      this.dream = dream;
    }
  }

}
