import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ✅ Componentes
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookFormComponent } from './components/auth/book-form/book-form.component';

// ✅ Servicios
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';
import { ApiService } from './services/api.service';

// ✅ Guards
import { AuthGuard } from './helpers/auth.guard';
import { RoleGuard } from './helpers/role.guard';

// ✅ Angular Material (opcional)
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookFormComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // Material
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  providers: [
    AuthService,
    TokenStorageService,
    ApiService,
    AuthGuard,
    RoleGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
