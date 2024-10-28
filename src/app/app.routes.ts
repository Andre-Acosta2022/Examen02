import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibroComponent } from './libro/libro.component';



export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        title:'Página Inicio'
    },
    {
        path:'lib',
        component:LibroComponent,
        title:'Libro'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
