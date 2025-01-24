<script setup lang="ts">
import { ref } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'
import { maska } from 'maska'
import Icon from '../icon/Icon.vue'
import Button from '../button/Button.vue'
import type { IAction } from '../../../types/IAction'

export interface Props {
	leadingIcon?: string
	trailingIcon?: string
	labelInfo?: string
	trailingText?: string
	state?: undefined
	coutable?: boolean
	loading?: boolean
	last?: boolean
	float?: boolean
	invalidFeedback?: string
	//
	modelValue?: any
	label?: string
	id?: string
	placeholder?: string
	step?: string | number
	tabindex?: string
	inputmode?: 'text' | 'search' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal'
	size?: string
	pattern?: string
	title?: string
	name?: string
	pill?: boolean
	clearable?: boolean
	autocomplete?: string
	minlength?: string | number
	maxlength?: string | number
	autofocus?: boolean
	disabled?: boolean
	required?: boolean
	readonly?: boolean
	type?: string
	mask?: string | string[] | object | null
	raw?: any
	actions?: IAction[]
	max?: string | number
	min?: string | number
}

const props = defineProps<Props>()
const vMaska = maska

const emit = defineEmits<{
	(e: 'update:modelValue', val: string | null): void
	(e: 'update', val: any): void
	(e: 'focus', event: Event): void
	(e: 'blur', event: Event): void
	(e: 'keydown', event: Event): void
	(e: 'keydownEnter', event: Event): void
	(e: 'clear'): void
	(e: 'updateRaw', val: any): void
}>()

const classList = ref<string[]>([])

const update = (evt: Event) => {
	if (!props.mask) {
	}
	const target = evt.target as HTMLInputElement
	const val = target.value
	emit('update:modelValue', val)
	emit('update', val)
}

const maskRawValue = (evt: Event) => {
	const target = evt.target as HTMLInputElement
	const val = target.dataset.maskRawValue as string
	emit('updateRaw', val)
}

if (props.pill) {
	classList.value.push('-pill')
}

if (props.size) {
	classList.value.push(`-${props.size}`)
}

const onFocus = (event: Event) => {
	emit('focus', event)
}

const onBlur = (event: Event) => {
	emit('blur', event)
}

const onKeydown = (event: Event) => {
	emit('keydown', event)
}

const onEnter = (event: Event) => {
	emit('keydownEnter', event)
}

const onClear = () => {
	emit('clear')
	emit('update:modelValue', null)
	emit('update', null)
}
</script>

<template>
	<FormWrapper
		:id="id"
		:leadingIcon="leadingIcon"
		:trailingIcon="trailingIcon"
		:trailingText="trailingText"
		:label="label"
		:coutable="coutable"
		:loading="loading"
		:last="last"
		:disabled="disabled"
		:float="float"
		:state="state"
		:labelInfo="labelInfo"
		:autofocus="autofocus"
		:size="size"
		:invalidFeedback="invalidFeedback"
		class="ui-form-textfield">
		<slot name="before" />
		<input
			v-maska="mask"
			class="form-control"
			@input="update"
			@focus="onFocus"
			@blur="onBlur"
			@keydown="onKeydown"
			@keydown.enter="onEnter"
			@maska="maskRawValue"
			:type="type"
			:step="step"
			:value="modelValue"
			:class="classList"
			:inputmode="inputmode"
			:autocomplete="autocomplete"
			:disabled="disabled"
			:minlength="minlength"
			:maxlength="maxlength"
			:pattern="pattern"
			:autofocus="autofocus"
			:placeholder="!float ? placeholder : ''"
			:readonly="readonly"
			:tabindex="tabindex"
			:name="name"
			:title="title"
			:id="id"
			:max="max"
			:min="min"
			:required="required" />
		<slot name="after" />
		<div v-if="clearable && modelValue?.length" class="close" @click="onClear">
			<Icon name="cancel" filled />
		</div>
		<template #append v-if="$slots.append || actions">
			<div v-if="actions" class="actions">
				<Button
					v-for="item in actions"
					:variant="item.variant"
					:type="item.type"
					:label="item.label"
					:leadingIcon="item.leadingIcon"
					@click="item.onAction" />
			</div>
			<slot name="append" />
		</template>
	</FormWrapper>
</template>
