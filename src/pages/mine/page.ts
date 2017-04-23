import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataModelService } from '../../services/data.model.service'
import { Dream } from '../../services/dreamtree.dream'
import { DreamTreeUser } from '../../services/dreamtree.user'

@Component({
  selector: 'page-contact',
  templateUrl: 'page.html'
})
export class MinePage {
  subcribers: DreamTreeUser[] = [];

  constructor(private navCtrl: NavController,
              private dataModelService: DataModelService) {
    dataModelService.get("/DreamTree/Subcribers").then((data:DreamTreeUser[])=>{
      this.subcribers = data;
    });
  }
}
