import { Routes } from "@angular/router";

export const mainLayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../main-layout/main-layout.component').then(c => c.MainLayoutComponent),
        children: [
            {
                path: 'general',
                loadComponent: () => import('../../features/dashboard/pages/general/general.component').then(c => c.GeneralComponent)
            },
            {
                path: 'systems',
                loadComponent: () => import('../../features/dashboard/pages/systems/systems.component').then(c => c.SystemsComponent)
            },
            {
                path: 'support',
                loadComponent: () => import('../../features/dashboard/pages/support/support.component').then(c => c.SupportComponent)
            },
            {
                path: '',
                redirectTo: 'general',
                pathMatch: 'full',
            },
        ]
    }
];

//estas son las rutas del layout de la app principal//
//en children tenes que poner las paginas que iremos creando//
