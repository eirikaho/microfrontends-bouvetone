import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';

import {TestcompAngularComponent} from './testcomp-angular/testcomp-angular.component';

@NgModule({
  declarations: [
    TestcompAngularComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [TestcompAngularComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(TestcompAngularComponent, {injector: this.injector});
    customElements.define('test-comp-angular', el);
  }
}
