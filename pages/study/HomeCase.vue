<template>
	<view class="home-case">
		<VueSlickCarousel v-bind="settings">
			<view class="item" v-for="item in homecase" :key="item.contentId">
				<view class="imgWrap">
					<img :src="item.engineerUrl" alt="">
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
		name: 'HomeCase',
		props: ['homecase'],
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
		height: 70px;
		overflow: hidden;

		::v-deep .slick-next {
			right: 20px;
			@include wh(30px, 30px);

			&:before {
				color: $tagBg;
				font-size: 30px;
			}
		}

		::v-deep .slick-prev {
			left: 20px;
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
			@include wh(200px, 70px);
			overflow: hidden;
			margin: 0 auto;

			img {
				transition: transform 400ms ease-in;
				@include wh(100%, 100%);
				object-fit: cover;
			}
		}

		&:hover {
			img {
				transform: scale(1.06);
			}
		}


		&::v-deep .slick-list .slick-track {
			margin: 0 !important;
		}
	}
</style>