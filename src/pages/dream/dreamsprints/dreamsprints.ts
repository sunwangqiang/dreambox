import { Component } from '@angular/core';

import { NavController, NavParams, Events } from 'ionic-angular';
import { Sprint, DreamService } from '../../../services/dream.service'
import { SprintDetailsPage } from './sprintdetails/sprintdetails'

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamsprints.html',
})
export class DreamSprintsPage {
  sprintViewModels:Sprint[] = [];
  sprintBaseUrl:string = undefined;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dreamService:DreamService,
              public events: Events) {

    let dreamBaseUrl:string = navParams.get('DreamBaseUrl');
    let dreamUid:number = navParams.get('DreamUid');

    this.sprintBaseUrl = dreamBaseUrl +"/" + dreamUid + "/Sprint";
    this.dreamService.listObject(this.sprintBaseUrl).then((sprints)=>{
        sprints.forEach((value, index, array)=>{
          this.transformSprintToViewModel(value);
        })
      });
  }
  /**
   * Transform service sprints to view Model
   * @param sprint, sprint that get from service layer
   */
  transformSprintToViewModel(sprint: Sprint) {
    this.sprintViewModels.push(sprint);
  }
  addSprint(){
    this.events.subscribe('DreamSprintPage:addSprint', (s) => {
      this.transformSprintToViewModel(s as Sprint);
      this.dreamService.setObject(this.sprintBaseUrl+"/"+(s as Sprint).uid, s);
      this.events.unsubscribe('DreamSprintPage:addSprint');
    })
    this.navCtrl.push(SprintDetailsPage, 
      { SprintBaseUrl:this.sprintBaseUrl, SprintUid:undefined } );
  }
  detailSprint(sprintModel:Sprint){
    this.navCtrl.push(SprintDetailsPage, 
      { SprintBaseUrl:this.sprintBaseUrl, SprintUid:sprintModel.uid } );
  }
  likeSprint(sprint:Sprint){
    sprint.likes++;
  }
}
