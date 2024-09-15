// Plugins
import { registerPlugins } from '@/plugins';

// Importa o app
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Criação do app
const app = createApp(App);

// Registro de plugins (rotas, o proprio app, middlewares...)
registerPlugins(app);

// Montar componentes e renderizar
app.mount('#app');
