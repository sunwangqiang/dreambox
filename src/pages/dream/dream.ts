import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { DreamBoxService, DreamBox, Dream} from '../../services/dreambox.service'
import { DreamSprintsPage } from './dreamsprints/dreamsprints'
import { NewDreamPage } from './newdream/newdream'
import { NewSprintPage } from './newsprint/newsprint'

@Component({
  selector: 'page-home',
  templateUrl: 'dream.html'
})
export class DreamPage {
  dreams:Dream[]=[];

  constructor(public navCtrl: NavController,
              public dreamBoxService:DreamBoxService,
              public alertController: AlertController) {
  }
  ngOnInit(){
    this.dreamBoxService.getDreamBox().then((d:DreamBox)=>{
      if(d){
        this.dreams = d.dreams;
      }
    });
  }
  dreamTapped(event, dream) {
    this.navCtrl.push(DreamSprintsPage, {dream: dream} );
  }
  dreamAdd(event){
    this.navCtrl.push(NewDreamPage, {dream: undefined});
  }
  sprintAdd(event, dream:Dream){
    this.navCtrl.push(NewSprintPage, {dream: dream} );
  }
  dreamPressed(event, dream:Dream) {
    let prompt = this.alertController.create({
      cssClass:'custom-alert',
      buttons: [
        {
          text: '编辑',
          handler: data => {
            this.navCtrl.push(NewDreamPage, {dream: dream});
          },
        },
        {
          text: '删除',
          handler: data => {
            this.dreamBoxService.delDream(dream);
          },
        },
        {
          text: '添加小目标',
          handler: data => {
            console.log('Cancel clicked');
          },
        }
      ]
    });
    prompt.present();
  }
}
