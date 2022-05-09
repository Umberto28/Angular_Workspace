import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  user!: string;

  constructor(public router: Router, public tservice: TutorialService, public http: HttpClient) {
    this.tservice.userChanged$.subscribe( user => {
      console.log(user);
      this.user = user;
    })
   }

  ngOnInit(): void {
  }

  change(input: HTMLInputElement) { 
    this.tservice.changeUser(input.value);
  }

  login(user: string, pass: string) {
    this.http.post("https://tutorial.craftuniversity.it/session.php", {
      request: 'login',
      username: user,
      password: pass
    }).subscribe((res: any) => {
      if(res[0] == "KO") {
        alert(res[1]);
      }
      else {
        localStorage.setItem("name", res[1]);
        this.router.navigate(['/page/Nothing00']);
      }
    })
  }

}
