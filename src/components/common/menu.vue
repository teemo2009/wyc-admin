<template>
	<div>
		<el-menu :default-active="onRoutes" class="el-menu-vertical" background-color="#324157" text-color="#fff" active-text-color="#20a0ff" :collapse="collapse">
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index">
						<template slot="title"><i :class="item.icon"></i><span slot="title">{{ item.title }}</span></template>
						<el-menu-item v-for="(subItem,i) in item.subs" @click="submenuClick(item,subItem,'/admin'+item.index+subItem.index)" :key="i" :index="'/admin'+item.index+subItem.index">{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="'/admin'+item.index" @click="menuClick(item,'/admin'+item.index)">
						<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import manager from '@/service/manager'
	export default {
		props: {
			collapse: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				perms: [],
				items: [{
					icon: 'el-icon-ysb-welcome',
					index: '/welcome',
					title: '工作台'
				}, {
					icon: 'el-icon-ysb-admin',
					index: '/manager',
					title: '后台管理',
					subs: [{
						index: '/list',
						title: '管理员信息'
					}]
				}]
			}
		},
		methods: {
			isPerms(perm) {
				if(this.perms.indexOf(perm) > -1) {
					return true;
				} else {
					return false;
				}
			},
			menuClick(item, index) {
				let breadcrumbs = [];
				breadcrumbs.push(item.title);
				var param={
					item:item,
					index:index,
					breadcrumbs:breadcrumbs
				}
				this.$emit('menuClk', param);
			},
			submenuClick(item, subItem, index) {
				let breadcrumbs = [];
				breadcrumbs.push(item.title);
				breadcrumbs.push(subItem.title);
				console.log("submenuClick")
				var param={
					item:subItem,
					index:index,
					breadcrumbs:breadcrumbs
				}
				this.$emit('menuClk', param);
			}
		},
		computed: {
			onRoutes() {
				return this.$route.path;
			}
		},
		mounted() {
			let item = {
				icon: 'el-icon-ysb-welcome',
				index: '/welcome',
				title: '工作台'
			};
			var param={
					item:item,
					index:'/admin/welcome',
					breadcrumbs:['工作台']
			}
			this.$emit('menuClk', param);
		}
	}
</script>

<style>
	.el-menu {
		border-right: none;
	}
	
	.el-menu-vertical:not(.el-menu--collapse) {
		width: 200px;
	}
</style>