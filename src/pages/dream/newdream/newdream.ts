import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Dream, DreamService } from '../../../services/dream.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'newdream.html'
})
export class NewDreamPage {
  dream:Dream;
  newDream:boolean = false;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamService:DreamService) {
    let d = navParams.get('dream');
    //Edit dream
    if(d != undefined) {
      this.dream = d;
    }else{
      this.dream = new Dream();
      this.newDream = true;
    }
  }

  ngOnDestroy() {
    // new dream
    if(this.newDream == true){
      this.dreamService.addDream(this.dream);
    }
  }

}
