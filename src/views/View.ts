import {Model} from '../models/Model';

export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};

    constructor(public parent: Element, public model: T){
        this.bindModel();
      }

      
    abstract template(): string;

    abstract eventsMap (): {[key:string] : () => void } 
  
    regionsMap = (): { [key: string]: string } => {
        return {}
    }
    
    bindModel = (): void => {
          this.model.on('change', () => {
              this.render();
          })
      }

      bindEvents = (fragment: DocumentFragment) => {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap){
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey])
            });
        }
    }

    mapRegions = (fragment: DocumentFragment): void => {
        const regionsMap = this.regionsMap();

        for(let key in regionsMap) {
            const selector = regionsMap[key];
            this.regions[key] = fragment.querySelector(selector);
        }
    }

    onRender = (): void => {
        
    }

    render(): void {
        this.parent.innerHTML = '';
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);
        this.onRender()
        this.parent.append(templateElement.content);
    }
}