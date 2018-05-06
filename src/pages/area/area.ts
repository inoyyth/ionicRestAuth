import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-area',
  templateUrl: 'area.html',
})
export class AreaPage {
  private listArea;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider) {
  }

  async ionViewDidLoad() {
    return await this.authService.listArea().
    subscribe(res => {
      //this.loading.dismiss();
      console.log(res);
      this.listArea = res;
      // if (this.data.code === 200) {
      //   this.authService.createSession(this.data.data);
      //   this.navCtrl.push(HomePage);
      // } else {
      //   this.presentToast('Username Or Password is Wrong');
      // }
    }, (err) => {
      //this.loading.dismiss();
      console.log('ERROR', err);
    });
  }

}
