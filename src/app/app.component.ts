import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService]
})
export class AppComponent implements OnInit{
  title = 'dataModel';
  dataModel = 'decisionTree';
  graphSrc = "http://localhost:9000/modelCM?model=decisionTree";
  modelAccuracy: any = {};
  data: any = [
    {
      numberOfLines: 0,
      status: "debug",
      text: []
    },
    {
      numberOfLines: 0,
      status: "error",
      text: []
    },
    {
      numberOfLines: 0,
      status: "info",
      text: []
    },
    {
      numberOfLines: 0,
      status: "warn",
      text: []
    }
  ];
  misclassified: any = [];
  loading: boolean = false;

  constructor(public service: AppService) {}

  ngOnInit(): void {
    this.runModel();
  }

  runModel() {
    this.loading = true;
    this.graphSrc = `http://localhost:9000/modelCM?model=${this.dataModel}`;
    this.service.getResults(this.dataModel).subscribe((resp: any) => {
      this.data = [
        {
          numberOfLines: 0,
          status: "debug",
          text: []
        },
        {
          numberOfLines: 0,
          status: "error",
          text: []
        },
        {
          numberOfLines: 0,
          status: "info",
          text: []
        },
        {
          numberOfLines: 0,
          status: "warn",
          text: []
        }
      ];
      Object.keys(resp).forEach(criticality => {
        switch(criticality) {
          case 'debug':
            this.data[0].numberOfLines = resp.debug.length;
            this.data[0].text = resp.debug;
            break;
          case 'info':
            this.data[2].numberOfLines = resp.info.length;
            this.data[2].text = resp.info;
            break;
          case 'error':
            this.data[1].numberOfLines = resp.error.length;
            this.data[1].text = resp.error;
            break;
          case 'warn':
            this.data[3].numberOfLines = resp.warn.length;
            this.data[3].text = resp.warn;
            break;
          case 'misclassified':
            if(resp.misclassified.length > 0) {
              this.misclassified = resp.misclassified;
            } else {
              this.misclassified = [];
            }
            // this.data[4].numberOfLines = resp.misclassified.length;
            // this.data[4].text = resp.misclassified;
            break;
        }
      });
      this.loading = false;
    });
    this.service.getAccuracy(this.dataModel).subscribe((resp) => {
      this.modelAccuracy = resp;
    });
  }
}
