import { Subscription } from 'rxjs';
import { LoadingController, NavController } from '@ionic/angular';
import { WorkersService } from './../workers.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
  workerId = 'pwTl5CFXSiq3XxR2BetX';
  loadedWorker;
  workerSub:Subscription;
  isLoading = true;

  form: FormGroup;

  constructor(
    private workerService: WorkersService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      phone: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      currentProject: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });

    this.workerSub = this.workerService.getWorker(this.workerId).subscribe((worker) => {
      this.loadedWorker = worker;
      console.log(this.loadedWorker);
      this.isLoading = false;

      this.form.patchValue({
        phone: this.loadedWorker.phone,
        currentProject: this.loadedWorker.currentProject,
        address: this.loadedWorker.address
      });
    });
  }

  onEditProfile(){
    this.loadingCtrl.create({
      message: 'Editing Profile...'
    }).then(loadingEl => {
      loadingEl.present();

      console.log(this.form);

      let profileDetails = {
        phone: this.form.value.phone,
        currentProject: this.form.value.currentProject,
        address: this.form.value.address
      }

      this.workerService.updateWorkerProfile(this.workerId, profileDetails).then(() => {
        console.log('yay all updated!');
        loadingEl.dismiss();
        this.navCtrl.navigateBack('/tabs/profile');
      });
    })

  }


  ngOnDestroy(){
    if(this.workerSub){
      this.workerSub.unsubscribe();
    }
  }

}
