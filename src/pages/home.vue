<template>
	<div class="clearfix" style="min-width: 1200px;">
		<div class="left-menu">
			<v-menu :collapse="isCollapse" @menuClk="addTab"></v-menu>
		</div>
		<div class="content">
			<div class="header">
				<ul class="header_left">
					<li>
						<svg @click="expandClick" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" class="hamburger" :class="{'is-active':!isCollapse}">
							<path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"></path>
							<path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"></path>
							<path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"></path>
						</svg>
					</li>
					<li>
						<el-breadcrumb separator="/">
							<el-breadcrumb-item>
								<a @click="goWelcome">工作台</a>
							</el-breadcrumb-item>
							<el-breadcrumb-item v-for="(item,index) in breadcrumbs" v-if="item!='工作台'" :key="index">{{item}}</el-breadcrumb-item>
						</el-breadcrumb>
					</li>
				</ul>
				<ul class="header_right">
					<li>
						<el-dropdown trigger="click" class="el-dropdown-link" @command="handleCommand">
							<span>
								{{managerName}}
                			</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="loginout">退 出</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</li>
				</ul>
			</div>
			<div class="header_nav">
				<el-tabs v-model="currTabIndex" type="border-card" closable @tab-remove="removeTab" @tab-click="tabChange">
					<el-tab-pane v-for="(item, index) in tablist" :key="item.index" :label="item.title" :name="item.index">
					</el-tab-pane>
				</el-tabs>
			</div>
			<div class="main_content">
				<transition name="move" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>
		<div style="text-align: center;font-size: 16px;line-height: 5vh;">Power By WYC</div>
	</div>
</template>

<script>
	import vMenu from '@/components/common/menu'
	import account from '@/service/account'
	import manager from '@/service/manager'
	export default {
		components: {
			vMenu
		},
		data() {
			return {
				isCollapse: false,
				currTabIndex: '',
				breadcrumbs:[],
				tablist: [],
				managerName:"",
          		company:{},
          		interval: ''
			}
		},
		methods: {
			goWelcome(){
				let item={
						icon: 'el-icon-ysb-welcome',
						index: '/welcome',
						title: '工作台'
				};
				var param={
					item:item,
					index:'/admin/welcome',
					breadcrumbs:['工作台']
				}
				this.addTab(param);
			},
			tabChange(item){
				this.tablist.find(curr=>{
					if(curr.name==item.name){
						this.breadcrumbs=curr.breadcrumbs;
						return false;
					}
				})
				this.$router.push(item.name);
			},
			addTab(param) {
				var mItem=param.item;
				var index=param.index;
				var breadcrumbs=param.breadcrumbs;
				let hasItem = false;
				this.tablist.find(item => {
					if(item.index == index) {
						hasItem = true;
						return;
					}
				})
				if(!hasItem) { //菜单项第一次添加
					this.tablist.push({
						title: mItem.title,
						index: index,
						name: index,
						breadcrumbs:breadcrumbs
					})
					
				} 
				this.currTabIndex=index;
				this.breadcrumbs=breadcrumbs;
				this.$router.push(index);
			},
			removeTab(targetName) {
				let tabs = this.tablist;
				let activeName = this.currTabIndex;
				let breadcrumbs=[];
				let path='';
				if(activeName === targetName) {
					tabs.forEach((tab, index) => {
						if(tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if(nextTab) {
								activeName = nextTab.name;
								breadcrumbs= nextTab.breadcrumbs;
								path=nextTab.index;
							}
						}
					});
				}
				this.currTabIndex = activeName;
				this.breadcrumbs=breadcrumbs;
				this.tablist = tabs.filter(tab => tab.name !== targetName);
				if(path!=''){
					this.$router.push(path);
				}else{
					this.goWelcome();
				}
				
			},
			handleCommand(command) {
				if(command == 'loginout') {
					this.$router.push('/login');
				}
			},
			expandClick() {
				this.isCollapse = !this.isCollapse;
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleCommand(command) {
				if(command == 'loginout') {
					this.$router.push('/login');
				}
			},
			refreshToken() {//刷新token
				var user = JSON.parse(localStorage.getItem(this.cont.LOCAL_MANAGER_KEY));
				account.refreshToken(user.userName, user.token, user.refreshToken).then(res => {
					if(res.data.status == this.cont.HTTP_SUCCESS) {
						let token = res.data.data.token;
						let refreshToken = res.data.data.refreshToken;
						user.token = token;
						user.refreshToken = refreshToken;
						localStorage.setItem(this.cont.LOCAL_MANAGER_KEY, JSON.stringify(user));
						console.log("refreshToken已经刷新！！！")
					} else {
						this.msg.fail("登录超时");
						this.$router.push('/login');
					}
				}).catch(err => {
					this.msg.fail("登录超时");
					this.$router.push('/login');
				});
			}
		},
		mounted() {
      		var user = JSON.parse(localStorage.getItem(this.cont.LOCAL_MANAGER_KEY));
      		this.managerName=user.realName;
      		//定时刷新token功能
			this.interval = setInterval(this.refreshToken, this.cont.REFRESH_TIME);
			//验证token是否失效
			manager.checkToken().then(res=>{
			});
		},
		beforeDestroy() {
			console.log("stop now!!!");
		//停止token刷新
			clearInterval(this.interval);
		}
	}
</script>


<style>
	@import "../../static/css/home.css"
</style>