import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private fireAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    this.loadingCtrl.create({
      message: 'Logging In...'
    }).then(loadingEl => {
      loadingEl.present();
      let res = this.fireAuth.signInWithEmailAndPassword(form.value.email, form.value.password);
      res.then(data => {
        loadingEl.dismiss();
        if(data.user.uid !== 'VxpBkac1aXhrHVzQcQFJg2rEIwi1'){
          this.navCtrl.navigateForward('/tabs/home');
        }else{
          this.alertCtrl.create({
            header: 'Invalid Login!',
            message: 'Only worker accounts are allowed to access',
            buttons: ['Ok']
          }).then(alertEl => {
            alertEl.present();
          });
        }
      }).catch(err => {
        loadingEl.dismiss();
        this.alertCtrl.create({
          header: 'Invalid Login!',
          message: err,
          buttons: ['Ok']
        }).then(alertEl => {
          alertEl.present();
        });
      })
    });
  }


}
