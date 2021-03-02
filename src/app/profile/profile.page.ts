import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { WorkersService } from './workers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  workerId = 'pwTl5CFXSiq3XxR2BetX';
  loadedWorker;
  isLoading = false;

  workerSub: Subscription;

  constructor(
    private workerService: WorkersService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Loading Profile...'
    }).then(loadingEl => {
      this.isLoading = true;
      loadingEl.present();
      this.workerSub = this.workerService.getWorker(this.workerId).subscribe((worker) => {
        this.loadedWorker = worker;
        console.log(this.loadedWorker);
        this.isLoading = false;
        loadingEl.dismiss();
      });
    })



  }

  ngOnDestroy(){
    if(this.workerSub){
      this.workerSub.unsubscribe();
    }
  }

}
