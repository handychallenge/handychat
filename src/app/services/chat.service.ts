import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];
  public user: any = {}; 

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { 
    
    //suscribe to observable afauth
    this.afAuth.authState.subscribe(
      user =>{
        console.log('Estado del usuario ', user);
        if (!user){
          return;
        }
        this.user.name = user.displayName;
        this.user.uid = user.uid;

      })

  }

  //Google and Github Auth
  login(provider: string) {

    if (provider === 'google'){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    else{
      this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
    }
    
  }

  logout() {
    this.user = {};
    this.afAuth.auth.signOut();
  }

  loadMessages(){

    this.itemsCollection = this.afs.collection<Message>(
      'chats', ref => ref.orderBy('date','desc').limit(5)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((messages: Message[]) => {
          console.log(messages);

          //used javascript to order chats
          this.chats = [];
          for (let message of messages){
            this.chats.unshift(message);
          }
          return this.chats;
      })
    )
  }

  //add to firebase
  addMessage(text: string){

    let message: Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    }

    return this.itemsCollection.add(message);

  }
}
