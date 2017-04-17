import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataModelService } from '../../../services/data.model.service'
import { Dream } from '../../../services/dreamtree.dream'
import { SprintDetailsPage } from './sprintdetails/page'

@Component({
  selector: 'page-contact',
  templateUrl: 'page.html'
})
export class UsersPage {

  constructor(public navCtrl: NavController) {

  }

}
