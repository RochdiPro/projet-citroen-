import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  crack: any;
  constructor(public alertController: AlertController, private router: Router) {

    this.crack = localStorage.getItem("crack-infonet");

  }

  @ViewChild('inputpwd', { static: false }) inputpwd: IonInput;

  ngOnInit() {
  }

  cnx() {
    console.log(this.crack)
    if(this.inputpwd.value=="infonet-2021-crack-&-1-2-3-5-rochdi-1-2-3-4-5-6")
    {
      this.router.navigateByUrl('home');
    }
    if (this.inputpwd.value === "0000" && this.crack) {
      this.router.navigateByUrl('home');
    }
    else { 
      this.alertController.create({
        header: "Probleme d'authentification ", 
        message: " Mot de passe incorrect "
        ,
        buttons: [
          {
            text: 'ok',
            handler: (data: any) => {

            }
          }
        ]
      }).then(res => {
        res.present();
      });
    }
  }

}
