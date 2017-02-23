import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Dream, DreamBox } from '../../../datamodel/datamodel'

@Component({
  selector: 'page-contact',
  templateUrl: 'newdream.html'
})
export class NewDreamPage {
  dream:Dream;
  newDream:boolean = false;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamBox:DreamBox) {
    //TODO: move to page exit
    let dream = navParams.get('dream');
    //Edit dream
    if(dream != undefined) {
      this.dream = dream;
    }else{
      this.dream = new Dream();
      this.newDream = true;
    }
  }

  ngOnDestroy() {
    // new dream
    if(this.newDream == true){
      this.dreamBox.pushDream(this.dream);
    }
  }

}
