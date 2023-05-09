<template>
    <div class="account">
        <div class="profile-container"> 
            <img :src="user.profilePicture" class="profile-picture" />
            <h1>{{user.username}}</h1>
            <button class="follow-button" @click="toggleFollow">{{ user.isFollowing ? 'Unfollow' : 'Follow' }}</button>
            <div class="followers">
                <h2>{{ this.user.followers }} Followers</h2>
                <h2>{{ this.user.following }} Following</h2>
            </div>
        </div> 
        <div v-for="(image, index) in images" :key="index" class="image-container">
            <div class="image-wrapper">
                <router-link :to="`/profile/${user.user_id}`" class="profile-link">
                    <img :src="image.profileIcon" class="profile-icon" />
                    <h2 class="profile-name">{{ image.profileName }}</h2>
                </router-link>
                <img :src="image.src" />
                <div class="image-tags">
                  <span v-for="(tag, tagIndex) in image.tags" :key="tagIndex" class="tag">{{ tag }}</span>
                </div>
                <!-- <div class="like">
                    <button class="like-button" @click="toggleLike(index)">
                    <i :class="[image.liked ? 'fas' : 'far', 'fa-heart']"></i>&nbsp;{{ image.likes }}
                    </button>
                    <button class="like-button" @click="toggleComments">
                    <i class="far fa-comment"></i>
                    </button>
                </div> -->
                <!-- <div class="image-caption">{{ image.caption }}</div>
                <div class="comments" v-if="showComments">
                    <input v-model="commentInput" placeholder="Write a comment..." />
                    <button class = "btn" @click="submitComment(index)">Submit</button>
                    <div v-for="(comment, cIndex) in image.comments" :key="cIndex" class="image-comment">
                        {{ comment.username }}: {{ comment.text }}
                    </div>
                </div> -->
            </div>
        </div>
        <div v-if="noImages" class="no-images-message">
          <h1>No images found.</h1>
        </div>
    </div>
  </template>
  
