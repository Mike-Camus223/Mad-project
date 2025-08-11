import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../app/layouts/main-layout/main-layout.routes').then(r => r.mainLayoutRoutes)
    },
    {
        path: '**',
        redirectTo: 'general',
    },
];

//estas son las rutas principales de la app, aca no pongas las paginas del dashboard, aca iran rutas mas generales como auth //