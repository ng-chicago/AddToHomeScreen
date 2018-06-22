import { Component } from '@angular/core';
import { A2hsService } from '../a2hs.service';

@Component({
  selector: 'app-a2hs',
  templateUrl: './a2hs.component.html',
  styleUrls: ['./a2hs.component.css']
})
export class A2hsComponent {

  constructor(public a2hs: A2hsService) { }

}
