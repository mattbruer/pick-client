<script>
	import { goto } from '$app/navigation'
	const data = {
		columns: [
			{ display: 'Title', key: 'title' },
			{ display: 'Key', key: 'key' },
			{ display: 'Created At', key: 'createdAt' },
			{ display: 'Updated At', key: 'updatedAt' }
		],
		rows: [
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. Richard Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 },
			{ title: 'here dude', createdAt: 'tues', key: 'A', updatedAt: 'wed', _id: 1 },
			{ title: 'Mr. dick Smoker', createdAt: 'friday', key: 'Bb', updatedAt: 'thurs', _id: 2 }
		]
	}
</script>

<!-- <div
	class="pointer-events-none absolute bottom-30 left-0 z-10 h-[70%] w-full bg-gradient-to-b from-transparent to-white"
></div> -->
<div class="table-container overflow-y-auto">
	<table class="table">
		<thead class="sticky top-0">
			<tr class="header-row">
				{#each data.columns as column (column.key)}
					<td>{column.display}</td>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data.rows as song, i (i)}
				<tr on:click={() => goto(`/songs/${song._id}`)}>
					{#each data.columns as column (column.key)}
						<td>{song[column.key]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		box-shadow: 0px 0px 5px black;
		border-radius: 10px;
	}
	.table {
		width: 100%;
	}
	.header-row {
		background-color: var(--primary-color);
		color: white;
	}
	thead {
		font-weight: 900;
		background-color: white;
	}
	td {
		padding: 10px 10px;
		border: 1px solid rgba(191, 190, 190, 0.559);
	}
	tbody tr:hover td {
		background-color: rgb(160, 160, 236);
		color: white;
	}

	tbody tr {
		cursor: pointer;
	}
</style>
