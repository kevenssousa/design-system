<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Icon from '../icon/Icon.vue'

interface Props {
	id?: string
	className?: string
	// horizontalPosition: string,
	// verticalPosition: string,
	variant?: string
	duration?: number
	message?: string
	closeable?: boolean
}

interface StateInterface {
	option: Record<string, string>
	timer: ReturnType<typeof setTimeout> | null
	showing: boolean
}

const props = withDefaults(defineProps<Props>(), {
	duration: 2000
})

const closed = ref(false)
const classList = ref<string[]>([])
const state = reactive<StateInterface>({
	option: {},
	showing: false,
	timer: null
})

const close = () => {
	closed.value = true
	state.timer = null
	state.showing = false
	classList.value.push('-leave')
	setTimeout(() => {
		if (props.id) {
			const ele = document.getElementById(props.id)
			if (ele) {
				document.body.removeChild(ele)
			}
		}
	}, 300)
}

if (props.variant) {
	classList.value.push(`-${props.variant}`)
}

onMounted(() => {
	startTimer()
	state.showing = true
})

const startTimer = () => {
	if (props.duration > 0) {
		state.timer = setTimeout(() => {
			if (!closed.value) {
				close()
			}
		}, props.duration)
	}
}
</script>

<template>
	<div class="ui-toast">
		<div class="ui-toast-content" :class="classList">
			<div class="ui-toast-body">
				<div v-html="message"></div>
			</div>
			<span @click="close" class="ui-toast-close" v-if="closeable">
				<Icon class="ui-toast-close-icon" name="close" />
			</span>
		</div>
	</div>
</template>

<style lang="scss">
@import './Toast.scss';
</style>
