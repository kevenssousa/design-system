<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
	name?: string
	size?: number | string
	type?: 'filled' | 'rounded' | 'outlined' | 'twotone'
	filled?: boolean
}

const props = defineProps<Props>()
const fill = props.filled ? 1 : 0

const style = ref<{
	fontSize?: string
	height?: string
}>({})

if (props.size) {
	style.value.fontSize = `${props.size}px`
	style.value.height = `${props.size}px`
}
</script>

<template>
	<i class="ui-icon material-symbols-rounded icon" :style="style">
		{{ name }}
	</i>
</template>

<style lang="scss">
.material-symbols-rounded {
	font-variation-settings: 'FILL' v-bind(fill), 'wght' 400, 'GRAD' 200, 'opsz' 32;
}

.ui-icon {
	width: auto;
	align-items: center;
	color: inherit;
}
</style>
