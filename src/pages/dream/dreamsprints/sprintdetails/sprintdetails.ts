import { Component } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { AlertController, NavController, NavParams, Events } from 'ionic-angular';
import { DataModelService } from '../../../../services/data.model.service'
import { Sprint, MediaRecord, MediaRecordType} from '../../../../services/dreamtree.dream.sprint'
import { ImagePicker, ImagePickerOptions } from 'ionic-native';
import { Camera, CameraOptions } from 'ionic-native';
import { ImageResizer, ImageResizerOptions } from 'ionic-native';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from 'ionic-native';
import { SprintMediaSlidePage } from '../sprint.media.slide/page'

class SprintDetailsModel {
  sprint: Sprint;
  constructor(sprint: Sprint) {
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
  update: Boolean = true;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataModelService: DataModelService,
    public alertController: AlertController,
    public events: Events,
    private sanitizer: DomSanitizer) {

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
    if (sprint) {
      this.sprintDetailsModel = new SprintDetailsModel(sprint);
    }
  }
  save(){
    this.update = true;
    this.navCtrl.pop();
  }
  ionViewWillLeave() {
    //TODO: check content changed
    if (this.update) {
      this.dataModelService.set(this.sprintkey, this.sprintDetailsModel.sprint).then(() => {
        this.events.publish('SprintDetailsPage:UpdateSprint', this.sprintkey);
      });
    } else {
      this.dataModelService.del(this.sprintkey).then(() => {
        this.events.publish('SprintDetailsPage:DeleteSprint', this.sprintkey);
      });
    }
  }
  addmedia(): void {

    let promptmenu = this.alertController.create({
      cssClass: 'custom-alert',
      buttons: [
        {
          text: '选择照片',
          handler: data => {
            let imagePickerOptions: ImagePickerOptions = {};

            console.log("pic is tapped");

            //this.sprintDetailsModel.sprint.picturesUrl.push(new Date().getMilliseconds().toString())
            ImagePicker.getPictures(imagePickerOptions).then((results) => {
              for (let i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
                let imageResizerOptions: ImageResizerOptions = {
                  uri: results[i],
                  quality: 50,
                  width: 180,
                  height: 180,
                } as ImageResizerOptions;

                ImageResizer.resize(imageResizerOptions).then((filePath: string) => {
                  let mediaRecord: MediaRecord = {
                    type: MediaRecordType.PHOTO,
                    thumbnail: filePath,
                    full: results[i],
                  } as MediaRecord;
                  console.log(mediaRecord);
                  this.sprintDetailsModel.sprint.mediaRecord.push(mediaRecord);
                  this.dataModelService.set(this.sprintkey, this.sprintDetailsModel.sprint);
                });
              }
            }, (err) => { /*TODO*/ });

          },
        },
        {
          text: '拍摄照片',
          handler: data => {

            let cameraOptions: CameraOptions = {
              quality: 100,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.CAMERA,
            };

            console.log("take pic is tapped");
            Camera.getPicture(cameraOptions).then((result) => {
              console.log(result);
              let imageResizerOptions: ImageResizerOptions = {
                uri: result,
                quality: 50,
                width: 180,
                height: 180,
              } as ImageResizerOptions;

              ImageResizer.resize(imageResizerOptions).then((filePath: string) => {
                let mediaRecord: MediaRecord = {
                  type: MediaRecordType.PHOTO,
                  thumbnail: filePath,
                  full: result,
                } as MediaRecord;
                console.log(mediaRecord);
                this.sprintDetailsModel.sprint.mediaRecord.push(mediaRecord);
                this.dataModelService.set(this.sprintkey, this.sprintDetailsModel.sprint);
              });
            });

          },
        },
        {
          text: '音频',
          handler: data => {
            console.log("audio is tapped");
          },
        },
        {
          text: '拍摄视频',
          handler: data => {
            let options: CaptureVideoOptions = { limit: 1 };

            console.log("video is tapped");
            MediaCapture.captureVideo(options).then((media: MediaFile[]) => {
              console.log(media[0].fullPath);
              let mediaRecord: MediaRecord = {
                type: MediaRecordType.VIDEO,
                //thumbnail: filePath,
                full: media[0].fullPath,
              } as MediaRecord;
              console.log(mediaRecord);
              this.sprintDetailsModel.sprint.mediaRecord.push(mediaRecord);
              this.dataModelService.set(this.sprintkey, this.sprintDetailsModel.sprint);
            });
          },
        }
      ]
    });
    promptmenu.present();
  }
  delSprint(): void {
    this.update = false;
    this.navCtrl.pop();
  }
  viewMedia(mediaRecord:MediaRecord):void{
    //PhotoViewer.show(mediaRecord.full);
    let index = this.sprintDetailsModel.sprint.mediaRecord.indexOf(mediaRecord);
    this.navCtrl.push(SprintMediaSlidePage,
              { SprintKey: this.sprintkey, MediaRecordIndex: index });
  }
  getBackgroundImage(mediaRecord:MediaRecord){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${mediaRecord.thumbnail})`);
  }
}

