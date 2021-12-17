import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput, IonLabel, NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';// storge
import { Router } from '@angular/router';
import { exit } from 'process';

@Component({
  selector: 'app-lire',
  templateUrl: './lire.page.html',
  styleUrls: ['./lire.page.scss'],
})
export class LirePage {

  code_mag_texte: string;
  code_prod_texte: string;
  code_emp_texte: string;
  nb_texte: string;
  unique_mode: boolean = true
  qte_mode: boolean = false
  obj: any = {}
  obj_data: any = []
  obj_emp: any = {}
  obj_mag: any = {}

  qte_article: string = "0";

  public liste: any = [];
  public liste_data: any = [];
  liste1: any;
  liste3: any;
  @ViewChild('code_prod', { static: false }) code_prod: IonInput;
  @ViewChild('nb', { static: false }) nb: IonInput;
  @ViewChild('btn', { static: false }) btn: IonLabel;

  ngAfterViewInit() {
    setTimeout(() => {
      this.code_prod.setFocus();
    }, 400);
  }


  constructor(public toastCtrl: ToastController, public alertController: AlertController, public navCtrl: NavController, public http: HttpClient, private storage: Storage, private router: Router) {
    this.liste1 = JSON.parse(localStorage.getItem("liste"));
    for (let i = 0; i < this.liste1.length; i++) {
      this.liste.push(this.liste1[i])
    }
    if (this.liste_data == undefined) { this.liste_data = [] }
  }

  checked1: boolean = true;
  checked2: boolean = false;
  mode_unique(e): void {
    var isChecked = e.currentTarget.checked1;
    this.checked2 = false;
    this.unique_mode = true
    this.qte_mode = false

  }
  mode_qte(e): void {
    var isChecked = e.currentTarget.checked2;
    this.checked1 = false;
    this.unique_mode = false
    this.qte_mode = true
  }


  retour() {
    this.router.navigateByUrl('home');
  }

  async get_produit(event) {
    if (event.key + "" == "Enter") {
      this.code_prod_texte = "" + this.code_prod.value
      this.nb.setFocus()

    }
  }


  async get_nb(event) {
    this.nb_texte = "  " + this.nb.value
    this.btn.color = "success"
  }

  valider() {

    if (this.nb.value == "") {
      this.openToast_qte()
    }
    else {
        
      this.ajouter( );
      this.btn.color = "primary"

    }
  }

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Article Compté',
      duration: 3000
    });
    toast.present();
    this.code_prod.value=""
    this.nb.value=""
    this.code_prod.setFocus()

  }

  async openToast_qte() {
    const toast = await this.toastCtrl.create({
      message: 'Quantité SVP',
      duration: 3000
    });
    toast.present();
    this.nb.setFocus()

  }



  test_obj: number;
  async ajouter() {

    this.test_obj = -1
    this.chercher_prod()
   }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async chercher_prod() {
    for (var item in this.liste) {
      if ((this.liste[item].Code == this.code_prod.value) == true) {
        this.test_obj = this.liste[item].Quantite
      }
    }

    if (this.test_obj == -1) {
      this.btn.color = "primary"
      this.alertController.create({
        header: 'produit inconnu',
        buttons: [{
          text: 'ok',
          handler: (data: any) => { }
        },
        {
          text: 'Ajouter le',
          handler: (data: any) => {
            this.router.navigateByUrl('config');
          }
        }
        ]
      }).then(res => {
        res.present();
        this.code_prod.setFocus()
        this.nb.value=""
        this.code_prod.value=""
      });
    }
    else if (this.test_obj == 0) {
      this.btn.color = "primary"
      for (var item in this.liste) {
        if ((this.liste[item].Code == this.code_prod.value) == true) {

          this.liste[item].Quantite = parseInt(parseInt(this.liste[item].Quantite) + (parseInt(this.nb.value + "")) + "")
          this.openToast();
         
        }
      }
    } else {
      this.btn.color = "primary"
      let ancien = this.test_obj;
      let neveaux = this.nb.value;
      this.alertController.create({
        header: 'Article déjà compté ',
        message: "Ancienne valeur =   " + ancien,
        subHeader: "Nouveaux valeur = " + neveaux,
        buttons: [
          {
            text: 'Annuler',
            handler: (data: any) => { }
          },
          {
            text: 'Remplacer',
            handler: (data: any) => {
              for (var item in this.liste) {
                if ((this.liste[item].Code == this.code_prod.value) == true) {
                  console.log(this.liste[item].Quantite + " re " + (parseInt(this.nb.value + "")))
                  this.liste[item].Quantite = (parseInt(this.nb.value + ""));
                  this.liste[item].modifier = "oui";
                }
              }
            }
          },
          {
            text: 'Mise à jour',
            handler: (data: any) => {
              for (var item in this.liste) {
                if ((this.liste[item].Code == this.code_prod.value) == true) {
                  this.liste[item].Quantite = parseInt(parseInt(this.liste[item].Quantite) + (parseInt(this.nb.value + "")) + "");
                  this.liste[item].modifier = "oui";

                }
              }
            }
          }
        ]
      }).then(res => {
        res.present();
        this.code_prod.setFocus()
        this.nb.value=""
        this.code_prod.value=""

      });

    }
    localStorage.setItem('liste', JSON.stringify(this.liste));
    this.btn.color = "primary"
    

  }

  vider_produit() {
    //  this.code_prod.value = "" ; 
    // this.code_prod.setFocus();
    // this.code_prod_texte="";
  }

  vider_nb() {
    //this.nb_texte =  "";
    //this.nb.value = "" ;
  }

}

