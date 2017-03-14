import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Dream, DreamService } from '../../../services/dream.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'newdream.html'
})

export class NewDreamPage {
  dreamViewModel:Dream = new Dream();
  newDream:Dream = undefined;
  dreamUrl:string;
  
  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamService:DreamService, public events: Events) {
    let dreamBaseUrl:string = navParams.get('DreamBaseUrl');
    let dreamUid:number = navParams.get('DreamUid');

    //this.dream = new Dream();//just a temp dream
    //Edit dream
    if(dreamUid != undefined) {
      this.dreamUrl = dreamBaseUrl+"/"+dreamUid;
      this.dreamService.getObject(this.dreamUrl).then((d)=>{
        this.transformDreamToViewModel(d);
      });
    }else{
      this.dreamService.addObject(dreamBaseUrl).then((d)=>{
        this.transformDreamToViewModel(d);
        this.newDream = d;
      });
    }
  }
  transformDreamToViewModel(dream: Dream) {
    this.dreamViewModel = dream;
  }
  ionViewWillLeave(){
    // new dream
    if(this.newDream != undefined){
      this.events.publish('DreamPage:addDream', this.newDream);
    }
  }
}
