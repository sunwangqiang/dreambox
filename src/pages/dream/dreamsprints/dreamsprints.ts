import { Component } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { NavController, NavParams, Events } from 'ionic-angular';
import { DataModelService } from '../../../services/data.model.service'
import { Sprint, MediaRecord, MediaRecordType} from '../../../services/dreamtree.dream.sprint'
import { Dream } from '../../../services/dreamtree.dream'
import { SprintDetailsPage } from './sprintdetails/sprintdetails'
import { SprintMediaSlidePage } from './sprint.media.slide/page'

class DreamSprintModel{
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
  dreamSprintModels: DreamSprintModel[] = [];
  sprintBaseKey: string = undefined;
  dream: Dream = new Dream();
  dreamKey: string;
  photo = MediaRecordType.PHOTO;
  video = MediaRecordType.VIDEO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataModelService: DataModelService,
    public events: Events,
    private sanitizer: DomSanitizer) {

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
  transformSprintToViewModel(sprint: Sprint):DreamSprintModel {
    let sprintViewModel = new DreamSprintModel(sprint);
    return sprintViewModel;
  }

  addSprint() {
    this.events.subscribe('SprintDetailsPage:UpdateSprint', (key) => {
      this.events.unsubscribe('SprintDetailsPage:UpdateSprint');

      this.dataModelService.get(key).then((s) => {
        let sprint = s as Sprint;
        this.dreamSprintModels.splice(0, 0, this.transformSprintToViewModel(sprint));
        //update dataModel
        this.dream.sprintsUid.splice(0, 0, sprint.uid);
        this.dream.totalStars = this.dream.totalStars + sprint.stars;
        this.dream.totalSprints = this.dream.totalSprints + 1;
        this.dataModelService.set(this.dreamKey, this.dream);
      });
    })
    this.navCtrl.push(SprintDetailsPage,
      { SprintBaseKey: this.sprintBaseKey, SprintUid: undefined });
  }
  detailSprint(dreamSprintModel: DreamSprintModel) {
    this.events.subscribe('SprintDetailsPage:UpdateSprint', (key) => {
      this.events.unsubscribe('SprintDetailsPage:UpdateSprint');
      this.dataModelService.get(key).then((s) => {
        let index = this.dreamSprintModels.indexOf(dreamSprintModel);
        if (index != -1) {
          let sprint = s as Sprint;
          this.dreamSprintModels[index] = this.transformSprintToViewModel(sprint);
          this.dream.totalStars = this.dream.totalStars - dreamSprintModel.sprint.stars;
          this.dream.totalStars = this.dream.totalStars + sprint.stars;
          console.log(this.dreamSprintModels);
        }
      });
    });

    this.events.subscribe('SprintDetailsPage:DeleteSprint', (key) => {
      this.events.unsubscribe('SprintDetailsPage:DeleteSprint');
      let index = this.dreamSprintModels.indexOf(dreamSprintModel);
      if (index != -1) {
        this.dreamSprintModels.splice(index, 1);

        let uidIndex = this.dream.sprintsUid.indexOf(dreamSprintModel.sprint.uid);
        if(uidIndex != -1){
          this.dream.totalStars = this.dream.totalStars - dreamSprintModel.sprint.stars;
          this.dream.totalSprints = this.dream.totalSprints - 1;
          this.dream.sprintsUid.splice(uidIndex, 1);
          this.dataModelService.set(this.dreamKey, this.dream);
        }
        console.log(this.dream);
      }
    });

    this.navCtrl.push(SprintDetailsPage,
      { SprintBaseKey: this.sprintBaseKey, SprintUid: dreamSprintModel.sprint.uid });
  }
  viewMedia(dreamSprintModel:DreamSprintModel, mediaRecord:MediaRecord):void{
    //PhotoViewer.show(mediaRecord.full);
    let sprintkey = this.sprintBaseKey+"/"+dreamSprintModel.sprint.uid;
    let index = dreamSprintModel.sprint.mediaRecord.indexOf(mediaRecord);
    this.navCtrl.push(SprintMediaSlidePage,
              { SprintKey: sprintkey, MediaRecordIndex: index });
  }
  getBackgroundImage(mediaRecord:MediaRecord){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${mediaRecord.thumbnail})`);
  }
  likeSprint(sprint: Sprint) {
    sprint.likes++;
  }
}
