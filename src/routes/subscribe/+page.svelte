<script>
	import BasicPlan from './components/BasicPlan.svelte'

	// TODO DRY IMPORTS
	import LifeTimeOption from './components/LifeTimeOption.svelte'
	import MonthlyOption from './components/MonthlyOption.svelte'
	import ProPlan from './components/ProPlan.svelte'
	import YearlyOption from './components/YearlyOption.svelte'
</script>

<div class=" outer flex w-screen items-center justify-center">
	<div class="flex flex-wrap items-center justify-center">
		<!-- <LifeTimeOption />
		<YearlyOption />
		<MonthlyOption /> -->
		<ProPlan />
		<BasicPlan />
	</div>
</div>

<style>
	.outer {
		height: inherit;
	}
</style>
