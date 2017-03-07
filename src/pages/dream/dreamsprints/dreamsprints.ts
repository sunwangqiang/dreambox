import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dream, DreamSprint, DreamService } from '../../../services/dream.service'
import { SprintDetailsPage } from './sprintdetails/sprintdetails'

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamsprints.html',
})
export class DreamSprintsPage {
  dream: Dream;
  sprints:DreamSprint[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dreamService:DreamService) {
    this.dream = navParams.get('dream');
    this.sprints = this.dream.sprints;
  }
  addSprint(){
    this.navCtrl.push(SprintDetailsPage, {dream: this.dream} );
    //this.dreamService.addSprint(this.dream, new DreamSprint());
  }
  detailSprint(sprint:DreamSprint){
    this.navCtrl.push(SprintDetailsPage, {dream: this.dream, sprint:sprint} );
  }

  likeSprint(sprint:DreamSprint){
    sprint.likes++;
  }
}
