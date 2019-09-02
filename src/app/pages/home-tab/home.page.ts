import { Component,OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ImageService } from 'src/app/services/api/image.service';
import { PostService } from 'src/app/services/api/post.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  user:any;
  posts:Array<any>

  constructor(
    private sessionService: SessionService,
    private imageService: ImageService,
    private postService: PostService) {}

  ngOnInit() {
    this.user = this.sessionService.getUser();
  }

  ionViewWillEnter(){
    this.postService.getAllPosts().then(posts=>{
      this.posts = posts;
    })
   }
}
