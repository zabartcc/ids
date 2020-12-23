<template>
	<div class="home">
		<div class="login_container">
			<div class="top_text">
				<img alt="ZAB logo" :src="require('@/assets/images/icons/zab_icon_new.png')" class="login_logo">
				<p class="title">Albuquerque ARTCC - Information Display System</p>
				<p class="description">
					Welcome to the ZAB Information Display System (IDS). <br /><br />
					This program provides a platform that shows information useful when controlling and gives you the ability to ease communications and coordination with other controllers. <br /><br />
					Please login through VATUSA to continue.
				</p>
			</div>
			<div class="row">
				<div class="col s12">
					<button class="btn waves-effect login_button" @click="processLogin">Login with SSO</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	methods: {
		async processLogin() {
			//window.location.href = `https://login.vatusa.net/uls/v2/login?fac=ZAB&url=${process.env.VUE_APP_ULS_LOGIN_REDIRECT_URL || 2}`;
			//window.location.href = 'app://./home';
		}
	}
}
</script>

<style scoped lang="scss">
.home {
	width: 100%;
}

.login_logo {
	height: 150px;
	display: block;
	width: auto;
	margin: auto;
}

.login_container {
	background-color: #212121;
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	width: 600px;
	margin: auto;
	margin-top: 50px;
	padding: 1em;

	.login_button {
		display: block;
		margin-top: 30px;
		background-color: #D64437;
		margin-left: auto;
		margin-right: auto;
	}
}

.top_text {
	.title {
		font-size: 1.4em;
		font-weight: 600;
		text-align: center;
	}

	.description {
		width: 70%;
		word-break: break-word;
		margin: auto;
		line-height: 1.3rem;
	}
}
</style>