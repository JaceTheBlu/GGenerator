import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
class Berger {


  constructor(script) {
    this.tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions:{
            classes: 'shepherd-theme-custom',
          scrollTo: false,
          useModalOverlay : true
        },        
      },

  );
    this.script = script;
    this.steps = script.steps;
    this.prefix = this.script.idPrefix;
    this.initTour();
  }

  initTour() {
    this.addSteps(this.steps);
    this.start();
  }


  // Custom preprocessing logic
  preprocessSteps(steps) {
    return steps.map((step) => ({
      title: step.title || 'Default Title',
      arrow: true,
      buttons:[
        		{
        			text: 'Back',
        			action: this.tour.back,
        			classes:'border-2 rounded-primary px-2 hover:bg-cancel-color transition duration-300 ease out py-1 mr-2 mt-2',
        			label: 'Back'
        		},
        		{
        			text:'Next',
        			action: this.tour.next,
        			classes:'border-2 rounded-primary px-2 hover:bg-validate-color transition duration-300 ease out py-1 mr-2 mt-2',
        			label:'Next'
    
        		}
        	],
      ...step
    }));
  }

  addSteps(steps) {
    const length = this.steps.length;
    const preprocessedSteps = this.preprocessSteps(steps);
    preprocessedSteps.forEach((step, index) => {
      if(index ===0){
        step.buttons = [
          {
            text:'Exit',
            action: this.tour.cancel,
            label:'Exit'
          },
          {
            text: 'Next',
            action: this.tour.next,
            label: 'Next'
          }
        ]
      }

      if(index === length-1 ){
        step.buttons = [
          {
            text:'Back',
            action: this.tour.back,
            label:'Back'
          },
          {
            text: 'Complete',
            action: this.tour.next,
            label: 'Complete'
          }
        ]
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