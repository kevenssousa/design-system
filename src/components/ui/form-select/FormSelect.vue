<script setup lang="ts">
import { isObject } from 'lodash-es'
import { ref, watchEffect } from 'vue'
import FormWrapper from '../form-wrapper/FormWrapper.vue'

export interface IFormSelectOptions {
	value: any
	label?: string | null
	disabled?: boolean
}

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
	value?: any
	placeholder?: string
	label?: string
	error?: string
	type?: string
	id?: string
	size?: string | number
	autofocus?: boolean
	readonly?: boolean
	tabindex?: string
	name?: string
	title?: string
	required?: boolean
	options?: Array<IFormSelectOptions>
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	options: () => {
		return []
	}
})

const emit = defineEmits(['update:modelValue', 'update'])

const parseValue = (val: string) => {
	if (/\{/.test(val)) {
		return JSON.parse(val)
	}

	return val
}

const stringifyValue = (val: any) => {
	if (isObject(val)) {
		return JSON.stringify(val)
	}

	return val === null ? '' : val
}

const update = (evt: Event) => {
	const target = evt.target as HTMLSelectElement
	const val = target.value
	emit('update:modelValue', parseValue(val))
	emit('update', parseValue(val))
	model.value = target.value
}

const model = ref(stringifyValue(props.modelValue))
const classList = ref<string[]>([])

if (props.value) {
	model.value = stringifyValue(props.value)
}

watchEffect(() => {
	if (props.value !== undefined) {
		model.value = stringifyValue(props.value)
	} else {
		model.value = stringifyValue(props.modelValue)
	}

	if (props.modelValue === null) {
		model.value = ''
	}
})

if (props.size) {
	classList.value.push(`-${props.size}`)
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
		class="ui-form-select">
		<select
			v-model="model"
			@input="update"
			class="form-control -select"
			:value="stringifyValue(value)"
			:class="classList"
			:autofocus="autofocus"
			:readonly="readonly"
			:tabindex="tabindex"
			:name="name"
			:title="title"
			:id="id"
			:required="required"
			:disabled="disabled">
			<option value selected disabled v-if="placeholder">{{ placeholder }}</option>
			<slot />
			<option
				v-show="options.length"
				v-for="item in options"
				:value="stringifyValue(item.value)"
				:key="item.value"
				:disabled="item.disabled">
				{{ item.label }}
			</option>
		</select>
	</FormWrapper>
</template>

<style lang="scss">
@import './FormSelect.scss';
</style>
