import { Component, ViewChild, ɵConsole } from '@angular/core';
import { AlertController, AngularDelegate, IonInput, Platform } from '@ionic/angular';
 import { Storage } from '@ionic/storage';// storge
import { environment } from 'src/environments/environment';
 import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
import { Papa } from 'ngx-papaparse';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.page.html',
  styleUrls: ['./exporter.page.scss'],
})
export class ExporterPage   {

  letterObj = {
    to: '',
    from: '',
    text: ''
   }
   pdfObj = null;
  liste:any;
  liste2:any;
 
  csvData: any[] = [];
  headerRow: any[] = [];
     
  constructor( private  router:  Router , public alertController: AlertController, private storage: Storage , private papa: Papa, private plt :Platform , private file:File , private fileOpener:FileOpener ,   private socialSharing: SocialSharing   , public http   : HttpClient) {
    var test2 = localStorage.getItem("liste");
    this.liste = JSON.parse(test2);   
    this.plt.ready().then(() => {
   });
   }

   retour ()
  {
    this.router.navigateByUrl('home');
  }

  
  createPdf() {

    var test2 = localStorage.getItem("liste");
    this.liste = JSON.parse(test2);           
    const tableRows = [];
    const t = [];
    t.push('Code à barres' )
    t.push('Code Article' )
    t.push('Quantité' )
    tableRows.push(t);
     for (var item in this.liste) {
         const t = [];
         t.push(this.liste[item].Code )
         t.push(this.liste[item].Description)
         t.push(this.liste[item].Quantite )       
         tableRows.push(t);
     }
     
     var docDefinition = {
       content: [
         { text: ' ', style: 'header' },
         { text: new Date().toTimeString(), alignment: 'right' },
         { text: ' ', style: 'header' },
         { text: 'INFONET SERVICES', style: 'header' },
         { text: ' ', style: 'header' },
         {
           layout: 'lightHorizontalLines', // optional
           table: {
             // headers are automatically repeated if the table spans over multiple pages
             // you can declare how many rows should be treated as headers
             headerRows: 1,
             widths: [  '*', 200, '*' ],
     
             body: tableRows 
           }
         }
       ],
       styles: {
         header: {
           fontSize: 18,
           bold: true,
         },
         subheader: {
           fontSize: 14,
           bold: true,
           margin: [0, 15, 0, 0]
         },
         story: {
           italic: true,
           alignment: 'center',
           width: '50%',
         }
       }
     }
     this.pdfObj = pdfMake.createPdf(docDefinition);
     if (this.plt.is('cordova')) {
       this.pdfObj.getBuffer((buffer) => {
         var blob = new Blob([buffer], { type: 'application/pdf' });
  
         // Save the PDF to the data Directory of our App
         this.file.writeFile(this.file.dataDirectory, 'infonet.pdf', blob, { replace: true }).then(fileEntry => {
           // Open the PDf with the correct OS tools
           this.fileOpener.open(this.file.dataDirectory +  'infonet.pdf', 'application/pdf');
         })
       });
     } else {
       // On a browser simply use download!
       this.pdfObj.download();
     }
   }




   exportCSV() {
   
    this.headerRow.push('Code à barres' )
    this.headerRow.push('Code Article' )
    this.headerRow.push('Quantite' )
    this.headerRow.push('Modifier' )

    for (var item in this.liste) {
     const t = [];
     t.push(this.liste[item].Code )
     t.push(this.liste[item].Description)
     t.push(this.liste[item].Quantite )       
     t.push(this.liste[item].modifier )       
     this.csvData.push(t);
     }
    
   let csv = this.papa.unparse({
     fields: this.headerRow,
     data: this.csvData
   });
 
   if (this.plt.is('cordova')) {
     this.file.writeFile(this.file.dataDirectory, 'infonet .csv', csv, {replace: true}).then( res => {
       this.socialSharing.share(null, null, res.nativeURL, null)
       .then( e =>{
         // Success
       }).catch(e =>{
         console.log('Share failed:', e)
       });
     }, err => {
       console.log('Error: ', err);
     });
 
   } else {
     // Dummy implementation for Desktop download purpose
     var blob = new Blob([csv]);
     var a = window.document.createElement('a');
     a.href = window.URL.createObjectURL(blob);
     a.download = 'infonet.csv';
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
   }
 }
   

}
