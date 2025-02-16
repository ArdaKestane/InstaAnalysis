import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import './index.css';
import JsonViewer from 'vue-json-viewer';
import router from './router';

import { createI18n } from 'vue-i18n';

import en from './locales/en.json';
import tr from './locales/tr.json';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'tr',
  messages: {
    en,
    tr,
  },
});

const app = createApp(App);

app.use(i18n);
app.use(JsonViewer);
app.use(router);

// Mount the app
app.mount('#app');
