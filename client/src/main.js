import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './css/output.css' //tailwindcss
import './js/scripts' //scripts
import * as firebase from 'firebase/app'
import 'firebase/auth'
import UserService from './Services/UserService'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Singapore')
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

const firebaseConfig = {
	apiKey: 'AIzaSyCvtXXhjsNCtodeU_DmqlTwzlvILT1MUpc',
	authDomain: 'fir-login-1537a.firebaseapp.com',
	databaseURL: 'https://fir-login-1537a.firebaseio.com',
	projectId: 'fir-login-1537a',
	storageBucket: 'fir-login-1537a.appspot.com',
	messagingSenderId: '527848510404',
	appId: '1:527848510404:web:404536af983c70a4fd4a91',
	measurementId: 'G-GM2YK3339V',
}

firebase.initializeApp(firebaseConfig)

// let app = new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

let app
firebase.auth().onAuthStateChanged(async (firebaseUser) => {
	if (!app) {
		app = new Vue({
			router,
			render: (h) => h(App),
		}).$mount('#app')
	}
	if (firebaseUser) {
		let user = []
		if (!localStorage.id) {
			user = await UserService.getUser(firebaseUser.email)
			localStorage.id = user[0].id
			localStorage.firstname = user[0].firstname
			localStorage.lastname = user[0].lastname
			localStorage.email = user[0].email
			localStorage.position = user[0].position
			localStorage.contact = user[0].contact
			console.log(localStorage)
		}
	} else {
		localStorage.clear()
		console.log(localStorage)
	}
})
