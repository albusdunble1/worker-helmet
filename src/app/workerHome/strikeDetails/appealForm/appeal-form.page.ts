import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppealsService } from 'src/app/myAppeals/appeals.service';
import { StrikesService } from '../../strikes.service';

@Component({
  selector: 'app-appeal-form',
  templateUrl: './appeal-form.page.html',
  styleUrls: ['./appeal-form.page.scss'],
})
export class AppealFormPage implements OnInit {
  strikeSub: Subscription;
  strikeId;
  loadedStrike;

  constructor(
    private appealService: AppealsService,
    private strikeService: StrikesService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.strikeId = paramMap.get('strikeId');
      console.log(this.strikeId);

      this.strikeSub = this.strikeService.getStrike(this.strikeId).subscribe((strike) => {
        this.loadedStrike = strike;
      })
    });
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }

    this.loadingCtrl.create({
      message: 'Submitting appeal...'
    }).then(loadingEl => {
      loadingEl.present();


      let appealInfo = {
        reason: form.value.reason,
        date: new Date(),
        status: 'pending',
        strike: this.loadedStrike
      }
      this.appealService.createAppeal(appealInfo).then(data => {
        console.log(data);

        loadingEl.dismiss();
        form.reset();
        this.router.navigateByUrl('/tabs/home').then(() => {
          this.router.navigateByUrl('/tabs/appeals');
        });
      })


    })
  }

  ngOnDestroy(){
    if(this.strikeSub){
      this.strikeSub.unsubscribe();
    }
  }


}
