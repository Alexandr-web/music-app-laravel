<div id="alert" class="alert--{{$success ? 'success' : 'error'}}">
	<div class="alert--left">
		@if ($success)
			<x-icon-success />
		@else
			<x-icon-error />
		@endif
		<p class="alert__text">{{ $message }}</p>
	</div>
	<button class="alert__close">
		<x-icon-close />
	</button>
</div>