import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TutorialService } from './tutorial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tutorial';
  username: string = "Nothing00";

  constructor(public tservice: TutorialService, public router: Router) {

    // per tornare all'inizio pagina quando ricarichiamo un componente
    this.router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
        window.scrollTo(0,0);
      }
    }) 

    this.tservice.userChanged$.subscribe( user => {
      this.username = user;
      console.log(user);
    })
    setTimeout(() => {
      this.tservice.changeUser(this.username);
    })
  }
}
