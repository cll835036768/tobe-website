<template>
	<view class="IndexPage">
		<view class="banner">

			<VideoProfile :introduction='introduction' />

		</view>
		<view class="model1">
			<view class="slogan fadeIn animated">探索专业/留学规划，系统优化出国准备工作</view>
			<view class="ftitle">选择大于努力是共识，选定一个合适的，能发挥自身价值的塞到，是提升人生成功概率的最优方法论</view>
			<view class="pictureCom">
				<view class="pictureComWrap animated fadeInUp-20" :class="list0" v-for="(item,idx) in model1ComImg"
					:key="idx">

					<img :src="item" alt="" />

				</view>
			</view>
		</view>

		<view class="model2">
			<view class="slogan fadeIn animated">AI测评规划</view>
			<view class="top">
				<view class="textDiscipt">
					<view class="textTitle">
						AI测评
					</view>
					<view class="textBody">
						文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字85字
					</view>


				</view>
				<view class="video">
					<VideoProfile :introduction='introduction' />
				</view>

			</view>

			<view class="bottom">

				<view class="video">
					<VideoProfile :introduction='introduction' />
				</view>
				<view class="textDiscipt">
					<view class="textTitle">
						AI测评
					</view>
					<view class="textBody">
						文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字85字
					</view>


				</view>



			</view>



		</view>


		<view class="model4">
			<view class="model4Wrap">
				<view class="slogan1">大大小小的留学团队都依赖TOBE</view>
				<view class="slogan2">tobe可以安全扩展，支持学生的DIY操作</view>
				<view class="btns">
					<view class="btn deepColor">注册成为TOBE的合作伙伴</view>
					<view class="btn lightColor">欢迎加入TOBE大家庭</view>
				</view>
				<view class="countNumWrap">
					<view class="countNum">
						<view class="num">84%</view>
						<view class="des">认为录取更好了</view>
					</view>
					<view class="countNum">
						<view class="num">84%</view>
						<view class="des">认为录取更好了</view>
					</view>
					<view class="countNum">
						<view class="num">84%</view>
						<view class="des">认为录取更好了</view>
					</view>
				</view>
				<view class="littleTag">
					<view class="tagMono" :class="'icon'+idx" v-for="(item,idx) in tagIcon" :key="idx">
						<img :src="item.url" alt="" />
						<span>{{item.num}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="model5">
			<view class="slogan">我们的合作伙伴</view>
			<home-case :homecase="homecase"></home-case>
		</view>
		<view class="model6">
			<view class="adsense">
				<img :src="bottomBanner" alt="" />
			</view>
		</view>
		<view class="model7">
			<view class="model7Wrap">
				<video-profile v-for="(item,idx) in videoInfo" :key="idx" :introduction="item"></video-profile>
			</view>
		</view>
		<view class="model8">
			<view class="slogan1">听听用户怎么说...</view>
			<use-case :usecase="usecase"></use-case>
			<view class="slogan2">
				<span>TOBE正成为最具创造力和责任心的留学公司，</span><span
					class="grayColor">致力于以创意方式助学生实现梦想。我们聚集最优秀的年轻人，恪守严格的道德准则，以几近苛刻的要求和最卓越的专业水平，为客户提供一流的留学咨询和能力培养服务。</span>
			</view>
		</view>
		<my-foot></my-foot>
	</view>
</template>

<script>
	import {
		tagIcon,
	} from './export.js'
	import HomeCase from './HomeCase.vue';
	import UseCase from './UseCase.vue';
	import VideoProfile from './VideoProfile.vue';
	import {
		videoApi,
		bannerApi,
		configApi,
		userSide
	} from '@api/homeApi.js'
	export default {
		name: 'PagesIndex',
		components: {
			HomeCase,
			UseCase,
			VideoProfile
		},
		data() {
			return {
				usecase: [], // 1
				homecase: [], // 1
				model1ComImg: [],
				// model1Comtext: {},
				tagIcon,
				middleBanner: '', // 1
				bottomBanner: '', // 1
				aboutUs: {}, // 1
				banner: [],
				videoInfo: [],
				introduction: {
					videoUrl: 'https://www.runoob.com/try/demo_source/movie.mp4',
					discript: '规划课+AI智能规划+AI测评',



				}
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			async getData() {
				let resDataList = await Promise.all([videoApi({
					type: 1,
					limit: 2
				}), bannerApi({
					type: 1,
					limit: 3
				}), bannerApi({
					type: 2,
					limit: 6
				}), bannerApi({
					type: 3,
					limit: 1
				}), bannerApi({
					type: 4,
					limit: 5
				}), bannerApi({
					type: 5,
					limit: 1
				}), configApi({}), userSide({
					type: 1,
					limit: 5
				})]);
				let videoInfo = [],
					banner = [],
					model1ComImg = [],
					middleBanner = '',
					homecase = [],
					bottomBanner = '',
					aboutUs = {},
					usecase = [];
				resDataList.map((res, idx) => {
					if (idx == 0) {
						res.data.map(item => {
							videoInfo.push({
								imageUrl: item.image_text,
								videoUrl: item.video_text,
								id: item.id
							})
						})
					} else if (idx == 1) {
						res.data.map(item => {
							banner.push({
								bannerUrl: item.image_text,
								id: item.id,
								name: item.name,
								text: item.text
							})
						})
					} else if (idx == 2) {
						let siger = res.data.slice(0, 1);
						let other = res.data.slice(1);
						other.map((item, index) => {
							if (index == 2) {
								model1ComImg.push({
									img1: siger[0].image_text,
									img2: item.image_text
								})
							} else {
								model1ComImg.push(item.image_text)
							}
						})
					} else if (idx == 3) {
						res.data.map(item => {
							middleBanner = item.image_text
						})
					} else if (idx == 4) {
						res.data.map(item => {
							homecase.push({
								engineerUrl: item.image_text,
								contentId: item.id
							})
						})
					} else if (idx == 5) {
						res.data.map(item => {
							bottomBanner = item.image_text
						})
					} else if (idx == 6) {
						aboutUs = res.data
					} else if (idx == 7) {
						res.data.map(item => {
							usecase.push({
								engineerUrl: item.image_text,
								desc: item.text,
								id: item.id,
								name: item.name
							})
						})
					}
				})
				this.usecase = usecase;
				this.homecase = homecase;
				this.model1ComImg = [1, 2, 4];
				this.middleBanner = middleBanner;
				this.bottomBanner = bottomBanner;
				this.aboutUs = aboutUs;
				this.banner = banner;
				this.videoInfo = videoInfo;
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/minix.scss";

	.IndexPage {
		width: 100%;

		.banner {
			@include fj(center) width: 100%;
			height: 570px;
			border-radius: 20px;
			background: rgb(196, 196, 196);

			.name {
				@include center;
				font-size: 60px;
				color: #fff;
				font-weight: 700;
			}

			.bannerImg {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.model8 {
			@include ct1200;
			@include modelPd;

			.slogan1 {
				font-size: 34px;
				font-weight: 700;
			}

			.slogan2 {
				width: 1100px;
				margin: 30px auto;
				font-size: 26px;
				font-weight: 700;
				text-align: center;

				.grayColor {
					color: $gray;
				}
			}
		}

		.model7 {
			background-color: $bc;
			@include modelPd;

			.model7Wrap {
				@include ct1200;
				@include fj();
			}
		}

		.model6 {
			@include ct1200;

			.adsense {
				width: 100%;
				height: 560px;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}

		.model5 {
			@include ct1200;
			@include modelPd;
			font-weight: 700;

			.slogan {
				font-size: 34px;
				text-align: center;
			}
		}

		.model4 {
			background-color: $bc;
			@include modelPd;

			.model4Wrap {
				@include ct1200;
				position: relative;

				.littleTag {
					.tagMono {
						position: absolute;
						width: 100px;
						height: 60px;
						background-color: $tagBg;
						border-radius: 8px;
						@include fj(center);
						align-items: center;
						transition: 0.3s all ease-in-out;

						&:hover {
							box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
							transform: translate3d(0, -3px, 0px);
						}

						img {
							@include wh(44px, 38px);
							@include mr(8px);
						}

						span {
							font-family: Impact;
							font-size: 28px;
						}
					}

					.icon0 {
						left: 0px;
						top: 10px;
					}

					.icon1 {
						left: 90px;
						top: 100px;
					}

					.icon2 {
						left: 20px;
						top: 230px;
					}

					.icon3 {
						right: 100px;
						top: 20px;
					}

					.icon4 {
						right: 20px;
						top: 120px;
					}

					.icon5 {
						right: 120px;
						top: 230px;
					}

				}

				.countNumWrap {
					@include fj();

					.countNum {
						width: 800px;
						text-align: center;
						margin: 140px auto 40px;

						.num {
							font-family: Impact;
							font-size: 80px;
							color: $themeFontColor;
						}

						.des {
							font-family: Impact;
							font-weight: 700;
							font-size: 30px;
							color: $themeFontColor;
						}
					}
				}

				.slogan1 {
					font-size: 34px;
					font-weight: 700;
					margin: 20px auto;
					text-align: center;
				}

				.slogan2 {
					font-size: 24px;
					font-weight: 700;
					margin: 40px auto 60px;
					text-align: center;
				}

				.btns {
					@include fj();
					width: 600px;
					margin: 0 auto;

					.btn {
						width: 280px;
						height: 80px;
						line-height: 80px;
						text-align: center;
						border-radius: 10px;
						font-size: 20px;
						cursor: pointer;
						transition: 0.3s all ease-in-out;

						&:hover {
							box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
							transform: translate3d(0, -3px, 0px);
						}
					}

					.deepColor {
						background-color: $themeFontColor;
						color: #fff;
					}

					.lightColor {
						border: 1px solid #333;
						color: #333;
					}
				}
			}
		}

		.model3 {
			@include ct1200;
			@include modelPd;

			.adsense {
				width: 100%;
				height: 460px;
				border-radius: 10px;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
		}

		.model2 {
			@include ct1200;
			padding: 40px 0;

			.slogan {
				width: 100%;
				font-size: 32px;
				font-weight: 700;
				margin: 0 auto 10px;
				text-align: center;
				font-family: 思源黑体;
			}

			.top {
				width: 100%;
				display: flex;

				.textDiscipt {
					display: flex;
					flex-direction: column;
					padding: 0 20px;
					margin-right: 20px;
					flex:1;

					.textTitle {
						font-family: 思源黑体;
						font-size: 30px;
						font-weight: 700;
						line-height: -1px;
						letter-spacing: 0px;
						text-align: left;


					}

					.textBody {
							@include mt(20px);
							@include multi-ellipsis--l(4);
							font-family: 思源黑体;
							font-size: 30px;
					}
				}

				.video {
					width: 510px;
						height: 300px;
					border-radius: 20px;
					background: rgb(196, 196, 196);

				}

			}

			.bottom {
				width: 100%;
				display: flex;
				@include mt(20px);

				.textDiscipt {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					padding: 0 20px;
					margin-left: 20px;
					flex:1;

					.textTitle {
						@include multi-ellipsis--l(4);
							@include mt(20px);
						font-family: 思源黑体;
						font-size: 30px;
						font-weight: 700;
						line-height: -1px;
						letter-spacing: 0px;
						text-align: left;


					}

					.textBody {
						@include multi-ellipsis--l(4);
						font-family: 思源黑体;
						font-size: 30px;
					}
				}

				.video {
				width: 510px;
					height: 300px;
					border-radius: 20px;
					background: rgb(196, 196, 196);

				}

			}



		}

		.model1 {
			@include ct1200;
			@include modelPd;

			.pictureCom {
				display: flex;
				justify-content: space-between;


				.pictureComWrap {
					width: 100%;
					height: 420px;
					margin-right: 20px;
					border-radius: 20px;
					background: rgb(196, 196, 196);

				}

			}

			.fadeInUp-20 {
				animation-name: fadeInUp-20;
			}

			.fadeIn {
				animation-name: fadeIn;
			}

			.animated {
				animation-duration: 2.4s;
				animation-fill-mode: both;
			}

			.slogan {
				width: 100%;
				font-size: 32px;
				font-weight: 700;
				margin: 0 auto 10px;
				text-align: center;
				font-family: 思源黑体;

			}

			.ftitle {
				width: 100%;
				font-family: 思源黑体;
				text-align: center;
				font-size: 20px;
				color: rgb(183, 183, 183);
				margin: 0 auto 20px;
			}
		}
	}

	@keyframes fadeInUp-20 {
		0% {
			opacity: 0;
			transform: translate3d(0, 20px, 0);
		}

		100% {
			opacity: 1;
			transform: none;
		}
	}

	@keyframes fadeInUp {
		0% {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}

		100% {
			opacity: 1;
			transform: none;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>