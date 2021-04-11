import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify.js'
import vuelidate from 'vuelidate'

Vue.config.productionTip = false;

Vue.prototype.$token ="MtTqXQFsKMXPJQ59G-xdDOQpSi7YscbPLSQbITgdaK-Dp2IHns0FLn5i4NlXDS7uQWSImVLeE1b3n7tCsitZ5PcyIRqaBCB4gxOGzM__t38ot9-7RDecUzbhOnFxYHYx";
Vue.prototype.$adresse = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/";
new Vue({
  store,
  router,
  vuetify,
  vuelidate,
  render: h => h(App)
}).$mount('#app')


Vue.use(vuelidate);
