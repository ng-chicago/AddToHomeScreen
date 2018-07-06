import { Injectable } from '@angular/core';
// import { GoogleAES } from './data/google-analytics-events.service';

@Injectable({
  providedIn: 'root'
})
export class A2hsService {

  promptIntercepted = false;
  isStandalone = false;
  deferredPrompt;
  userInstalled = false;
  whereIsShare = 'bottom';

  // user agent
  isChrome = false;
  isExplorer = false;
  isExplorer_11 = false;
  isFirefox = false;
  isSafari = false;
  isOpera = false;
  isEdgeDesktop = false;
  isEdgeiOS = false;
  isEdgeAndroid = false;
  userAgent = '';

  isIOS = false;
  isMobile = false;

  // For testing debug display only
  promptSaved = false;
  customButtonClicked = false;
  deferredPromptShown = false;
  deferredPromptRejected = false;

  // Detects if device is in standalone mode
  // isInStandaloneMode = () => ('standalone' in window.navigator);

  // constructor (public gas: GoogleAES) { }  // if using Google Analytics
  constructor () {}

  checkUserAgent() {
    this.userAgent = navigator.userAgent.toLowerCase();
    const uaString = this.userAgent;

    this.isChrome = /chrome/.test(uaString);
    this.isExplorer = /msie/.test(uaString);
    this.isExplorer_11 = /rv:11/.test(uaString);
    this.isFirefox  = /firefox/.test(uaString);
    this.isSafari = /safari/.test(uaString);
    this.isOpera = /opr/.test(uaString);
    this.isEdgeDesktop = /edge/.test(uaString);
    this.isEdgeiOS = /edgios/.test(uaString);
    this.isEdgeAndroid = /edga/.test(uaString);

    this.isIOS = /ipad|iphone|ipod/.test(uaString);
    this.isMobile = /mobile/.test(uaString);
    if ((this.isChrome) && (this.isSafari)) { this.isSafari = false; }
    if ((this.isChrome) && (  (this.isEdgeDesktop) ||
                              (this.isEdgeiOS) ||
                              (this.isEdgeAndroid) )  ) { this.isChrome = false; }
    if ((this.isSafari) && (  (this.isEdgeDesktop) ||
                              (this.isEdgeiOS) ||
                              (this.isEdgeAndroid) )  ) { this.isSafari = false; }
    if ((this.isChrome) && (this.isOpera)) { this.isChrome = false; }

    if (/ipad/.test(uaString)) {
      this.whereIsShare = 'top';
    }

  }
  // showUserAgent() {
  //   this.userAgent = navigator.userAgent.toLowerCase();
  // }

  trackStandalone () {
    // called once from app.component
    if ( this.checkStandalone() ) {
      this.isStandalone = true;
      // this.gas.emitEvent('A2HS', 'Standalone', '' , 0);
    }
  }

  checkStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }

  trackInstalled () {
    // called from listener in app.component
    // this.gas.emitEvent('A2HS', 'Installed', '' , 0);
    console.log('setting this.userInstalled true');
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

  browserPromptBtn() {
    if (this.promptIntercepted && !this.userInstalled ) {
      return 'block';
    } else {
      return 'none';
    }
  }

  iOSSafariHow2() {
    if (this.isSafari && this.isIOS && !this.isStandalone ) {
      return 'block';
    } else {
      return 'none';
    }
  }


  showHideButton_iOS() {
    if (this.isIOS && !this.userInstalled) {
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
