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


  addText(step){
    let htmlString;

    console.log("title :",step.title," :",step.image);
    if(step.image!== undefined){
      htmlString = "<div class='flex flex-col'>";
      
      for(let i=0; i<step.text.length-1;i++){
        let text= `<p> ${step.text[i]} </p>`;
        htmlString+= text;
      }        

      let alt = step.image.split(/images\/|\.png/);
      let image = `<img src='${step.image}' alt='${alt}' />`;
      htmlString+= image;

      let lastText= `<p> ${step.text[step.text.length-1]} </p>`;
        htmlString+= lastText;

      let endString = "</div>";
      htmlString +=endString;
           


    }else{
      htmlString = "<div class='flex flex-col children:pb-2'>";
      
    
      step.text.forEach((t)=>{
        let text = `<p> ${t}</p>`;
        console.log(text);
        htmlString += text; 
      });

      let endString = "</div>";
      htmlString +=endString;

    }


    console.log("html :",htmlString);
    return htmlString;

  }

  addSteps(steps) {
    const length = this.steps.length;
    const preprocessedSteps = this.preprocessSteps(steps);
    preprocessedSteps.forEach((step, index) => {

      step.text = this.addText(step);
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