import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StrikesService {

  constructor(
    private db: AngularFirestore
  ) { }

  getStrikes(){
    return this.db.collection('strikes').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return {id: id, ...data as {}};
      })
    }));
  }

  getStrike(id: string){
    return this.db.doc('strikes/' + id).valueChanges({idField: 'id'});
  }


}
