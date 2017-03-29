import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { Sprint, MediaRecord, DataModelService, MediaRecordType } from '../../../../services/dream.service'

@Component({
  templateUrl: 'template.html'
})
export class SprintMediaSlidePage {
  @ViewChild(Slides) slideView: Slides;
  initialSlide:number = 1;
  mediaRecords = [];
  photo = MediaRecordType.PHOTO;
  video = MediaRecordType.VIDEO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataModelService: DataModelService){

    this.initialSlide = navParams.get("MediaRecordIndex");
    let sprintKey = navParams.get("SprintKey");

    dataModelService.get(sprintKey).then((s)=>{
      let sprint = s as Sprint;
      sprint.mediaRecord.forEach((value, index, array)=>{
        //console.log(value);
        this.mediaRecords.push(value);
      })
    });
  }

  exit(){
    this.navCtrl.pop();
  }
}
