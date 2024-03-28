<template>
	<view class="home-case">
		<VueSlickCarousel v-bind="settings">
			<view class="item" v-for="item in usecase" :key="item.id">
				<view class="imgWrap">
					<view class="header"><el-avatar shape="circle" :src="item.engineerUrl"></el-avatar></view>
					<view class="des">{{item.desc}}</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</VueSlickCarousel>
	</view>
</template>

<script>
	import VueSlickCarousel from 'vue-slick-carousel'
	import 'vue-slick-carousel/dist/vue-slick-carousel.css'
	import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
	export default {
		name: 'UseCase',
		props: ['usecase'],
		data() {
			return {
				settings: {
					draggable: false,
					autoplay: true,
					arrows: true,
					"dots": false,
					"infinite": true,
					"initialSlide": 2,
					"speed": 500,
					"slidesToShow": 4,
					"slidesToScroll": 1,
					"swipeToSlide": false
				},
			}
		},
		methods: {},
		components: {
			VueSlickCarousel
		},
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/minix.scss";

	.home-case {
		@include mt(16px);
		height: 400px;
		overflow: hidden;

		::v-deep .slick-next {
			right: 0px;
			@include wh(30px, 30px);

			&:before {
				color: $tagBg;
				font-size: 30px;
			}
		}

		::v-deep .slick-prev {
			left: 0px;
			@include wh(30px, 30px);
			z-index: 99;

			&:before {
				color: $tagBg;
				font-size: 30px;
			}
		}
	}

	.item {
		outline: none;
		
		.imgWrap {
			@include wh(260px, 320px);
			overflow: hidden;
			margin: 0 auto;
			background: $bc;
			border-radius: 10px;
			padding: 30px 24px;
			box-sizing: border-box;
			.des{
				color: $themeColor;
				line-height: 26px;
				@include mt(20px);
				@include multi-ellipsis--l(6);
				height: 156px;
			}
			.name{
				@include mt(20px);
				text-align: right;
			}
		}



		&::v-deep .slick-list .slick-track {
			margin: 0 !important;
		}
	}
</style>