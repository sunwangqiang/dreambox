import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dream, DreamSprint, DreamBox } from '../../../datamodel/datamodel'
import { NewSprintPage } from './newsprint/newsprint'

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamsprints.html'
})
export class DreamSprintsPage {
  dream: Dream;
  sprints:DreamSprint[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dreamBox:DreamBox) {
    this.dream = navParams.get('dream');
    this.sprints = this.dream.listSprint();

    /*
     * if there is no sprint, then add it
     */
    if(this.sprints.length == 0){
      this.dream.newSprint();
      console.log(this.sprints[0]);
    }
  }
  sprintAdd(event){
    this.dream.newSprint();
  }
}
