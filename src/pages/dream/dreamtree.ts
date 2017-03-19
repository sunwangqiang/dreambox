import { Component } from '@angular/core';

import { NavController, AlertController, Events } from 'ionic-angular';
import { DataModelService, DreamTree, Dream } from '../../services/dream.service'
import { DreamSprintsPage } from './dreamsprints/dreamsprints'
import { DreamDetailsPage } from './dreamdetails/dreamdetails'


@Component({
  selector: 'page-home',
  templateUrl: 'dreamtree.html'
})
export class DreamTreePage {
  dreamViewModels: Dream[] = [];
  dreamBaseKey: string = "/DreamTree/0/Dream";
  dreamTreeKey: string = "/DreamTree/0";
  dreamTree: DreamTree;

  constructor(public navCtrl: NavController,
    public dataModelService: DataModelService,
    public alertController: AlertController,
    public events: Events) {
  }

  /**
   * Transform service dreams to page Model
   * @param dreams, dreams get from service layer
   */
  transformDreamToViewModel(dream: Dream): Dream {
    return dream;
  }

  ngOnInit() {
    this.dataModelService.get(this.dreamTreeKey).then((dt) => {
      this.dreamTree = dt as DreamTree;
      this.dreamTree.dreamsUid.forEach((value, index, array) => {
        this.dataModelService.get(this.dreamBaseKey + "/" + value).then((dream) => {
          this.dreamViewModels.push(this.transformDreamToViewModel(dream));
        })
      })
    });
  }

  tapDream(event, dreamModel: Dream) {
    this.navCtrl.push(DreamSprintsPage,
      { DreamBaseKey: this.dreamBaseKey, DreamUid: dreamModel.uid });
  }

  addDream(event) {
    this.events.subscribe('DreamPage:UpdateDream', (key) => {
      this.events.unsubscribe('DreamPage:UpdateDream');
      this.dataModelService.get(key).then((d)=>{
        let dream = d as Dream;
        this.dreamViewModels.push(this.transformDreamToViewModel(dream));

        this.dreamTree.dreamsUid.push(dream.uid);
        this.dataModelService.set(this.dreamTreeKey, this.dreamTree);
      });
      
    })
    this.navCtrl.push(DreamDetailsPage,
      { DreamBaseUrl: this.dreamBaseKey, DreamUid: undefined });
  }
  pressDream(event, dreamViewModel: Dream) {
    let confirm = this.alertController.create({
      title: '确认删除？',

      message: dreamViewModel.title,
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
            console.log('Agree clicked, del' + "/DreamTree/0/Dream/" + dreamViewModel.uid);

            let index = this.dreamViewModels.indexOf(dreamViewModel);
            if (index != -1) {
              this.dreamViewModels.splice(index, 1);
            }
            index = this.dreamTree.dreamsUid.indexOf(dreamViewModel.uid);
            if (index != -1) {
              this.dreamTree.dreamsUid.splice(index, 1);
            }
            //update ModelService
            this.dataModelService.set(this.dreamTreeKey, this.dreamTree);
            this.dataModelService.del(this.dreamBaseKey + "/" + dreamViewModel.uid);
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
            this.events.subscribe('DreamPage:UpdateDream', (key) => {
              this.events.unsubscribe('DreamPage:UpdateDream');
              this.dataModelService.get(key).then((d)=>{
                let index = this.dreamViewModels.indexOf(dreamViewModel);
                if(index != -1){
                  this.dreamViewModels[index] = d as Dream;
                  console.log(this.dreamViewModels);
                }
              });
            })
            this.navCtrl.push(DreamDetailsPage,
              { DreamBaseUrl: this.dreamBaseKey, DreamUid: dreamViewModel.uid });
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
