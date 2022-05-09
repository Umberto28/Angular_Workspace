import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @Input()
  user!: string;

  show: boolean = false;
  today: Date;
  money: number;
  color: string = "black";
  size: string = "none";

  selectField: FormControl = new FormControl();

  form: FormGroup;

  @ViewChild('about', { static: false })
  aboutElement!: ElementRef;

  constructor(private title: Title, private meta: Meta, public fb: FormBuilder) {
    this.today = new Date();

    let money1 = 23;
    let money2 = 34;
    this.money = this.sum(money1, money2);

    console.log("costruttore!");

    this.form = fb.group({
      'user' : ['',Validators.required],
      'email' : ['',Validators.required],
      'date' : ['']
    });

    this.title.setTitle("Tutorial Page");
    this.meta.updateTag({ name: 'description', content: "questa è una homepage" });
    this.meta.updateTag({ name: 'keywords', content: "tutorial, homepage, sito di angular metadata" });
  }

  sum(num1: number, num2: number): number{
    return num1 + num2;
  }

  showHidden(): void{
    this.show = !this.show;
  }

  hello(){
    if(this.selectField.value == "1"){
      this.color = "red";
      this.size = "big";
    }
    else if(this.selectField.value == "2"){
      this.color = "green";
      this.size = "small";
    }
    else{
      this.color = "blue";
      this.size = "none";
    }
  }

  printElement(): void{
    console.log(this.aboutElement.nativeElement);
  }

  checkUser(): void{
    let user = this.form.controls['user'].value;
    if(!(user.length >= 8)){
      this.form.controls['user'].setErrors({ incorrect : true });
    }
    else{
      this.form.controls['user'].setErrors(null);
    }
  }

  send(): void{
    if(!this.form.valid){
      alert("Compilare tutti i campi obbligatori");
      return;
    }
    console.log(
      this.form.controls['user'].value,
      this.form.controls['email'].value,
      this.form.controls['date'].value)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    
  }

}
