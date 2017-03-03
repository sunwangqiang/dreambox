import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Dream, DreamBox, DreamBoxService } from '../../../services/dreambox.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'newdream.html'
})
export class NewDreamPage {
  dream:Dream;
  newDream:boolean = false;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamBoxService:DreamBoxService) {
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
      this.dreamBoxService.addDream(this.dream);
    }
  }

}
