<script>
	import { onMount } from 'svelte';

	let emoji = '❤️';
	onMount(() => {
		const listOfHeart = [
			'💘',
			'💝',
			'💖',
			'💗',
			'💓',
			'💞',
			'💕',
			'💟',
			'❣️',
			'❤️‍🔥',
			'❤️‍🩹',
			'🩷',
			'🧡',
			'💛',
			'💚',
			'💙',
			'🩵',
			'💜',
			'🤎',
			'🖤',
			'🩶',
			'🤍',
			'🫶',
			'🫀',
			'💕'
		];

		const listOfAlan = ['🍦', '🚐', '🛻', '🛣️', '🛞', '📦'];
		const saved_emoji = localStorage.getItem('emoji');
		if (saved_emoji) {
			emoji = saved_emoji;
		} else {
			emoji =
				listOfHeart[Math.floor(Math.random() * (listOfHeart.length + 1))] ||
				listOfAlan[Math.floor(Math.random() * listOfAlan.length)];
			localStorage.setItem('emoji', emoji);
		}
	});
</script>

<div class="bg-primary-color flex justify-between text-tertiary not-selectable">
	<div class="flex divide-x divide-solid py-2">
		<a
			class="flex items-center text-tertiary px-2 hover:scale-110 duration-300 transition-all"
			href="https://github.com/JaceTheBlu/GGenerator"
			aria-label="Follow @JaceTheBlu on GitHub"
			target="_blank"
		>
			<img src="github.png" alt="GitHub Logo" class="w-6" />
		</a>
		<div class="flex px-2">
			Made with
			<button class="cursor-default text-l hover:scale-150 transition duration-300">
				{emoji}
			</button>
			in 2024
		</div>
	</div>
	<div>
		<a
			href="https://forms.gle/ZpG76iQtqsSGXJ2KA"
			target="_blank"
			class="flex px-2
				bg-gradient-to-r
				text-primary
				mt-1
				from-background-secondary-color
				to-background-primary-color
				border-secondary-width
				rounded-primary
				transition duration-300 ease-out
				hover:shadow-black
				hover:shadow-md
				hover:scale-110
				items-center
				"
			>Send Feedback 🫰
		</a>
	</div>
	<div class="flex items-right py-2 divide-x divide-solid children:px-2">
		<a
			class="flex items-center"
			href="https://github.com/JaceTheBlu"
			aria-label="Follow @JaceTheBlu on GitHub"
			target="_blank"
		>
			<img src="github.png" alt="GitHub Logo" class="w-6 mr-2" />
			<p>@JaceTheBlu🧙‍♂️</p>
		</a>
		<a
			class="flex items-center"
			href="https://github.com/aVadeleau"
			aria-label="Follow @aVadeleau on GitHub"
			target="_blank"
		>
			<img src="github.png" alt="GitHub Logo" class="w-6 mr-2" />
			<p>@aVadeleau🎢</p>
		</a>
	</div>
</div>
