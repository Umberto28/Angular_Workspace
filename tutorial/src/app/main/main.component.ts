import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  users: User[] = new Array();
  toUpload: any = new Array();
  progress: number = 0;
  error!: string | null;

  constructor(public tservice: TutorialService, public http: HttpClient ) { }

  ngOnInit(): void {
    this.tservice.downloadUsers().subscribe( res => {
      this.users = res;
    })
  }

  onDrag(event: any[]){
    if(event.length > 1){
      this.error = "*Non è possibile caricare più file.";
    }
    else{
      let fileName = event[0].name;
      let split = fileName.split(".");
      let ext = split[split.length - 1].toLowerCase();
      if(ext != "pdf") {
        this.error = "*Il file non è un pdf";
      }
      else{
        if(event[0].size > 28000000){
          this.error = "*Il file è troppo grande";
        }
        else{
          this.toUpload.push(event[0]);
          this.error = null;
        }
      }
    }
  }

  send(): void {
    this.progress = 0;
    let formData = new FormData();
    formData.append('file', this.toUpload[0], this.toUpload[0].name);
    formData.append('request', "UPLOAD");
    this.error = null;
    this.http.post('https://tutorial.craftuniversity.it/upload.php', formData, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(events => {
      if(events.type == HttpEventType.UploadProgress && events.total != undefined) {
        this.progress = Math.round(events.loaded / events.total * 100);
      }
      else if(events.type == HttpEventType.Response){
        let res: any;
        res = events.body;
        if(res[0] == "OK") {
          this.toUpload = new Array();
          this.error = "File caricato con successo!";
        }
        else {
          this.error = res[1];
        }
      }
    });
  }
}
