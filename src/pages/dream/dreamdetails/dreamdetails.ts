import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { DataModelService } from '../../../services/data.model.service'
import { Dream } from '../../../services/dreamtree.dream'

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamdetails.html'
})

export class DreamDetailsPage {
  dreamViewModel:Dream = new Dream();
  dreamUrl:string;
  
  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dataModelService:DataModelService, public events: Events) {
    let dreamBaseUrl:string = navParams.get('DreamBaseUrl');
    let dreamUid:number = navParams.get('DreamUid');
    
    if(dreamUid != undefined) {
      this.dataModelService.get(dreamBaseUrl+"/"+dreamUid).then((d)=>{
        this.dreamViewModel = this.transformDreamToViewModel(d);
        this.dreamUrl = dreamBaseUrl+"/"+dreamUid;
      });
    }else{
      this.dataModelService.add(dreamBaseUrl).then((d)=>{
        this.dreamViewModel = this.transformDreamToViewModel(d);
        this.dreamUrl = dreamBaseUrl+"/"+(d as Dream).uid;
      });
    }
  }
  transformDreamToViewModel(dream: Dream):Dream {
    return dream;
  }
  ionViewWillLeave(){
    if(this.dreamUrl){
      this.dataModelService.set(this.dreamUrl, this.dreamViewModel).then(()=>{
        this.events.publish('DreamPage:UpdateDream', this.dreamUrl);
      });
      
    }
    
  }
  save(){
    this.navCtrl.pop();
  }
}
