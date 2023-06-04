<template>
	<my-header />
	<my-sidebar />
	<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
		<my-tags></my-tags>
		<div class="content">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive :include="tags.nameList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup>
import { useSidebarStore } from '@/stores/sidebar.js';
import { useTagsStore } from '@/stores/tags.js';
import myHeader from '@/components/Header.vue';
import mySidebar from '@/components/Sidebar.vue';
import myTags from '@/components/Tags.vue';

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
