<script setup lang="ts">
import Icon from '../../ui/icon/Icon.vue'

defineProps({
	helperLink: String,
	helperName: String
})
</script>

<template>
	<div class="ui-page-helper">
		<icon name="info" />
		<span class="ui-page-helper-text">
			<b>Precisa de ajuda?</b> Acesse o material sobre
			<b><a :href="helperLink" class="ui-page-helper-name" v-text="helperName" target="_blank" /></b>
		</span>
	</div>
</template>

<style lang="scss">
@import './PageHelper.scss';
</style>
