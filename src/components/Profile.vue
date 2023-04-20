<template>
    <div class="account">
        <div class="profile-container"> 
            <img :src="user.profilePicture" class="profile-picture" />
            <h1>{{user.name}}</h1>
            <button class="follow-button" @click="toggleFollow">{{ user.isFollowing ? 'Unfollow' : 'Follow' }}</button>
            <div class="followers">
                <h2>{{ user.followers }} Followers</h2>
                <h2>{{ user.followers }} Following</h2>
            </div>
        </div> 
        <div v-for="(image, index) in images" :key="index" class="image-container">
            <div class="image-wrapper">
                <router-link :to="`/profile/${image.profileName}`" class="profile-link">
                    <img :src="image.profileIcon" class="profile-icon" />
                    <h2 class="profile-name">{{ image.profileName }}</h2>
                </router-link>
                <img :src="image.src" />
                <div class="like">
                    <button class="like-button" @click="toggleLike(index)">
                    <i :class="[image.liked ? 'fas' : 'far', 'fa-heart']"></i>&nbsp;{{ image.likes }}
                    </button>
                    <button class="like-button" @click="toggleComments">
                    <i class="far fa-comment"></i>
                    </button>
                </div>
                <div class="image-caption">{{ image.caption }}</div>
                <div class="comments" v-if="showComments">
                    <input v-model="commentInput" placeholder="Write a comment..." />
                    <button class = "btn" @click="submitComment(index)">Submit</button>
                    <div v-for="(comment, cIndex) in image.comments" :key="cIndex" class="image-comment">
                        {{ comment.username }}: {{ comment.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
    export default {
      name: "account",
      data() {
        return {
            user: {
                profilePicture: "tempprofile.svg",
                name: "Catman",
                isFollowing: false,
                followers: 0,
                following: 0
            },

            images: [
                {
                profileIcon: "tempprofile.svg",
                profileName: "catman",
                src: "tilly.jpg",
                caption: "Caption for image 1",
                likes: 0,
                liked: false,
                comments: [],
                },
                {
                profileIcon: "tempprofile.svg",
                profileName: "catman",
                src: "tilly2.jpg",
                caption: "Caption for image 2",
                likes: 0,
                liked: false,
                comments: [],
                },
                {
                profileIcon: "tempprofile.svg",
                profileName: "catman",
                src: "tilly6.jpg",
                caption: "Caption for image 3",
                likes: 0,
                liked: false,
                comments: [],
                },
            ],
          commentInput: "",
          showComments: false,
        };
      },
      methods: {
        toggleFollow() {
            const user = this.user;
            user.isFollowing = !user.isFollowing;
            if (user.isFollowing) {
                user.followers++;
                user.following++;
            } else {
                user.followers--;
                user.following++;
            }
        },
        toggleLike(index) {
          const image = this.images[index];
          if (image.liked) {
            image.likes--;
          } else {
            image.likes++;
          }
          image.liked = !image.liked;
        },
        toggleComments() {
          this.showComments = !this.showComments;
        },
        submitComment(index) {
          const image = this.images[index];
          if (this.commentInput.trim() !== '') {
            image.comments.push({
              text: this.commentInput,
              username: image.profileName,
            });
            this.commentInput = "";
            this.showCommentForm = false;
          }
        }
      },
    };
  </script>
  
  <style>
    img {
      max-width: 500px;
      max-height: 500px;
      padding: 2rem;
      margin-bottom: -2rem;
      object-fit: contain;
    }
  
    .image-container {
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 5px solid white;
      border-radius: 10px;
      margin: 2rem 0;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }
  
    .image-wrapper {
      position: relative;
      height: auto;
      max-width: 800px;
      margin-bottom: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }
  
    .image-caption {
        position: inline-flex;
        bottom: 0;
        left: 0;
        color: white;
        padding: 1rem;
        margin-bottom: -2rem;
        width: 97%;
        text-align: left;
    }
    
    .profile-container {
        flex-wrap: wrap;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 5px solid white;
        border-radius: 10px;
        margin: 2rem 0;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .profile-link {
      display: flex;
      align-items: center;
      margin-bottom: -3rem;
      margin-top: -1rem;
      text-decoration: none;
      color: inherit;
      transition-duration: 0.3s;
    }
  
    .profile-link:hover {
      text-decoration: underline;
      color: #00ffea;
    }
  
    .profile-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: -1.5rem;
      margin-bottom: -0.5rem;
    }
    
    .profile-picture {
        width: 8rem;
        height: 8rem;
        margin: 0rem;
        margin-left: -2rem;
        margin-right: -1rem;
        padding: 1rem;
    }

    .profile-name {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }

    .follow-button {
        font-size: 1rem;
        margin-left: 2rem;
        margin-right: 2rem;
        border-radius: 10px;
        width: 6rem;
        background-color: var(--background-color);
        transition-duration: 0.4s;
        --background-color: white;
        --accent-color: #00ffea;
    }

    .follow-button:hover {
        background-color: var(--accent-color);
    }

    .like-button {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem;
      margin-bottom: -1rem;
      border: none;
      background: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition-duration: 0.3s;
    }
  
    .like-button:hover {
      color: #00ffea;
    }
  
    .comments {
      padding: 1rem;
      text-align: left;
      margin-bottom: -3rem;
    }
  
  </style>