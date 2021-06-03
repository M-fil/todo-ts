import './styles.scss';
import { Component } from '../../../templates/Component';

export class NavigationButton extends Component<HTMLAnchorElement> {
  constructor(
    private iconScr: string,
    private routeSrc: string,
    private text: string,
    private id: string,
  ) {
    super('a', 'navigation-button');
    this.iconScr = iconScr;
    this.routeSrc = routeSrc;
    this.text = text;
    this.id = id;
  }

  render(): HTMLAnchorElement {
    this.container.href = `#${this.routeSrc}`;
    this.container.innerText = this.text;
    this.container.dataset.buttonId = this.id;

    if (this.iconScr) {
      const imageHTML = document.createElement('img');
      imageHTML.className = 'navigation-button__icon';
      imageHTML.src = this.iconScr;
      this.container.append(imageHTML);
    }

    return this.container;
  }
}
