import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { WorkersService } from './workers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  workerId = '';
  loadedWorker;
  isLoading = false;

  workerSub: Subscription;

  constructor(
    private workerService: WorkersService,
    private loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.loadingCtrl.create({
      message: 'Loading Profile...'
    }).then(loadingEl => {
      console.log(this.fireAuth.currentUser);
      this.isLoading = true;
      loadingEl.present();
      this.fireAuth.authState.subscribe(data => {
        console.log(data.uid);
        this.workerId = data.uid;

        this.workerSub = this.workerService.getWorker(this.workerId).subscribe((worker) => {
          this.loadedWorker = worker;
          console.log(this.loadedWorker);
          this.isLoading = false;
          loadingEl.dismiss();
        });
      });

    })
  }

  onLogout(){
    this.fireAuth.signOut().then(() => {
      this.navCtrl.navigateBack('/login');
    });;
  }

  ngOnDestroy(){
    if(this.workerSub){
      this.workerSub.unsubscribe();
    }
  }

}
