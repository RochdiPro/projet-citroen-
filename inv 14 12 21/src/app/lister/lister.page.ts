import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';// storge


@Component({
  selector: 'app-lister',
  templateUrl: './lister.page.html',
  styleUrls: ['./lister.page.scss'],
})
export class ListerPage   {
  liste:any=[];
  liste2:any=[];
  liste3:any=[];
  liste4:any=[];
  liste5:any=[];

  constructor(public alertController: AlertController , private storage: Storage ,private  router:  Router ) {   
     this.liste = JSON.parse(localStorage.getItem("liste")); 
     for(let i = 0 ; i< this.liste.length; i++)
     {
       if(i<990)
       {
        this.liste2.push(this.liste[i]);
       }
       else if (i< 1980)
       {
        this.liste3.push(this.liste[i]);
       }
       else if (i< 2800)
       {
        this.liste4.push(this.liste[i]);
       }
       else if (i< 3700)
       {
        this.liste5.push(this.liste[i]);
       }
     }  
  }

 

  retour ()
  {
    this.router.navigateByUrl('home');
  }
}