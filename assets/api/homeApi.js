import axios from '@utils/request.js'
let routeUrl = {
	video: "/index/index/getVideoList",
	banner: "/index/index/getBannerList",
	config: "/index/index/getConfig",
	textConfig: "/index/index/getTextConfig",
	menu: "/index/index/getMenu",
	userSide: "/index/index/getUserSide",
}

export function videoApi(params) {
	return axios({
		url: routeUrl.video,
		method: 'get',
		params,
	})
}
export function bannerApi(params) {
	return axios({
		url: routeUrl.banner,
		method: 'get',
		params,
	})
}
export function menuApi(params) {
	return axios({
		url: routeUrl.menu,
		method: 'get',
		params,
	})
}
export function configApi(params) {
	return axios({
		url: routeUrl.config,
		method: 'get',
		params,
	})
}
export function textConfig(params) {
	return axios({
		url: routeUrl.textConfig,
		method: 'get',
		params,
	})
}

export function userSide(params) {
	return axios({
		url: routeUrl.userSide,
		method: 'get',
		params,
	})
}