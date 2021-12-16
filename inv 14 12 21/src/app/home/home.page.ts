import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  crack_var: any;
  test : boolean = false ;
  constructor(private  router:  Router , public AlertController: AlertController , private toastCtrl: ToastController) {

    this.crack_var = localStorage.getItem("crack-infonet");
    if(!(this.crack_var)){this.test = true}
  }

  lecture ()
  {
    this.router.navigateByUrl('lire');
  }
  lister ()
  {
    this.router.navigateByUrl('lister');    
  }

  config ()
  {
    this.router.navigateByUrl('config');
  }

  exporter ()
  {
    this.router.navigateByUrl('exporter');
  }

  retour ()
  {
    this.router.navigateByUrl('login');
  }


  crack()
  { localStorage.setItem('crack-infonet',"oui");}

  async reset()
  {
    this.AlertController.create({
      header: 'Vous êtes sûre', 
      message :"Code",
        
       inputs: [       
        { name: 'Code', placeholder: '' } 
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: (data: any) => { }
        },
        {
          text: 'oui',
          handler: (data: any) => {
            
            if(data.Code=="0000"){
            let l = []
            localStorage.setItem('liste',JSON.stringify(l));         
            location.reload()
            }
            else{
              this.error_code();
                 
            }
           }
        }
      ]
    }).then(res => {
      res.present();
    });

   
  }
 
  
  async error_code() {
    const alert = await this.AlertController.create({
      message: "le code est incorrect",
      buttons: ['ok']
    });
    await alert.present();
}
   
}
