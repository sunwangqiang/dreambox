import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Events } from 'ionic-angular';
import { Sprint, DataModelService } from '../../../../services/dream.service'

@Component({
  selector: 'page-contact',
  templateUrl: 'sprintdetails.html',
})
export class SprintDetailsPage {
  sprintViewModel: Sprint = new Sprint();
  newSprint: Sprint = undefined;
  sprintkey: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataModelService: DataModelService,
    public alertController: AlertController,
    public events: Events) {

    let sprintBaseKey = navParams.get('SprintBaseKey');
    let sprintUid = navParams.get("SprintUid");

    if (sprintUid != undefined) {
      this.sprintkey = sprintBaseKey + "/" + sprintUid;
      this.dataModelService.get(this.sprintkey).then((sprint) => {
        this.transformSprintToViewModel(sprint);
      })
    } else {
      this.dataModelService.add(sprintBaseKey).then((s) => {
        let sprint = s as Sprint;
        this.transformSprintToViewModel(sprint);
        this.newSprint = sprint;
        this.sprintkey = sprintBaseKey + "/" + sprint.uid;
      });
    }
  }

  transformSprintToViewModel(sprint: Sprint) {
    this.sprintViewModel = sprint;
  }

  ionViewWillLeave() {
    // new dream
    this.dataModelService.set(this.sprintkey, this.sprintViewModel).then(() => {
      this.events.publish('DreamSprintPage:UpdateSprint', this.sprintkey);
    });
  }
  addmedia(): void {

    let promptmenu = this.alertController.create({
      cssClass: 'custom-alert',
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
