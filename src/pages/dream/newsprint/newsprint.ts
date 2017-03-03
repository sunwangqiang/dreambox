import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { Dream, DreamSprint, DreamBoxService } from '../../../services/dreambox.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'newsprint.html'
})
export class NewSprintPage {
  dream:Dream;
  sprint:DreamSprint;
  newSprint:boolean = false;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamBoxService:DreamBoxService) {
    let s = navParams.get('sprint');
    this.dream = navParams.get('dream');
    if(s != undefined) {
      this.sprint = s;
    }else{
      this.sprint = new DreamSprint();
      this.newSprint = true;
    }
  }

  ngOnDestroy() {
    if(this.newSprint){
      this.dreamBoxService.addSprint(this.dream, this.sprint);
    }
  }

}
