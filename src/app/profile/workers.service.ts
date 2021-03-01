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
}
