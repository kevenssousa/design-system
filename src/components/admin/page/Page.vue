<script setup lang="ts">
import { ref } from 'vue'
import Titlebar from '../titlebar/Titlebar.vue'
import PageMessageSupport from '../page-message-support/PageMessageSupport.vue'
import PageHelperVideo, { type IVideo } from '../page-helper-video/PageHelperVideo.vue'
import type { IAction } from '../../../types/IAction'

export interface Props {
	hideTitle?: boolean
	primaryAction?: IAction | null
	secondaryActions?: IAction[]
	to?: object
	backlink?: object
	size?: 'sm' | 'md' | 'lg' | 'full'
	videoHelp?: IVideo
	footerHelp?: any
	title?: string | null
	groupActions?: {
		name: string
		actions: IAction[]
	}
}

const props = defineProps<Props>()
const classList = ref<string[]>([])

if (props.size) {
	classList.value.push(`-${props.size}`)
}
</script>

<template>
	<div class="ui-page" :class="classList">
		<Titlebar v-if="!props.hideTitle" :title="title" :to="to" :backlink="backlink" v-bind="props">
			<template #titlebar-subtitle>
				<slot name="titlebar-subtitle" />
			</template>
		</Titlebar>
		<PageHelperVideo v-if="videoHelp" :video="videoHelp" />
		<slot name="default" />
		<PageMessageSupport v-if="footerHelp" :name="footerHelp.name" :link="footerHelp.link" />
	</div>
	<!-- <Advertisings /> -->
</template>

<style lang="scss">
@import './Page.scss';
</style>
