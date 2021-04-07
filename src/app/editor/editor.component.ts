import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { WebService } from '../service/web.service';

declare var TXTextControl: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  public webSocketUrl = `wss://backend.textcontrol.com?access-token=${environment.accessToken}`

  constructor(
    private _web: WebService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:txDocumentEditorLoaded', ['$event'])
  onTxDocumentEditorLoaded() {
    TXTextControl.addEventListener("textControlLoaded", () => {
      this._web.getData(
        {
          userName: 'Ayan Saha_C'
        }
      ).subscribe((res:any) => {
        if (res['data']) {
          TXTextControl.loadDocument(TXTextControl.streamType.HTMLFormat, btoa(res['data'].content));
        }
      })
  
    });
  }

  exportToPDF() {
    TXTextControl.saveDocument(TXTextControl.StreamType.AdobePDF, e => {

      var element = document.createElement('a');
      element.setAttribute('href', 'data:application/octet-stream;base64,' + e.data);
      element.setAttribute('download', "document.pdf");

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    });
  }

  saveDocument() {
    TXTextControl.saveDocument(
      TXTextControl.StreamType.HTMLFormat,
      e => {
        this._web.saveData(
          {
            userName: 'Ayan Saha_C',
            content: e.data
          }
        ).subscribe(res => {
          this._snackbar.open('Document saved successfully! 🥳', 'OK', {duration: 2000})
        })
      }
    )
     
  }

}
