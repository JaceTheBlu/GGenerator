import Shepherd from 'shepherd.js';

class Berger {
  constructor(steps = []) {
    this.tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions:{
            classes: 'shadow-md bg-gradient-to-r from-background-primary-color to-background-secondary-color border-2 rounded-primary min-w-xs max-w-xl px-2 pt-2 pb-2 mb-4',
            scrollTo: false,
        }
    });
    this.steps = steps;
    this.initTour();
  }

  initTour() {
    this.steps.forEach(step => {
      this.tour.addStep(step);
    });
  }

  // Custom preprocessing logic
  preprocessSteps(steps) {
    // Example: Add a default title to each step if not provided
    return steps.map(step => ({
      title: step.title || 'Default Title',
      ...step
    }));
  }

  addSteps(steps) {
    const preprocessedSteps = this.preprocessSteps(steps);
    preprocessedSteps.forEach(step => {
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