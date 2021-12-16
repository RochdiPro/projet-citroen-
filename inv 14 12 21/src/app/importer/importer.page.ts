import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as papa from 'papaparse';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.page.html',
  styleUrls: ['./importer.page.scss'],
})
export class ImporterPage {
  liste: any;
  liste2: any;

  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(public http: HttpClient, private router: Router , public loadingController: LoadingController) {

  }

  retour() {
    this.router.navigateByUrl('config');
  }

  public uploadFile(files: FileList): void {
    this.customLoader()
    let results = [];
    if (files && files.length > 0) {

      const reader: FileReader = new FileReader();
      reader.readAsText(files.item(0));
      reader.onload = (e) => {
        const fileContent: string = reader.result as string;

        let parsedData = papa.parse(fileContent).data;
        this.headerRow = parsedData[0];
        parsedData.splice(0, 1);
        this.csvData = parsedData;
        this.extractData(parsedData).then((data) => {
          this.liste = data;
          localStorage.setItem('liste', JSON.stringify(this.liste));
        });
        const lines: string[] = fileContent.split('\n');
      };



    }
  }

  extractData(parsedData) {
    return new Promise(resolve => {
      var k,
        arr = [];
      
      for (k in parsedData) {        
        if(parsedData[k].length == 1)
        {
          let t = parsedData[k][0]
          item = t.split(";")
        }
        else{
        var item = parsedData[k];
        }
        if (item.length > 1) {
          arr.push({
            Code: item[1],
            Description: item[0],
            Quantite: "0", 
            modifier: "non",             
          });
        }
      }
      resolve(arr);

    });
  }
 


  private handleError(err) {
    console.log('problème  ', err);
  }
  
  customLoader() {
    this.loadingController.create({
      message: 'Importation de la liste des articles',
      duration: 7000,
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((res) => {
      res.present();
    });
  }


}
