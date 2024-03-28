<template>
	<view class="login">
		<view class="loginWrap">
			<view class="loginL">
				<img class="loginBg" :src="loginBg" alt="" />
				<view class="slogan">
					<view class="">
						TOBE 让留学没有信息差
					</view>
					<view class="">
						真正让留学进入个人GIY时代
					</view>
					<view class="">
						未来已来
					</view>
				</view>
			</view>
			<view class="loginR">
				<view v-show="displayFlag==1" class="loginIn common">
					<view class="formWrap">
						<view class="row1">登录</view>
						<view class="row2">免费登录到您的TOBE留学账号</view>
						<el-form :model="loginForm" :rules="rulesLogin" ref="loginFormRef">
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="loginForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="验证码" prop="validCode"  v-if="isValidCodeLogin">
								<view class="validCodeWrap">
									<el-input class="validCode" v-model="loginForm.validCode"></el-input>
									<el-button key="1" @click="getCode" v-if="codeDisRegister">发送</el-button>
									<el-button key="2" v-else disabled>重新发送{{ codeInfoRegister }}s</el-button>
								</view>
							</el-form-item>
							<el-form-item label="密码" prop="password" v-else>
								<el-input type="password" v-model="loginForm.password"></el-input>
							</el-form-item>
							<el-form-item>
								<view class="forgetPas">
									<span @click="toggle(2)">忘记密码</span>
									<span @click="toggle(4)" class="linkColor">{{isValidCodeLogin?'密码登录':'验证码登录'}}</span>
								</view>
							</el-form-item>
							<el-form-item>
								<view class="loginBtn" @click="submitForm('loginFormRef')">登录</view>
							</el-form-item>
							<view class="tip">
								<span>还没有账户？</span><span @click="toggle(3)" class="linkColor">点击注册</span>
							</view>
						</el-form>
					</view>
				</view>
				<view v-show="displayFlag==2" class="forgetPass common">
					<view class="formWrap">
						<view class="row1">忘记密码</view>
						<view class="row2">找回您的TOBE留学账号密码</view>
						<el-form :model="forgetForm" :rules="rulesForget" ref="forgetFormRef">
							<el-form-item label="手机号码" prop="phone">
								<el-input v-model="forgetForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input type="password" v-model="forgetForm.password"></el-input>
							</el-form-item>
							<el-form-item label="重复密码" prop="rePassword">
								<el-input v-model="forgetForm.rePassword" placeholder="请重复输入" type="password"></el-input>
							</el-form-item>
							<el-form-item label="验证码" prop="validCode">
								<view class="validCodeWrap">
									<el-input class="validCode" v-model="forgetForm.validCode"></el-input>
									<el-button key="1" @click="getCode" v-if="codeDisRegister">发送</el-button>
									<el-button key="2" v-else disabled>重新发送{{ codeInfoRegister }}s</el-button>
								</view>
							</el-form-item>
							<el-form-item>
								<view class="loginBtn" @click="submitForm('forgetFormRef')">提交</view>
							</el-form-item>
						</el-form>
						<view class="tip">
							<span @click="toggle(1)" class="linkColor">点击登录</span>
						</view>
					</view>
				</view>
				<view v-show="displayFlag==3" class="signup common">
					<view class="formWrap">
						<view class="row1">创建账户</view>
						<view class="row2">创建您的TOBE留学账号</view>
						<el-form :model="registerForm" :rules="rulesRegister" ref="registerFormRef">
							<el-row type="flex" justify="space-between">
								<el-col :span="11">
									<el-form-item label="昵称" prop="nickName">
										<el-input v-model="registerForm.nickName"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="11">
									<el-form-item label="姓名" prop="name">
										<el-input v-model="registerForm.name"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item label="手机号码" prop="phone">
								<el-input v-model="registerForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input type="password" v-model="registerForm.password"></el-input>
							</el-form-item>
							<el-form-item label="重复密码" prop="rePassword">
								<el-input v-model="registerForm.rePassword" placeholder="请重复输入" type="password"></el-input>
							</el-form-item>

							<el-form-item label="验证码" prop="validCode">
								<view class="validCodeWrap">
									<el-input class="validCode" v-model="registerForm.validCode"></el-input>
									<el-button key="1" @click="getCode" v-if="codeDisRegister">发送</el-button>
									<el-button key="2" v-else disabled>重新发送{{ codeInfoRegister }}s</el-button>
								</view>
							</el-form-item>
							<el-form-item label="邀请码">
								<el-input v-model="registerForm.inviteCode"></el-input>
							</el-form-item>
							<el-form-item>
								<view class="loginBtn" @click="submitForm('registerFormRef')">注册</view>
							</el-form-item>
							<view class="tip">
								<span>已有账户？</span><span @click="toggle(1)" class="linkColor">点击登录</span>
							</view>
						</el-form>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loginBg from '@image/loginBg.png'
	export default {
		name: 'login',
		data() {
			let validatePhone = (rule, value, callback) => {
				let patt = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
				if (!patt.test(value)) {
					this.phoneregisRight = false;
					callback(new Error("手机格式不正确!"));
				} else {
					this.phoneregisRight = true;
					callback();
				}
			};
			let validatePass = (rule, value, callback) => {
				if (value !== this.registerForm.password) {
					callback(new Error("两次输入密码不一致"));
				} else {
					callback();
				}
			};
			let validatePassForget = (rule, value, callback) => {
				if (value !== this.forgetForm.password) {
					callback(new Error("两次输入密码不一致"));
				} else {
					callback();
				}
			};

			return {
				isValidCodeLogin:false,
				displayFlag: 1, //1登录 2 忘记密码 3 注册 4 验证码登录
				phoneregisRight: false, // 标记手机号是否正确
				codeInfoRegister: 60,
				timerRegister: null,
				codeDisRegister: true,
				loginBg,
				loginForm: {
					phone: '',
					password: '',
					validCode:'',
				},
				forgetForm: {
					phone: '',
					password: '',
					rePassword: '',
					validCode: '',
				},
				registerForm: {
					nickName: '',
					name: '',
					phone: '',
					password: '',
					rePassword: '',
					validCode: '',
					inviteCode: '',
				},
				rulesForget: {
					phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}, {
						validator: validatePhone,
						trigger: "blur"
					}, ],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							message: "长度应大于6个字符",
							trigger: "blur"
						},
					],
					rePassword: [{
							validator: validatePassForget,
							trigger: "blur"
						},
						{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							message: "长度应大于6个字符",
							trigger: "blur"
						},
					],
					validCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}, ]
				},
				rulesRegister: {
					nickName: [{
						required: true,
						message: '请输入昵称',
						trigger: 'blur'
					}, ],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}, ],
					phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}, {
						validator: validatePhone,
						trigger: "blur"
					}, ],
					password: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							message: "长度应大于6个字符",
							trigger: "blur"
						},
					],
					rePassword: [{
							validator: validatePass,
							trigger: "blur"
						},
						{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 6,
							message: "长度应大于6个字符",
							trigger: "blur"
						},
					],
					validCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}, ]
				},
				rulesLogin: {
					phone: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}, ],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, ],
					validCode: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					},],
				},
			}
		},
		methods: {
			async getCode() {
				if (!this.phoneregisRight || this.registerForm.phone == '') return;
				const TimeCount = 59;
				if (!this.timerRegister) {
					this.codeDisRegister = false;
					this.codeInfoRegister = TimeCount;
					this.timerRegister = setInterval(() => {
						if (this.codeInfoRegister > 0 && this.codeInfoRegister <= TimeCount) {
							this.codeInfoRegister--;
						} else {
							this.codeDisRegister = true;
							clearInterval(this.timerRegister);
							this.timerRegister = null;
						}
					}, 1000);
					// await this.$axios.post(this.$httpUrl.smsCode, {
					// 	phone: this.addForm.name,
					// 	smsType: 1,
					// });
					this.$notify({
						title: '成功',
						message: '短信发送成功',
						type: 'success'
					});
				}
			},

			toggle(type) {
				let nowType = this.displayFlag;
				if (nowType == 1) {
					this.$refs.loginFormRef.resetFields();
				} else if (nowType == 2) {
					this.$refs.forgetFormRef.resetFields();
				} else if (nowType == 3) {
					this.$refs.registerFormRef.resetFields();
				} 
				this.$nextTick(() => {
					if(type==4){
						this.isValidCodeLogin = !this.isValidCodeLogin;
					}else{
					this.displayFlag = type;
					}
				})

			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/styles/minix.scss";

	.login {
		.loginWrap {
			@include fj();
			height: calc(100vh - 92px);
			min-width: 1400px;

			.el-form-item {
				@include mb(6px);
			}

			.loginR {
				width: 50%;
				height: 100%;
				position: relative;

				.common {
					.formWrap {
						.forgetPas {
							text-align: right;
							cursor: pointer;

							.linkColor {
								color: $linkColor;
								@include ml(10px);
							}
						}

						.validCodeWrap {
							@include fj();
							width: 100%;

							.validCode {
								width: 80%;
								@include mr(10px);
							}
						}

						.tip {
							@include mt(20px);

							.linkColor {
								color: $linkColor;
								cursor: pointer;
							}
						}

						.loginBtn {
							width: 100%;
							height: 40px;
							color: #fff;
							background: #000;
							border-radius: 6px;
							text-align: center;
							@include mt(20px);
							cursor: pointer;
						}

						width: 400px;
						@include center;

						.row1 {
							font-size: 30px;
							font-weight: 700;
							@include mb(14px);
						}

						.row2 {
							font-size: 24px;
							@include mb(20px);
						}
					}

				}

			}

			.loginL {
				width: 50%;
				height: 100%;
				position: relative;
				overflow: hidden;

				.slogan {
					@include center;
					font-size: 34px;
					font-weight: 700;
					line-height: 50px;
					color: #fff;
				}

				.loginBg {
					position: absolute;
					left: 0;
					top: 0;
					z-index: -1;
				}
			}
		}
	}
</style>