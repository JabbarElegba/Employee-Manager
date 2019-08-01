import Vue from 'vue';
import App from './App.vue';
import router from './router/Router';
import firebase from 'firebase';
import './components/firebaseinit';

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
