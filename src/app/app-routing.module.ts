import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './web/pages/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { AdminGuard } from './guards/admin.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./web/web.module').then(m=> m.WebModule),
    data: {
      preload: true
    },
  },
  {
    path: 'cms',
    loadChildren: ()=> import('./cms/cms.module').then(m=> m.CmsModule),
    data: {
      preload: false
    },
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
