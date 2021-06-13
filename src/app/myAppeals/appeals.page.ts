import { AppealsService } from './appeals.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-appeals',
  templateUrl: './appeals.page.html',
  styleUrls: ['./appeals.page.scss'],
})
export class AppealsPage implements OnInit {
  workerId= 'pwTl5CFXSiq3XxR2BetX';
  loadedWorker;
  loadedAppeals = [];
  message = '';

  appealSub: Subscription;


  constructor(
    private appealService: AppealsService,
    private loadingCtrl: LoadingController,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.loadingCtrl.create({
      message: 'Loading Appeals...'
    }).then(loadingEl => {
      loadingEl.present();

      this.fireAuth.authState.subscribe(data => {
        this.workerId = data.uid;

        this.appealSub = this.appealService.getAppeals().subscribe((appeals) => {
          this.loadedAppeals = appeals.filter(appeal => {
            return appeal['strike'].worker.id === this.workerId;
          });

          if(this.loadedAppeals.length === 0){
            this.message = 'You do not have any appeals!';
            loadingEl.dismiss();
          }

          // sort array by latest date
          this.loadedAppeals = this.loadedAppeals.sort(function(a,b){
            return b.date - a.date;
          });

          loadingEl.dismiss();
        });
      });


    });


  }

}
