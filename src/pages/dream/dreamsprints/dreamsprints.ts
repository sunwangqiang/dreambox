import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Dream, DreamSprint, DreamBox, DreamBoxService } from '../../../services/dreambox.service'
import { NewSprintPage } from './newsprint/newsprint'

@Component({
  selector: 'page-contact',
  templateUrl: 'dreamsprints.html'
})
export class DreamSprintsPage {
  dream: Dream;
  sprints:DreamSprint[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public dreamBoxService:DreamBoxService) {
    this.dream = navParams.get('dream');
    this.sprints = this.dream.sprints;

    /*
     * if there is no sprint, then add it
     */
    if(this.sprints.length == 0){
      this.addSprint()
      console.log(this.sprints);
    }
  }
  addSprint(){
    this.dreamBoxService.addSprint(this.dream, new DreamSprint());
  }
}
