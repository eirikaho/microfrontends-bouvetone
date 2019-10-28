# Vue

```javascript
import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
import TestComp from './components/testcomp-vue.vue'

Vue.use(VueCustomElement);
Vue.customElement('test-comp-vue', TestComp);
```
