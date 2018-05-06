import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, ToastController, Events } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EmployeePage } from '../employee/employee';
import { RegisterPage } from '../register/register';
import { AreaPage } from '../area/area';
import { DashboardPage } from '../dashboard/dashboard';
declare var require: any; 
const Config = require('../../config/config.json');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private rootPage;
  private registerPage;
  private employeePage;
  private areaPage;
  private dashboardPage;

  @ViewChild(DashboardPage) dashboard : DashboardPage;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public alertCtrl:AlertController, public toastCtrl:ToastController, public events: Events) {
    
    this.rootPage = DashboardPage;
    this.registerPage = RegisterPage;
    this.employeePage = EmployeePage;
    this.areaPage = AreaPage;
    this.dashboardPage = DashboardPage;
  }

  ionOpened() {
    this.events.publish('menu:opened', '');
  }
  ionClosed() {
    this.events.publish('menu:closed', '');
  }

  openPage(p) {
    this.rootPage = p;
    //this.navCtrl.push(p);
  }

  ngAfterViewInit() {
    if(!localStorage.getItem(Config.TOKENKEY)) {
      this.navCtrl.setRoot(LoginPage);
    }
  }
  


  async logout() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
          this.authService.logout()
          .subscribe(res => {
            if (res) {
              this.presentToast('You Has Logged Out');
              this.navCtrl.setRoot(LoginPage);
            } else {
              this.presentToast('Logout Error');
            }
          }, (err) => {
            this.presentToast(err);
          });

          }
        }
      ]
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: false,
      showCloseButton: true
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
