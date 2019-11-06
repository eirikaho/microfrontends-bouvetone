import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'custom-testcomp-angular',
  template: `
    <div id="angulartest">
      <h2>En Angular-basert Web Component</h2>
      <a href="https://www.techiediaries.com/angular-elements-web-components/">Fin guide for å lage Web Components med
        Angular</a>
      <p>Intern teller = <b>{{counter}}</b></p>
      <p>Ekstern teller = <b>{{eksternCounter}}</b></p>
      <button (click)="handleClick()">Intern +1</button>
      <button (click)="dispatch()">Ekstern +1</button>
    </div>
  `,
  styles: [
      `#angulartest {
      border-style: solid;
      border-color: #b52e30;
    }`
  ],
  host: {
    '(window:react:clicked)': 'handleChange()',
    '(window:vue:clicked)': 'handleChange()',
    '(window:js:clicked)': 'handleChange()'
  },
  encapsulation: ViewEncapsulation.Native
})
export class TestcompAngularComponent implements OnInit {
  counter = 0;
  eksternCounter = 0;

  constructor() {
  }

  handleClick() {
    this.counter += 1;
  }

  handleChange() {
    this.eksternCounter += 1;
  }

  dispatch() {
    console.log('Angular-komponent: Event dispatched: angular:clicked');
    window.dispatchEvent(new CustomEvent('angular:clicked', {
      bubbles: true,
    }));
  }

  ngOnInit() {
  }

}
