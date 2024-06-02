import { Routes } from '@angular/router';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TiendaHomeComponent } from './components/tienda/tienda-home/tienda-home.component';
import { TiendaDetailComponent } from './components/tienda/tienda-detail/tienda-detail.component';
import { FormTiendaComponent } from './components/tienda/form-tienda/form-tienda.component';
import { RecomendadorMazosComponent } from './components/planificador-mazos/recomendador-mazos/recomendador-mazos.component';
import { PlanificadorManualComponent } from './components/planificador-mazos/planificador-manual/planificador-manual.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'registro', component: RegistroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'tienda', component: TiendaHomeComponent },
    { path: 'tienda/:id', component: TiendaDetailComponent },
    { path: 'vender', component: FormTiendaComponent, canActivate: [authGuard] },
    { path: 'recomendador', component: RecomendadorMazosComponent },
    { path: 'planificador', component: PlanificadorManualComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] }
];