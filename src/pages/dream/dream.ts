import { Component } from '@angular/core';

import { NavController, AlertController, Events } from 'ionic-angular';
import { DreamService, Dream } from '../../services/dream.service'
import { DreamSprintsPage } from './dreamsprints/dreamsprints'
import { NewDreamPage } from './newdream/newdream'


@Component({
  selector: 'page-home',
  templateUrl: 'dream.html'
})
export class DreamPage {
  dreamViewModels: Dream[] = [];
  baseUrl: string = "/DreamTree/0/Dream";

  constructor(public navCtrl: NavController,
    public dreamService: DreamService,
    public alertController: AlertController,
    public events: Events) {
  }

  /**
   * Transform service dreams to page Model
   * @param dreams, dreams get from service layer
   */
  transformDreamToViewModel(dream: Dream) {
    this.dreamViewModels.push(dream);
  }

  ngOnInit() {
    this.dreamService.listObject(this.baseUrl).then((d) => {
      let dreams = d as Dream[];
      dreams.forEach((value, index, array)=>{
        this.transformDreamToViewModel(value);
      });
    });
  }

  tapDream(event, dreamModel: Dream) {
    this.navCtrl.push(DreamSprintsPage,
      { DreamBaseUrl: this.baseUrl, DreamUid:dreamModel.uid});
  }

  addDream(event) {
    this.events.subscribe('DreamPage:addDream', (d) => {
      this.transformDreamToViewModel(d as Dream);
      this.dreamService.setObject(this.baseUrl+"/"+(d as Dream).uid, d);
      this.events.unsubscribe('DreamPage:addDream');
    })
    this.navCtrl.push(NewDreamPage, 
      { DreamBaseUrl:this.baseUrl, DreamUid:undefined });
  }
  pressDream(event, dreamModel: Dream) {
    let confirm = this.alertController.create({
      title: '确认删除？',

      message: dreamModel.title,
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
            let move = false;
            console.log('Agree clicked, del' + "/DreamTree/0/Dream/" + dreamModel.uid);
            this.dreamViewModels.forEach(
              (value, index, array) => {
                if (value == dreamModel) {
                  move = true;
                  return;
                }
                if (move) {
                  array[index - 1] = array[index];
                }
              }
            );

            if (move) {
              this.dreamViewModels.length--;
            }
            //remove from service
            this.dreamService.delObject(this.baseUrl + dreamModel.uid);
          }
        }
      ]
    });


    let promptmenu = this.alertController.create({
      cssClass: 'custom-alert',
      buttons: [
        {
          text: '编辑',
          handler: data => {
            this.navCtrl.push(NewDreamPage,
              { DreamBaseUrl:this.baseUrl, DreamUid:dreamModel.uid });
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
