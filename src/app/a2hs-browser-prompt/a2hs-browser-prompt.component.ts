import { Component } from '@angular/core';
import { A2hsService } from '../a2hs.service';

@Component({
  selector: 'app-a2hs-browser-prompt',
  templateUrl: './a2hs-browser-prompt.component.html',
  styleUrls: ['./a2hs-browser-prompt.component.css']
})
export class A2hsBrowserPromptComponent {

  constructor(public a2hs: A2hsService) { }

}
