import { Routes } from '@angular/router';

//==== estas son las rutas principales de la app, aca no pongas las paginas del dashboard, aca iran rutas mas generales como auth ====//
export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../app/layouts/main-layout/main-layout.routes').then(r => r.mainLayoutRoutes)
    },
    {
        path: '**', // esto hace que si se escribe cualquier cosa que no este enrutado ejemplo /seccion-no-crada, redirige al usuario a /general //
        redirectTo: 'general', // que seria esto de acá //
    },
];