<script>
    import axios from 'axios';
    export default {
      name: "account",
      props: ['userId'],
      computed: {
        isOwnProfile() {
          return this.userId === localStorage.getItem("user_id");
        }
      },
      watch: {
        async userId(newUserId) {
          // Reset component state
          this.user = {
            user_id: '',
            profilePicture: '',
            username: '',
            isFollowing: false,
            followers: [],
            following: [],
          };
          this.images = [];

          // Fetch the new user's data
          const userInfo = await this.getUserInfo(newUserId);

          if (userInfo) {
            this.user.user_id = userInfo.user_id;
            this.user.username = userInfo.user_name;
            this.user.profilePicture = userInfo.pfp || '/tempprofile.svg';
            this.user.followers = userInfo.followers.length;
            this.user.following = userInfo.follows.length;
          }
          // Fetch follows of the logged-in user
          const loggedInUserFollows = await this.fetchFollows();
          // Check if the user being viewed is in the follows list
          this.user.isFollowing = loggedInUserFollows.includes(this.user.user_id);

          this.fetchImages(newUserId);
        },
      },
      
      async mounted() {
        const userInfo = await this.getUserInfo(this.userId);

        if (userInfo) {
          this.user.user_id = userInfo.user_id;
          this.user.username = userInfo.user_name;
          this.user.profilePicture = userInfo.pfp || '/tempprofile.svg';
          this.user.followers = userInfo.followers.length;
          this.user.following = userInfo.follows.length;
        }
          // Fetch follows of the logged-in user
        const loggedInUserFollows = await this.fetchFollows();
        // Check if the user being viewed is in the follows list
        this.user.isFollowing = loggedInUserFollows.includes(this.user.user_id);

        this.fetchImages(this.userId);
      },

      data() {
        return {
            noImages: false,
            user: {
                user_id: '',
                profilePicture: '',
                username: '',
                isFollowing: false,
                followers: [],
                following: []
            },
            images: [],
          //commentInput: "",
          //showComments: false,
        };
      },
      methods: {
        async getUserInfo(userId) {
          try {
            const response = await axios.get('http://localhost:5051/profile/get_user_info', {
              params: {
                  user_id: userId
              }
            });
            //console.log(response.data);
            const { user_id, user_name, pfp, followers, follows } = response.data;
            return { user_id, user_name, pfp, followers, follows };
          } catch (error) {
            console.error(error);
            alert("Failed to fetch user information. Please try again.");
            return null;
          }
        },

        async fetchImages(userId) {
          try {
              const response = await axios.get(`http://localhost:5050/images/user/${userId}`, {
                  headers: {
                      "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                  },
              });
              const images = response.data.images;
              //console.log(images);

              for (const image of images) {
                  const secureImageResponse = await axios.get(image.url, {
                      headers: {
                          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                      },
                      responseType: 'blob'
                  });

                  const imageUrl = URL.createObjectURL(secureImageResponse.data);

                  this.images.push({
                      id: image.id,
                      profileIcon: this.user.profilePicture || '/tempprofile.svg',
                      profileName: this.user.username,
                      src: imageUrl,
                      tags: image.tags
                      //caption: "Caption for image",
                      // likes: image.likes,
                      // liked: image.liked_by ? image.liked_by.includes(localStorage.getItem("user_id")) : false,
                      // comments: [],
                  });
              }
          } catch (error) {
              if (error.response && error.response.status === 404) {
                  this.noImages = true;
              } else {
                  console.error('Error fetching images:', error);
              }
          };
        },

        async fetchFollows() {
          try {
            const response = await axios.get('http://localhost:5051/profile/get_follows', {
              params: {
                user_id: localStorage.getItem("user_id")
              }
            });
            return response.data.follows;
          } catch (error) {
            console.error(error);
            alert("Failed to fetch follows.");
            return [];
          }
        },

        async toggleFollow() {
          try {
            if (!this.user.isFollowing) {
              // Follow the user
              const response = await axios.post('http://localhost:5051/profile/follow_user', {
                  user_to_follow: this.user.user_id,
                }, {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                }});

              if (response.status === 200) {
                this.user.isFollowing = true;
                this.user.followers++;
              } else {
                console.error(response.data.error);
              }
            } else {
              // Unfollow the user
              const response = await axios.post('http://localhost:5051/profile/unfollow_user',  {
                  user_to_unfollow: this.user.user_id,
                }, {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                }});

              if (response.status === 200) {
                this.user.isFollowing = false;
                this.user.followers--;
              } else {
                console.error(response.data.error);
              }
            }
          } catch (error) {
            console.error(error);
          }
        },
        // async toggleLike(index) {
        //   const image = this.images[index];
        //   if (image.liked) {
        //     const success = await this.unlikeImage(image.id);
        //     if (success) {
        //       image.likes--;
        //       image.liked = false;
        //     }
        //   } else {
        //     const success = await this.likeImage(image.id);
        //     if (success) {
        //       image.likes++;
        //       image.liked = true;
        //     }
        //   }
        // },

        // async likeImage(imageId) {
        //   try {
        //     const response = await axios.post('http://localhost:5050/images/like', {
        //       image_id: imageId,
        //     }, {
        //       headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        //       },
        //     });

        //     if (response.status === 200) {
        //       return true;
        //     } else {
        //       console.error(response.data.error);
        //       return false;
        //     }
        //   } catch (error) {
        //     console.error(error);
        //     return false;
        //   }
        // },

        // async unlikeImage(imageId) {
        //   try {
        //     const response = await axios.post('http://localhost:5050/images/unlike', {
        //       image_id: imageId,
        //     }, {
        //       headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        //       },
        //     });

        //     if (response.status === 200) {
        //       return true;
        //     } else {
        //       console.error(response.data.error);
        //       return false;
        //     }
        //   } catch (error) {
        //     console.error(error);
        //     return false;
        //   }
        // },
        // toggleComments() {
        //   this.showComments = !this.showComments;
        // },
        // submitComment(index) {
        //   const image = this.images[index];
        //   if (this.commentInput.trim() !== '') {
        //     image.comments.push({
        //       text: this.commentInput,
        //       username: image.profileName,
        //     });
        //     this.commentInput = "";
        //     this.showCommentForm = false;
        //   }
        // }
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
        margin-left: 0rem;
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

    .image-tags {
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;
    }

    .tag {
      background-color: rgba(0, 0, 0, 0.6);;
      border-radius: 3px;
      color: white;
      font-size: 14px;
      margin: 2px 5px 2px 0;
      padding: 2px 5px;
    }
  </style>