<template>
  <view class="video-profile">
    <view class="cover" @click="play">
      <view class="leggings">
				<img :src="introduction.imageUrl" alt="" v-if="introduction.imageUrl"  />
				<view class="desctipt">
					{{introduction.discript}}
					
				</view>
			</view>
      <img :src="playImg" alt="">
    </view>
    <video-play :url="introduction.videoUrl" :visble="visble" @closeVideo="closeVideo"/>
  </view>
</template>

<script>
	import playImg from '@image/play.png'
	import VideoPlay from '@assets/components/VideoPlay.vue'
export default {
  name: 'VideoProfile',
  props:['introduction'],
	components:{VideoPlay},
  data() {
    return {
      playImg,
      visble:false,
    }
  },
  methods: {
    play(){
      this.visble = true
      window.document.body.style.overflow = 'hidden'
    },
    closeVideo(){
      this.visble = false
      window.document.body.style.overflow = 'auto'
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/minix.scss";

.video-profile {
  @include wh(100%,100%);
	border-radius: 20px;
	overflow: hidden;
  .cover {
    @include wh(100%,100%);
    .leggings{
      @include wh(100%,100%);
	  @include fj(center)
	   .desctipt{
		   text-align: center;
		   color: rgb(0, 0, 0);
		   font-family: 思源黑体;
		   font-size: 32px;
		   font-weight: 700;
		   line-height: -1px;
		   letter-spacing: 0px;
		   width: 100%;
		   position: absolute;
		   top: 30%;
		   
	   }
			img{
				@include wh(100%,100%);
				object-fit: cover;
			}
      // @include bis-self('//image.ahsjgs.com/images/default/videoCover.png');
			// background-repeat: no-repeat;
			// background-size: 100% 101%;
			// background-position: center;
      transition: all 200ms ease-in-out;
    }
    position: relative;
    cursor: pointer;
    img{
      position: relative;
      @include center;
      z-index: 99;
    }
    &:hover .leggings {
      filter: brightness(60%);
    }
  }

}
</style>