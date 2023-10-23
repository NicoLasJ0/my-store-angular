import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {
  img: string = "";
  @Input('img') 
  set changeImg(newImage: string){
    this.img= newImage;
  }
  @Output() loaded = new EventEmitter<string>();
  counter: number = 0;
  counterFn: number | undefined;
  imgDefault: string = "https://pixabay.com/get/ga3220a7b82cf02a6cb98a41618e4c94f92354c7b760bf361f88235a81d958a64f23dde8af1253dcc32b5318cff988a61cd323fc07aaadf10c792f143cca06bbf_640.jpg";
  ngOnInit() {
    
  }
  imgError() {
    this.img = this.imgDefault;
  }
  
  ngOnDestroy() {
    window.clearInterval(this.counterFn);
  }
  
}
