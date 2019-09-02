import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@NgModule({
  imports:[IonicModule.forRoot(),CommonModule],
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class ComponentsModule {}
