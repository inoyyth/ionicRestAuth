import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { EmployeeServiceProvider } from '../../providers/employee-service/employee-service';

/**
 * Generated class for the EmployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {
  private buttonBack:boolean=false;
  developer = {};
  developers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private employeeProvider: EmployeeServiceProvider) {
    if (this.navCtrl.length() == 2) {
      this.buttonBack = true;
    }

    this.employeeProvider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        console.log('database Ready');
        this.loadDeveloperData();
      }
    })
  }

  loadDeveloperData() {
    this.employeeProvider.getAllDevelopers().then(data => {
      this.developers = data;
    })
  }

  addDeveloper() {
    this.employeeProvider.addDeveloper(this.developer['name'], this.developer['skill'], parseInt(this.developer['yearsOfExperience']))
    .then(data => {
      this.loadDeveloperData();
    });
    this.developer = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
  }

  back() {
    if (this.navCtrl.length() >= 1) {
      console.log(1);
      //this.navCtrl.push(DashboardPage);
    }
    if (this.navCtrl.length() >= 2) {
      console.log('basck');
      this.navCtrl.pop();
    }
  }
}
