import { Injectable } from '@angular/core';
import{ AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument}
from 'angularfire2/firestore'; 
import { Observable } from 'rxjs';
import {Item} from '../model/Item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
 itemsCollection : AngularFirestoreCollection<Item>;
 items: Observable<Item[]>;
 itemDoc: AngularFirestoreDocument<Item>;



  constructor(public afs: AngularFirestore) { 
    // the single line of code below gets the  value of the properties in the document execpt for the id
    //this.items = this. afs.collection('items').valueChanges();
       
      // the single line of code below links the firebase collection to the 
      //collection property
      this.itemsCollection = this.afs.collection('items',ref => ref.orderBy('title','asc'));

        // the single line of code below gets the  value of the properties including the id 
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
         // gets the id and includes it to that document property retrived above
         data.id = a.payload.doc.id;
        return data;
    })));
   }

   getItems(){
     return this.items;
   }

     addItem(item: Item){
       this.itemsCollection.add(item);
     }    

   deleteItem(item:Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
   }

   updateItem(item: Item){
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
   }
}
