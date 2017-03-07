import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { DreamService, DreamTree, Dream} from '../../services/dream.service'
import { DreamSprintsPage } from './dreamsprints/dreamsprints'
import { NewDreamPage } from './newdream/newdream'

@Component({
  selector: 'page-home',
  templateUrl: 'dream.html'
})
export class DreamPage {
  dreams:Dream[]=[];

  constructor(public navCtrl: NavController,
              public dreamService:DreamService,
              public alertController: AlertController) {
  }
  ngOnInit(){
    this.dreamService.getDreamTree().then((d:DreamTree)=>{
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
  dreamPressed(event, dream:Dream) {
    let confirm = this.alertController.create({
      title: '确认删除？',

      message: dream.title,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            console.log('Agree clicked');
            this.dreamService.delDream(dream);
          }
        }
      ]
    });


    let promptmenu = this.alertController.create({
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
            confirm.present();
          },
        },
        {
          text: '统计',
          handler: data => {
            console.log('Cancel clicked');
          },
        }
      ]
    });
    promptmenu.present();
  }
}
