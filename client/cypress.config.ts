import { defineConfig } from 'cypress'
import { environment } from './src/environments/environment'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4400',

    //opicional: inclui comandos personalizados
    supportFile: 'cypress/support/e2e.ts',
    env: {
      apiUrl: environment.apiUrl,
    },
  },
});
