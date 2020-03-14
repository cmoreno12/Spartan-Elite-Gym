import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  constructor(private db:AngularFirestore) { }

  getData(collection:string){
    return this.db.collection(collection).snapshotChanges();
  }

  createElement(collection:string,data:any){
    return this.db.collection(collection).add(data);
  }
}
