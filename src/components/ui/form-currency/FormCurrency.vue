<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input'
import FormWrapper from '../form-wrapper/FormWrapper.vue'

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
	modelValue?: string | number | null
	label?: string
	placeholder?: any
	tabindex?: string
	inputmode?: string
	size?: string
	id?: string
	pattern?: string
	title?: string
	name?: string
	autocomplete?: string
	min?: string | number
	max?: string | number
	step?: string | number
	minlength?: string | number
	maxlength?: string | number
	autofocus?: boolean
	disabled?: boolean
	required?: boolean
	readonly?: boolean
	pill?: boolean
	options?: Record<string, unknown>
}
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<Props>(), {
	placeholder: '0.00'
})
const classList = ref<string[]>([])
const focused = ref(false)

/* @see https://dm4t2.github.io/vue-currency-input/config.html */
const settings: CurrencyInputOptions = {
	...{
		locale: 'pt-BR',
		currency: 'BRL',
		currencyDisplay: 'symbol',
		hideCurrencySymbolOnFocus: false,
		hideGroupingSeparatorOnFocus: false,
		hideNegligibleDecimalDigitsOnFocus: false,
		autoDecimalDigits: true,
		autoSign: true,
		useGrouping: true,
		accountingSign: false,
		valueRange: {
			min: props.min ?? null,
			max: props.max ?? 999999.99
		}
	},
	...props.options
}

const { inputRef, setValue } = useCurrencyInput(settings)

if (props.pill) {
	classList.value.push('-pill')
}

const init = () => {}

watch(
	() => props.modelValue,
	(newVal: any) => {
		if (!focused.value && newVal) {
			setValue(parseFloat(newVal))
		}
	},
	{ immediate: true }
)

onMounted(init)
</script>

<template>
	<FormWrapper
		:id="id"
		:leadingIcon="leadingIcon"
		:trailingIcon="trailingIcon"
		:label="label"
		:loading="loading"
		:last="last"
		:disabled="disabled"
		:labelInfo="labelInfo"
		:float="float"
		:state="state"
		:size="size"
		:invalidFeedback="invalidFeedback">
		<input
			:min="min"
			:step="step"
			ref="inputRef"
			class="form-control"
			:placeholder="placeholder"
			@focus="focused = true"
			@blur="focused = false" />
	</FormWrapper>
</template>
