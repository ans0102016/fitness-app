import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'register', loadChildren: './register/register.module#RegisterModule' },
    ]
  }
];

export const firebaseConfig = {
  apiKey: "AIzaSyBYhxazSLT15cUPQT_e-Wr1obTs0gf6fuA",
  authDomain: "fitness-app-ba6ab.firebaseapp.com",
  databaseURL: "https://fitness-app-ba6ab-default-rtdb.firebaseio.com",
  projectId: "fitness-app-ba6ab",
  storageBucket: "fitness-app-ba6ab.appspot.com",
  messagingSenderId: "170243778263",
  appId: "1:170243778263:web:15640dfd7552aff720f292",
  measurementId: "G-JJDDM26L82"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}