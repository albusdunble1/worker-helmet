import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StrikesService } from '../strikes.service';

@Component({
  selector: 'app-strike-details',
  templateUrl: './strike-details.page.html',
  styleUrls: ['./strike-details.page.scss'],
})
export class StrikeDetailsPage implements OnInit, OnDestroy {
  strikeSub: Subscription;
  strikeId;
  loadedStrike;

  constructor(
    private strikeService: StrikesService,
    private toastCtrl: ToastController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getWorkerStrikesDetails();
  }

  getWorkerStrikesDetails(){
    this.route.paramMap.subscribe(paramMap => {
      this.strikeId = paramMap.get('strikeId');
      console.log(this.strikeId);

      this.strikeSub = this.strikeService.getStrike(this.strikeId).subscribe((strike) => {
        this.loadedStrike = strike;
      })
    });
  }

  ngOnDestroy(){
    if(this.strikeSub){
      this.strikeSub.unsubscribe();
    }
  }

}
