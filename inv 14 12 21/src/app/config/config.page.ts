import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';// storge
@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  liste:any;
  liste2:any;
  constructor(public alertController: AlertController, private storage: Storage ,private  router:  Router ) {
    var test2 = localStorage.getItem("liste");
    this.liste = JSON.parse(test2);
   }

  ngOnInit() {
  }

  retour ()
  {
    this.router.navigateByUrl('home');
  }

  importer ()
  {
    this.router.navigateByUrl('importer');
  }

  AjouterCode() {
    this.alertController.create({
      header: 'Ajouter un Article', 
       inputs: [
        {
          name: 'Code',
          placeholder: 'Code à barre',
          
        },
        {
          name: 'Description',
          placeholder: 'Code Article',
          
        },
      ]
      ,
      buttons: [
        {
          text: 'Annuler',
          handler: (data: any) => {
            
          }
        },
        {
          text: 'Ajouter!',
          handler: (data: any) => {
             this.liste.push({    Code  : data.Code, Description   :data.Description ,   Quantite    : 0   }); 
           localStorage.setItem('liste',JSON.stringify(this.liste));
           console.log(this.liste)
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  
  SupprimerCode()
  { 
        this.alertController.create({
          header: 'Supprimer un Article',         
          message: "Saisie le code à barre SVP ",
          inputs: [
            {
              name: 'Code',
              
            } 
          ]
          ,
          buttons: [
            {
              text: 'Annuler',
              handler: (data: any) => {
                
              }
            },
            {
              text: 'Supprimer',
              handler: (data: any) => {
                console.log('info', data.Code);
                var test2 = localStorage.getItem("liste");
                this.liste = JSON.parse(test2);
                this.liste2 = [];
                 for (var item in this.liste) { 
                   if(this.liste[item].Code === data.Code){ 
                   } 
                   else{
                    console.log('info', data.Code);
                    this.liste2.push({  Code  : this.liste[item].Code, Description   :this.liste[item].Description ,   Quantite    : this.liste[item].Quantite  }); 
                   }         
                   }    
                  
                localStorage.setItem('liste',JSON.stringify(this.liste2));
             
              }
            }
          ]
        }).then(res => {
          res.present();
        });
  }

  ModifierCode ()
  {
    this.alertController.create({
      header: 'Modifier un Article',
     
       inputs: [
        {
          name: 'Code',    
          placeholder: 'Code à barre',

        } ,
        {
          name: 'quantite',
          placeholder: 'Quantité',
    
          
        } ,
        
      ]
      ,
      
      buttons: [
        {
          text: 'Annuler',
          handler: (data: any) => { }
        },
        {
          text: 'Modifier',
          handler: (data: any) => {
            console.log('info', data.Code);
            var test2 = localStorage.getItem("liste");
            this.liste = JSON.parse(test2);
            this.liste2 = [];
             for (var item in this.liste) { 
               if(this.liste[item].Code === data.Code){ 
                this.liste2.push({  Code  : this.liste[item].Code, Description   :this.liste[item].Description ,   Quantite    : data.quantite    }); 
               } 
               else{
                 this.liste2.push({  Code  : this.liste[item].Code, Description   :this.liste[item].Description ,   Quantite    : this.liste[item].Quantite   })
               }         
               }  
            localStorage.setItem('liste',JSON.stringify(this.liste2));
         
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

}
