import { Component } from '@angular/core';

import { NavController, NavParams, Events } from 'ionic-angular';
import { Dream, Sprint, DataModelService } from '../../../services/dream.service'
import { SprintDetailsPage } from './sprintdetails/sprintdetails'

class DreamSprintsModel{
  sprint: Sprint;
  createTime:string;
  constructor(sprint:Sprint){
    let start:Date = new Date(sprint.start);
    this.createTime = start.getFullYear() + "-" + (start.getMonth()+1)+ "-"
                      + start.getDate() + " " + start.getHours() + ":" + start.getMinutes();
    this.sprint = sprint;
  }
}

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamsprints.html',
})
export class DreamSprintsPage {
  dreamSprintModels: DreamSprintsModel[] = [];
  sprintBaseKey: string = undefined;
  dream: Dream = new Dream();
  dreamKey: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataModelService: DataModelService,
    public events: Events) {

    let dreamBaseKey: string = navParams.get('DreamBaseKey');
    let dreamUid: number = navParams.get('DreamUid');
    this.dreamKey = dreamBaseKey + "/" + dreamUid;
    this.sprintBaseKey = dreamBaseKey + "/" + dreamUid + "/Sprint";

    this.dataModelService.get(dreamBaseKey + "/" + dreamUid).then((d) => {
      this.dream = d as Dream;
      this.dream.sprintsUid.forEach((value, index, arrye) => {
        this.dataModelService.get(this.sprintBaseKey + "/" + value).then((sprint) => {
          if(sprint){
            this.dreamSprintModels.push(this.transformSprintToViewModel(sprint));
          }
        });
      });
    });

  }
  /**
   * Transform service sprints to view Model
   * @param sprint, sprint that get from service layer
   */
  transformSprintToViewModel(sprint: Sprint):DreamSprintsModel {
    let sprintViewModel = new DreamSprintsModel(sprint);
    return sprintViewModel;
  }

  addSprint() {
    this.events.subscribe('DreamSprintPage:UpdateSprint', (key) => {
      this.events.unsubscribe('DreamSprintPage:UpdateSprint');

      this.dataModelService.get(key).then((s) => {
        let sprint = s as Sprint;
        this.dreamSprintModels.splice(0, 0, this.transformSprintToViewModel(sprint));
        //update dataModel
        this.dream.sprintsUid.splice(0, 0, sprint.uid);
        this.dataModelService.set(this.dreamKey, this.dream);
      });
    })
    this.navCtrl.push(SprintDetailsPage,
      { SprintBaseKey: this.sprintBaseKey, SprintUid: undefined });
  }
  detailSprint(dreamSprintModel: DreamSprintsModel) {
    this.events.subscribe('DreamSprintPage:UpdateSprint', (key) => {
      this.events.unsubscribe('DreamSprintPage:UpdateSprint');
      this.dataModelService.get(key).then((s) => {
        let index = this.dreamSprintModels.indexOf(dreamSprintModel);
        if (index != -1) {
          this.dreamSprintModels[index] = this.transformSprintToViewModel(s as Sprint);
          console.log(this.dreamSprintModels);
        }
      });
    });

    this.events.subscribe('DreamSprintPage:DeleteSprint', (key) => {
      this.events.unsubscribe('DreamSprintPage:DeleteSprint');
      let index = this.dreamSprintModels.indexOf(dreamSprintModel);
      if (index != -1) {
        this.dreamSprintModels.splice(index, 1);

        let uidIndex = this.dream.sprintsUid.indexOf(dreamSprintModel.sprint.uid);
        if(uidIndex){
          this.dream.sprintsUid.splice(uidIndex, 1);
          this.dataModelService.set(this.dreamKey, this.dream);
        }
        console.log(this.dreamSprintModels);
      }
    });

    this.navCtrl.push(SprintDetailsPage,
      { SprintBaseKey: this.sprintBaseKey, SprintUid: dreamSprintModel.sprint.uid });
  }
  likeSprint(sprint: Sprint) {
    sprint.likes++;
  }
}
