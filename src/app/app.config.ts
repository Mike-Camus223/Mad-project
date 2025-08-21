import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { DarkmodeService } from './core/services/darkmode/darkmode.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    //===== INICIALIZADOR DEl DARKMODE =====//

    // APP_INITIALIZER permite ejecutar código antes de que la app arranque ok?
    // multi en true permite tener varios inicializadores si los necesitamos
    // deps marcando el servicio que creamos osea darkmode service le indica a Angular que inyecte nuestro servicio
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [DarkmodeService],
      useFactory: (dark: DarkmodeService) => () => dark.init(),
      // basicamente esto hace que el darkmode se inicialice automáticamente al abrir la app , asi cuando el usuario vea la pagina ya se aplica el tema correcto que es
      // claro o oscuro, o el predeterminado del sistema //
    },
  ]
};
