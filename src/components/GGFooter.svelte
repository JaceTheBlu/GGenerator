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

<div class="bg-primary-color flex justify-between text-tertiary">
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
