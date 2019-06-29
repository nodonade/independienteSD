/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { Player } from './../models/player';

import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(   
    private _afs: AngularFirestore
    ) { }

    /*
   * For creating a post we generate an id and then asign
   * this id to the post.id
   */
  createPlayer(player: Player){
    let id = this._afs.createId();
    player.uid = id;

    return this._afs.doc(`players/${id}`).set(player);
  }

  readPlayers() {
    return this._afs.collection('players').valueChanges();
  }

  readPlayer(id) {
    return this._afs.collection('players').doc(id).valueChanges();
  }

  updatePlayer(player) {
    return this._afs.doc('players/' + player.uid).update(player);
  }

  deletePlayer(id){
    return this._afs.doc('players/' + id).delete();
  } 
}
