import { Component } from '@angular/core';

import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Dream, DreamSprint, DreamService } from '../../../../services/dream.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'sprintdetails.html',
})
export class SprintDetailsPage {
  dream:Dream;
  sprint:DreamSprint;
  newSprint:boolean = false;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
              public dreamService:DreamService,
              public alertController: AlertController) {
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
      this.dreamService.addSprint(this.dream, this.sprint);
    }
  }
  addmediam():void {

    let promptmenu = this.alertController.create({
      cssClass:'custom-alert',
      buttons: [
        {
          text: '照片',
          handler: data => {
            console.log("pic is tapped");
          },
        },
        {
          text: '音频',
          handler: data => {
            console.log("audio is tapped");
          },
        },
        {
          text: '视频',
          handler: data => {
            console.log("video is tapped");
          },
        }
      ]
    });
    promptmenu.present();
  }
}
