<div id="alert" class="alert--{{$success ? 'success' : 'error'}}">
	<div class="alert--left">
		@if ($success)
			<x-icon-success />
		@else
			<x-icon-error />
		@endif
		<p class="alert--text">{{ $message }}</p>
	</div>
	<button class="alert--close">
		<x-icon-close />
	</button>
</div>