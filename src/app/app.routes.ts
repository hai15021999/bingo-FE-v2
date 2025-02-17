import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => (import('./views/login/login.component').then((m) => m.LoginComponent))
    },
    {
        path: 'register',
        loadComponent: () => (import('./views/register/register.component').then((m) => m.RegisterComponent))
    },
    {
        path: 'home',
        loadComponent: () => (import('./views/home/home.component').then((m) => m.HomeComponent))
    },
    {
        path: 'gaming',
        loadComponent: () => (import('./views/gaming/gaming.component').then((m) => m.GamingComponent))
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
