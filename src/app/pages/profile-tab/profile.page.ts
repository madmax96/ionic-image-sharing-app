import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { ImageService } from 'src/app/services/api/image.service';
import { PostService } from 'src/app/services/api/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  user: any
  modalOpened:boolean = false
  newPostDescription:string = ''
  newPostBase64Image:string = ''
  posts:any
  constructor(
    private sessionService: SessionService,
    private imageService: ImageService,
    private postService: PostService
     ) {}

  ngOnInit() {
    this.user = this.sessionService.getUser();
  }

  ionViewWillEnter(){
    this.postService.getUserPosts().then(posts=>{
      this.posts = posts || [];
    })
   }

  openFileBrowser(elementId){
    document.getElementById(elementId).click();
  }

  clearFileInput(elementId){
    document.getElementById(elementId).value= '';
  }
  async onProfilePictureSelected($event){
    let [image] = $event.target.files;
    const base64ImgData:string = await this.encodeImageFileAsURL(image);
    this.imageService.uploadProfileImage(base64ImgData)
    .then(()=>{
      this.clearFileInput('profilePictureFileInput');
    });
  }

 async onPostPictureSelected($event){
    let [image] = $event.target.files;
    this.newPostBase64Image= await this.encodeImageFileAsURL(image);

  }

  async makeNewPost(){
    if(!this.newPostDescription || !this.newPostBase64Image) return;
    try {
      const createdPost = await this.postService.createPost({base64Image:this.newPostBase64Image,description:this.newPostDescription})
      this.posts = [createdPost, ...this.posts];
    } catch (err) {
      alert('Post creation failed. Please try again later');
    }
    this.closeAddPostModal();
    this.newPostBase64Image = '';
    this.newPostDescription = '';
    this.clearFileInput('postPictureFileInput');
  }

  handlePostDelete(postId){
    this.postService.deletePost(postId)
    .then(()=>{
      this.posts = this.posts.filter(post=>post.id!==postId);
    })
    .catch(()=>{
      alert('Something went wrong.Please try later');
    })
  }
  openAddPostModal(){
    this.modalOpened = true;
  }
  closeAddPostModal(){
    this.modalOpened = false;
  }

  encodeImageFileAsURL(file:File):Promise<any>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((res) => {
      reader.onloadend = function onloadend() {
        res(reader.result);
      };
    });
  }

}
