import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Events } from 'ionic-angular';
import { Sprint, DataModelService } from '../../../../services/dream.service'
import { ImagePicker, ImagePickerOptions } from 'ionic-native';
//import { Camera, CameraOptions } from 'ionic-native';

class SprintDetailsModel{
  sprint:Sprint;
  constructor(sprint:Sprint){
    this.sprint = sprint;
  }
}

@Component({
  selector: 'page-contact',
  templateUrl: 'sprintdetails.html',
})
export class SprintDetailsPage {
  sprintDetailsModel: SprintDetailsModel = new SprintDetailsModel(new Sprint());
  newSprint: Sprint = undefined;
  sprintkey: string;
  update:Boolean = true;

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
    if(sprint){
      this.sprintDetailsModel = new SprintDetailsModel(sprint);
    }
  }

  ionViewWillLeave() {
    //TODO: check content changed
    if(this.update){
      this.dataModelService.set(this.sprintkey, this.sprintDetailsModel.sprint).then(() => {
        this.events.publish('DreamSprintPage:UpdateSprint', this.sprintkey);
      });
    }else{
      this.dataModelService.del(this.sprintkey).then(() => {
        this.events.publish('DreamSprintPage:DeleteSprint', this.sprintkey);
      });
    }
  }
  addmedia(): void {

    let promptmenu = this.alertController.create({
      cssClass: 'custom-alert',
      buttons: [
        {
          text: '照片',
          handler: data => {
            let option:ImagePickerOptions = {};

            console.log("pic is tapped");
            
            //this.sprintDetailsModel.sprint.picturesUrl.push(new Date().getMilliseconds().toString())
            ImagePicker.getPictures(option).then((results) => {
              for (let i = 0; i < results.length; i++) {
                  console.log('Image URI: ' + results[i]);
                  this.sprintDetailsModel.sprint.picturesUrl.push(results[i]);
              }
            }, (err) => { });
            
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
  delSprint():void{
    this.update = false;
    this.navCtrl.pop();
  }
}
