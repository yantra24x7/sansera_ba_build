import { Component, OnInit } from '@angular/core';
import { NavbarService} from '../../Nav/navbar.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  url:any;
  constructor(private nav:NavbarService) { 
    this.nav.show();

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
    // this.url = event.target.result;
    //  console.log(this.url)
    }
    }
    }
  ngOnInit() {
  }

}
