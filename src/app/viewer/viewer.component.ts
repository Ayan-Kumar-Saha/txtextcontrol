import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebService } from '../service/web.service';

declare var TXDocumentViewer: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  public basePath = `https://backend.textcontrol.com?access-token=${environment.accessToken}`
  private dataloading = false;

  constructor(
    private _web: WebService
  ) { }

  ngOnInit(): void {

    this.getData();
  }

  getData() {
    this._web.getData(
      {
        userName: 'Ayan Saha_C'
      }
    ).subscribe(res => {

      this.dataloading = true;

      window.addEventListener("documentViewerLoaded", () => {
        
        if (res['data'] && this.dataloading == true) {
          TXDocumentViewer.loadDocument(btoa(res['data'].content), 'document.pdf');
        }

        this.dataloading = false;

      });
    });
  }



}
