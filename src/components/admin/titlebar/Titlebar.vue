<script setup lang="ts">
import IconButton from '../../ui/icon-button/IconButton.vue'
import Dropdown from '../../ui/dropdown/Dropdown.vue'
import DropdownItemButton from '../../ui/dropdown/DropdownItemButton.vue'
import Button from '../../ui/button/Button.vue'
import type { IAction } from '../../../types/IAction'

defineProps<{
	title?: string | null
	to?: object
	backlink?: { to: string }
	primaryAction?: IAction
	secondaryActions?: IAction[]
	groupActions?: {
		name: string
		actions: IAction[]
	}
}>()
</script>

<template>
	<div class="titlebar">
		<div class="titlebar-content">
			<div class="titlebar-title --mobile">
				<IconButton v-if="backlink" :to="{ name: backlink.to }" icon="arrow_back" />
				<h2 class="titlebar-text">{{ title }}</h2>
			</div>
			<div v-if="$slots['titlebar-subtitle']" class="titlebar-subtitle">
				<slot name="titlebar-subtitle" />
			</div>
		</div>
		<div class="titlebar-actions">
			<div v-if="secondaryActions?.length" class="titlebar-actions-secondary">
				<Button
					v-if="secondaryActions?.length == 1"
					v-for="item in secondaryActions"
					:class="item.class"
					variant="plain"
					:label="item.label"
					:to="item.to"
					:leading-icon="item.leadingIcon"
					@click="item.onAction" />
				<Dropdown v-else right>
					<template #button-content>
						<Button variant="plain" label="Mais ações" trailingIcon="expand_more" />
					</template>
					<DropdownItemButton
						v-for="item in secondaryActions"
						:label="item.label"
						@click="item.onAction"
						:leading-icon="item.leadingIcon"
						:class="item.class" />
				</Dropdown>
			</div>
			<div v-if="primaryAction" class="titlebar-actions-primary">
				<Button
					variant="primary"
					:to="primaryAction.to"
					:label="primaryAction.label"
					@click="primaryAction.onAction"
					:class="primaryAction.class"
					:leading-icon="primaryAction.leadingIcon" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import './Titlebar.scss';
</style>
