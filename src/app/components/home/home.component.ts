/* 
 * Copyright 2019 Ignacio Loyola @nodonade.com
 * Version 0.1 (Working first step blog)
 */

import { UserService } from './../../services/user.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public posts; //TODO specify that it is an array
  public identity;
  public token;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Inicio';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
   }

  ngOnInit() {
  
  }

}
