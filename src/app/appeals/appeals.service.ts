import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppealsService {

  constructor(
    private db: AngularFirestore
  ) { }

  getAppeals(){
    return this.db.collection('appeals').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return {id: id, ...data as {}};
      })
    }));
  }

  createAppeal(appealInfo){
    return this.db.collection('appeals').add(appealInfo);
  }
}
