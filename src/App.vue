<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

body {
	background-color: #121212;
	font-family: "Lato", sans-serif!important;
	color: #fff;
}

.tooltip-content {
	font-family: "Lucida Console", "Lucida Sans Typewriter", monaco;
	font-size: .9rem;
}

::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	margin-top: 10px;
	background-color: #0F0F0F;
}

::-webkit-scrollbar-track {
	margin-bottom: 28px;
	border-radius: 10px;
	background-color: #121212;
}

::-webkit-scrollbar-thumb {
	background-color: #1E1E1E;
	border-radius: 10px;
}

::-webkit-scrollbar-corner {
	background-color: transparent;
}

.modal, .modal-footer {
	background-color: rgb(30, 30, 30)!important;
	
	.btn-flat {
		color: #fff;
	}
}

.toast_error {
	background: #D54234!important;
}
</style>