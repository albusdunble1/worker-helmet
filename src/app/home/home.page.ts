import { StrikesService } from './strikes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  strikeSub: Subscription;
  workerStrikes;
  workerId = 'pwTl5CFXSiq3XxR2BetX';
  streakCount;
  activeStrikesCount;

  constructor(
    private strikeService: StrikesService
  ) { }

  ngOnInit() {
    this.strikeSub = this.strikeService.getStrikes().subscribe((strikes) => {
      this.workerStrikes = strikes.filter((strike) => {
        return strike['worker'].id === this.workerId;
      })

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
    });



  }

  ngOnDestroy(){
    if(this.strikeSub){
      this.strikeSub.unsubscribe();
    }
  }

}