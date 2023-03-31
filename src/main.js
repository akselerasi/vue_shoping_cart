import { createApp } from 'vue';

// includes
import router from './includes/routes';
import pinia from './includes/pinia';
import i18n from './includes/i18n';

import './style.scss';

// app-component
import App from './App.vue';

// z start
createApp(App)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(primevue).mount('#app');
