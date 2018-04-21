import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Loading, AlertController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: any;
  loginData = {'username':'', 'password':''};
  data:any;
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  async doLogin() {
    this.showLoader();
    return await this.authService.login(this.loginData)
    .subscribe(res => {
      this.loading.dismiss();
      this.data = res;
      if (this.data.code === 200) {
        this.authService.createSession(this.data.data);
        this.navCtrl.push(HomePage);
      } else {
        this.presentToast('Username Or Password is Wrong');
      }
    }, (err) => {
      this.loading.dismiss();
      console.log('ERROR', err);
    });

  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating....'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: false
  });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
