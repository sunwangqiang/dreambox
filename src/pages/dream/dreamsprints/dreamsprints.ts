import { Component } from '@angular/core';

import { NavController, NavParams, Events } from 'ionic-angular';
import { Dream, Sprint, DataModelService } from '../../../services/dream.service'
import { SprintDetailsPage } from './sprintdetails/sprintdetails'

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamsprints.html',
})
export class DreamSprintsPage {
  sprintViewModels:Sprint[] = [];
  sprintBaseKey:string = undefined;
  dream: Dream;
  dreamKey:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataModelService:DataModelService,
              public events: Events) {

    let dreamBaseKey:string = navParams.get('DreamBaseKey');
    let dreamUid:number = navParams.get('DreamUid');
    this.dreamKey = dreamBaseKey +"/" + dreamUid;
    this.sprintBaseKey = dreamBaseKey +"/" + dreamUid + "/Sprint";

    this.dataModelService.get(dreamBaseKey +"/" + dreamUid).then((dream)=>{
      this.dream = dream as Dream;
      this.dream.sprintsUid.forEach((value, index, arrye)=>{
        this.dataModelService.get(this.sprintBaseKey+"/"+value).then((sprint)=>{
          this.transformSprintToViewModel(sprint);
        });
      });
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
      let sprint = s as Sprint;

      this.transformSprintToViewModel(sprint);
      
      //update dataModel
      this.dataModelService.set(this.sprintBaseKey+"/"+sprint.uid, s);
      this.dream.sprintsUid.push(sprint.uid);
      this.dataModelService.set(this.dreamKey, this.dream);

      this.events.unsubscribe('DreamSprintPage:addSprint');
    })
    this.navCtrl.push(SprintDetailsPage, 
      { SprintBaseUrl:this.sprintBaseKey, SprintUid:undefined } );
  }
  detailSprint(sprintModel:Sprint){
    this.navCtrl.push(SprintDetailsPage, 
      { SprintBaseUrl:this.sprintBaseKey, SprintUid:sprintModel.uid } );
  }
  likeSprint(sprint:Sprint){
    sprint.likes++;
  }
}
