import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Dream, DreamBox } from '../../datamodel/datamodel'
import { DreamSprintsPage } from './dreamsprints/dreamsprints'
import { NewDreamPage } from './newdream/newdream'

@Component({
  selector: 'page-home',
  templateUrl: 'dream.html'
})
export class DreamPage {
  dreams:Dream[];

  constructor(public navCtrl: NavController,
              public dreamBox:DreamBox,
              public alertController: AlertController) {
    //model.list("Dream").then((d)=>{this.dreams = d});
    this.dreams = dreamBox.listDream();
  }
  dreamTapped(event, dream) {
    this.navCtrl.push(DreamSprintsPage, {dream: dream} );
  }
  dreamAdd(event){
    this.navCtrl.push(NewDreamPage, {dream: undefined});
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
            this.dreamBox.delDream(dream);
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

/*
@Component({
  template: `
<ion-content>
  <ion-list>
    <ion-item>
      <button ion-button color="light" full>编辑</button>
      <button ion-button color="light" full>删除</button>
    </ion-item>
    <ion-item>
      <p>
    <button ion-button color="light" full>Light</button>
  </p>
  <p>
    <button ion-button full>Default</button>
  </p>

  <p>
    <button ion-button color="secondary" full>Secondary</button>
  </p>

  <p>
    <button ion-button color="danger" full>Danger</button>
  </p>
  <p>
    <button ion-button color="dark" full>Dark</button>
  </p>
    </ion-item>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  character;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
*/