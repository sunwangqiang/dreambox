import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Dream, DataModel } from '../../datamodel/datamodel'
import { DreamDetailsPage } from './details/details'
import { NewDreamPage } from './newdream/newdream'

@Component({
  selector: 'page-home',
  templateUrl: 'dream.html'
})
export class DreamPage {
  dreams:Dream[];

  constructor(public navCtrl: NavController,
              public model:DataModel,
              public alertController: AlertController) {
    this.dreams = model.list("Dream");
  }
  itemTapped(event, dream) {
    this.navCtrl.push(DreamDetailsPage, {
      item: dream
    });
  }
  itemAdd(event){
    this.navCtrl.push(NewDreamPage);
  }
  itemPressed(event, dream:Dream) {
    let prompt = this.alertController.create({
      cssClass:'custom-alert',
      buttons: [
        {
          text: '编辑',
          handler: data => {
            console.log('edit clicked');
          },
        },
        {
          text: '删除',
          handler: data => {
            console.log('Saved clicked');
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