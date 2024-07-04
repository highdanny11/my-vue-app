import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then(
      () => console.log('register success'),
      (err) => console.log('register fail:', err)
    )
}

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app') 
