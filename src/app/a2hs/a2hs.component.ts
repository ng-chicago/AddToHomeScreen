import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-a2hs',
  templateUrl: './a2hs.component.html',
  styleUrls: ['./a2hs.component.css']
})
export class A2hsComponent  implements OnInit  {

  constructor() { }

  showButton: boolean;
  showLoadedAsStandalone: boolean;
  promptIntercepted: boolean;
  buttonClicked = false;
  deferredPrompt;
  promptSaved = false;
  deferredPromptShown = false
  UserAcceptedA2HS = false;
  dataObjects =  [
    {objName: 'deferred', localName: 'promptDeferred'},
  ];

  ngOnInit() {
    this.promptDeferred();

  }

  promptDeferred () {
    const sValue = localStorage[this.getName('deferred')] || '';
    if (sValue === '') {
      // console.log('Initializing qna_SeenCount');
      this.promptIntercepted = false;
      this.showButton = false;
    } else {
      // console.log('Using Saved Value qna_SeenCount');
      this.promptIntercepted = sValue;
    }
  }

  getName(whichObj: string ): string {
    return this.dataObjects.find(myObj => myObj.objName === whichObj).localName;
  }

  isRunningStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

  getStyle(checkWhat: boolean) {
    if (checkWhat) {
      return 'block';
    } else {
      return 'none';
    }
  }

  ngAfterContentInit() {

    window.addEventListener('beforeinstallprompt', (e) => {

      // make the button show
      this.promptIntercepted = true;
      this.showButton = true;

      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();

      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      this.promptSaved = true;

    });

    this.showLoadedAsStandalone = this.isRunningStandalone();


  }

  addToHomeScreen () {
    this.buttonClicked = true;

    // Show the prompt
    this.deferredPrompt.prompt();
    this.deferredPromptShown = true;

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        this.deferredPromptShown = true;
        if (choiceResult.outcome === 'accepted') {
          this.UserAcceptedA2HS = true;
        } else {
          this.UserAcceptedA2HS = false;
        }
        // hide the button no matter choice
        // chrome makes the saved prompt no longer valid
        this.showButton = false;

      });


  }

}
