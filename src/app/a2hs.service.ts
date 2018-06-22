import { Injectable } from '@angular/core';
// import { GoogleAES } from './data/google-analytics-events.service';

@Injectable({
  providedIn: 'root'
})
export class A2hsService {

  promptIntercepted = false;
  standalone = false;
  deferredPrompt;
  userInstalled = false;

  // For testing debug display only
  promptSaved = false;
  customButtonClicked = false;
  deferredPromptShown = false;
  deferredPromptRejected = false;

  // constructor (public gas: GoogleAES) { }  // if using Google Analytics
  constructor () {}

  trackStandalone () {
    // called once from app.component
    if ( this.isStandalone() ) {
      this.standalone = true;
      // this.gas.emitEvent('A2HS', 'Standalone', '' , 0);
    }
  }

  isStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

  trackInstalled () {
    // called from listener in app.component
    // this.gas.emitEvent('A2HS', 'Installed', '' , 0);
    this.userInstalled = true;
  }

  addToHomeScreen () {
    // call on custom button click
    this.customButtonClicked = true;

    if (!this.deferredPrompt) {
      console.log('deferredPrompt null');
      return;
    }

    // Show the prompt
    this.deferredPrompt.prompt();
    this.deferredPromptShown = true;

    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {

        if (choiceResult.outcome === 'accepted') {
            // no matter the outcome, the prompt cannot be reused ON MOBILE
            // for 3 months or until browser cache is cleared?
        } else {
            this.deferredPromptRejected = true;
        }

      });
  }

  showHide(checkWhat: boolean) {
    if (checkWhat) {
      return 'block';
    } else {
      return 'none';
    }
  }

  showHideButton() {
    if (this.promptSaved && !this.userInstalled) {
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
