import { Component } from '@angular/core';
import { AlertController, NavController, NavParams , Events} from 'ionic-angular';
import { Sprint, DreamService } from '../../../../services/dream.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'sprintdetails.html',
})
export class SprintDetailsPage {
  sprintViewModel:Sprint = new Sprint();
  newSprint:Sprint = undefined;
  sprintUrl:string;

  constructor(public navCtrl: NavController,  
              public navParams: NavParams,
              public dreamService:DreamService,
              public alertController: AlertController,
              public events: Events) {

    let sprintBaseUrl = navParams.get('SprintBaseUrl');
    let sprintUid = navParams.get("SprintUid");

    if(sprintUid != undefined) {
      this.sprintUrl = sprintBaseUrl+"/"+sprintUid;
      this.dreamService.getObject(this.sprintUrl).then((sprint)=>{
        this.transformSprintToViewModel(sprint);
      })
    }else{
      this.dreamService.addObject(sprintBaseUrl).then((sprint)=>{
        this.transformSprintToViewModel(sprint);
        this.newSprint = sprint;
      });
    }
  }

  transformSprintToViewModel(sprint: Sprint) {
    this.sprintViewModel = sprint;
  }

  ionViewWillLeave(){
    // new dream
    if(this.newSprint != undefined){
      this.events.publish('DreamSprintPage:addSprint', this.newSprint);
    }
  }
  addmedia():void {

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
