import { StrikesService } from './strikes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  strikeSub: Subscription;
  workerStrikes = [];
  workerId = 'pwTl5CFXSiq3XxR2BetX';
  streakCount = 0;
  activeStrikesCount = 0;
  isLoading = false;

  constructor(
    private strikeService: StrikesService,
    private loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.getWorkerStrikesList();
  }

  getWorkerStrikesList(){
    this.loadingCtrl.create({
      message: 'Loading...'
    }).then(loadingEl => {
      this.isLoading = true;
      loadingEl.present();

      this.fireAuth.authState.subscribe(data => {
        this.workerId = data.uid;

        this.strikeSub = this.strikeService.getStrikes().subscribe((strikes) => {

          this.workerStrikes = strikes.filter((strike) => {
            return strike['worker'].id === this.workerId;
          })

          // check if the worker has at least one strike
          if(this.workerStrikes.length > 0) {
            console.log(this.workerStrikes);

            // sort array by latest date
            this.workerStrikes = this.workerStrikes.sort(function(a,b){
              return b.date - a.date;
            });

            // calculate active strikes
            this.activeStrikesCount = this.workerStrikes.filter(strike => {
              return strike.status === 'active';
            }).length;
            console.log(this.activeStrikesCount);


            // calculate streak
            let lastStrike = this.workerStrikes[0].date.toDate();
            let today = new Date();

            console.log(lastStrike, today)

            this.streakCount = Math.floor((today.getTime() - lastStrike.getTime()) / 1000 / 60 / 60 / 24);
            console.log(this.streakCount);
          }


          loadingEl.dismiss();
          this.isLoading = false;
        });
      });


    });
  }

  ngOnDestroy(){
    if(this.strikeSub){
      this.strikeSub.unsubscribe();
    }
  }

}
