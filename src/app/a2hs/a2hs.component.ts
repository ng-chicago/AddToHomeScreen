import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-a2hs',
  templateUrl: './a2hs.component.html',
  styleUrls: ['./a2hs.component.css']
})
export class A2hsComponent  implements OnInit  {

  constructor() { }

  buttonShown: boolean;
  showLoadedAsStandalone: boolean;
  promptIntercepted = false;
  customButtonClicked = false;
  deferredPrompt;
  promptSaved = false;
  deferredPromptShown = false
  UserInstalled = false;
  dataObjects =  [
    {objName: 'deferred', localName: 'promptDeferred'},
  ];

  ngOnInit() {
    // this.promptDeferred();
  }

  //
  // promptDeferred () {
  //   const sValue = localStorage[this.getName('deferred')] || '';
  //   if (sValue === '') {
  //     // console.log('Initializing qna_SeenCount');
  //     this.promptIntercepted = false;
  //     this.showButton = false;
  //   } else {
  //     // console.log('Using Saved Value qna_SeenCount');
  //     this.promptIntercepted = sValue;
  //   }
  // }

  ngAfterContentInit() {

    window.addEventListener('beforeinstallprompt', (e) => {

      // show the add button
      this.promptIntercepted = true;
      this.buttonShown = true;

      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();

      // Stash the event so it can be displayed when the user wants.
      this.deferredPrompt = e;
      this.promptSaved = true;

    });

    window.addEventListener('appinstalled', (evt) => {
      this.UserInstalled = true;
      this.buttonShown = false;
    });

    this.showLoadedAsStandalone = this.isRunningStandalone();
  }

  getName(whichObj: string ): string {
    return this.dataObjects.find(myObj => myObj.objName === whichObj).localName;
  }

  isRunningStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }


  addToHomeScreen () {
    this.customButtonClicked = true;

    // Show the prompt
    this.deferredPrompt.prompt();
    this.deferredPromptShown = true;

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {

        // if (choiceResult.outcome === 'accepted') {
        //   this.UserInstalled = true;
        // } else {
        //   this.UserInstalled = false;
        // }

        // hide the button no matter choice
        // chrome makes the saved prompt no longer valid
        this.buttonShown = false;
      });

  }

  getStyle(checkWhat: boolean) {
    if (checkWhat) {
      return 'block';
    } else {
      return 'none';
    }
  }

  trueOrFalse(checkWhat: boolean) {
    if (checkWhat) {
      return 'green';
    } else {
      return 'red';
    }
  }

}
