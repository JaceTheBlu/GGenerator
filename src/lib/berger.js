import Shepherd from 'shepherd.js';

class Berger {
	constructor(script) {
		this.tour = new Shepherd.Tour({
			useModalOverlay: true,
			defaultStepOptions: {
				classes: 'shepherd-theme-custom',
				scrollTo: false,
				useModalOverlay: true
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
		let htmlString;

		htmlString = "<div class='flex flex-col children:mb-2 last:children:mb-4'>";
		step.text.map((text) => {
			let elem;
			switch (text.substring(0, 1)) {
				case '-':
					elem = `<li class="ml-4"> ${text.slice(1)} </li>`;
					break;

				case '+':
					elem = `<img src='${text.slice(1)}' alt='${text
						.slice(1)
						.split(/images\/|\.png/)}' class="rounded-primary w-auto" />`;
					break;

				default:
					elem = `<p> ${text} </p>`;
					break;
			}

			htmlString += elem;
		});

		let endString = '</div>';
		htmlString += endString;
		return htmlString;
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
			}

			if (index === length - 1) {
				step.buttons = [
					{
						text: 'Back',
						action: this.tour.back,
						secondary: true,
						label: 'Back'
					},
					{
						text: 'Complete',
						action: this.tour.next,
						label: 'Complete'
					}
				];
			}
			this.tour.addStep(step);
		});
	}

	start() {
		this.tour.start();
	}

	// Other custom methods
	complete() {
		this.tour.complete();
	}

	cancel() {
		this.tour.cancel();
	}
}

export default Berger;
