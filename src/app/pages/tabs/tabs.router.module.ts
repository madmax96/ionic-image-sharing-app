import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home-tab/home.module').then(m => m.HomePageModule),
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profile-tab/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: ':username',
            loadChildren: () =>
              import('../profile-tab/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../settings-tab/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chat-tab/chat-tab.module').then(m => m.ChatTabPageModule)
          }
        ]
      },
      {
        path: 'chat-window',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chat-window/chat-window.module').then(m => m.ChatWindowPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
