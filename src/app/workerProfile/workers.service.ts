import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(
    private db: AngularFirestore
  ) { }

  getWorker(workerId: string){
    return this.db.doc('workers/' + workerId).valueChanges({idField: 'id'});
  }

  updateWorkerProfile(workerId:string, profileDetails: any){
    let phone = profileDetails.phone;
    let currentProject = profileDetails.currentProject;
    let address = profileDetails.address;
    console.log(phone, currentProject, address);

    return this.db.doc('workers/'+ workerId).update(profileDetails)
    .then(() => {
      this.db.collection('strikes').ref.where('worker.id', '==', workerId).get().then((query) => {
        query.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          this.db.doc('strikes/'+ doc.id).update({'worker.phone': phone, 'worker.currentProject': currentProject, 'worker.address': address });
        });
      }).then(() => {
        this.db.collection('appeals').ref.where('strike.worker.id', '==', workerId).get().then((query) => {
          query.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            this.db.doc('appeals/'+ doc.id).update({'strike.worker.phone': phone, 'strike.worker.currentProject': currentProject, 'strike.worker.address': address});
          });
        });
      });
    });

  }


}
