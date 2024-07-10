import Shepherd from 'shepherd.js';

class Berger {
	constructor(script) {
		this.tour = new Shepherd.Tour({
			useModalOverlay: true,
			defaultStepOptions: {
				classes: 'shepherd-theme-custom',
				scrollTo: false
			}
		});
		this.script = script;
		this.initTour();
	}

	initTour() {
		this.addSteps(this.script.steps);
		this.start();
	}

	// Custom preprocessing logic
	preprocessSteps(steps) {
		return steps.map((step) => ({
			title: step.title || 'Default Title',
			arrow: true,
			buttons: [
				{
					text: 'Back',
					action: this.tour.back,
					secondary: true,
					label: 'Back'
				},
				{
					text: 'Next',
					action: this.tour.next,
					label: 'Next'
				}
			],
			...step
		}));
	}

	addText(step) {
		const htmlString = step.text
			.map((text) => {
				if (text.startsWith('-')) {
					return `<li class="ml-4">${text.slice(1)}</li>`;
				} else if (text.startsWith('+')) {
					return `<img src='${text.slice(1)}' alt='${text
						.slice(1)
						.split(/images\/|\.png/)}' class="rounded-primary w-auto" />`;
				} else if (text.startsWith('#')) {
					return `<h3 class="text-tertiary-color italic text-tertiary">${text.slice(1)}</h3>`;
				} else {
					return `<p>${text}</p>`;
				}
			})
			.join('');
		return `<div class='flex flex-col children:mb-2 last:children:mb-4'>${htmlString}</div>`;
	}

	addSteps(steps) {
		const length = this.script.steps.length;
		const preprocessedSteps = this.preprocessSteps(steps);
		preprocessedSteps.forEach((step, index) => {
			step.text = this.addText(step);

			if (index === 0) {
				step.buttons = [
					{
						text: 'Skip',
						action: this.tour.cancel,
						secondary: true,
						label: 'Skip'
					},
					{
						text: 'Next',
						action: this.tour.next,
						label: 'Next'
					}
				];
			} else if (index === length - 1) {
				step.buttons = [
					{
						text: 'Back',
						action: this.tour.back,
						secondary: true,
						label: 'Back'
					},
					{
						text: 'Complete!',
						action: this.tour.next,
						label: 'Complete!'
					}
				];
			}
			this.tour.addStep(step);
		});
	}

	start() {
		this.tour.start();
	}

	complete() {
		this.tour.complete();
	}

	cancel() {
		this.tour.cancel();
	}
}

export default Berger;
