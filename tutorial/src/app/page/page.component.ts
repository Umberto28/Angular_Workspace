import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  title!: string | null;
  user!: string | null;
  name!: string | null;

  constructor(public route: ActivatedRoute, public http: HttpClient, public router: Router) {
    /* this.title = this.route.snapshot.paramMap.get('id'); */

    //aggiornare attributi per componenti "figli" di altri
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.title = params.get('id');
      this.user = params.get('user');
    });

    // da mettere nel costruttore di ogni pagina che vogliamo rendere privata, per evitare di subire attacchi sui dati
    this.http.post("https://tutorial.craftuniversity.it/session.php", {
      request: "check"
    }).subscribe((res: any) => {
      if(res[0] == "KO") {
        localStorage.removeItem("name");
        this.router.navigate(['/blog']);
      }
      else {
        this.name = localStorage.getItem("name");
      }
    })
  }

  ngOnInit(): void {
  }

}
