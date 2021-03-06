import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditorComponent } from './editor/editor.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, 
  {
    path: 'editor',
    component: EditorComponent
  }, 
  {
    path: 'viewer',
    component: ViewerComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
