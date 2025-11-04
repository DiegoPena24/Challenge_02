import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookFormComponent } from './components/auth/book-form/book-form.component';
import { AdminComponent } from './components/auth/admin/admin.component';
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ADMIN' } },
  { path: 'book', component: BookFormComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'USER' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule {}
