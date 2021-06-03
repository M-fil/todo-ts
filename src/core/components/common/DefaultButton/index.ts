import './styles.scss';
import { Component } from '../../../templates/Component';

export class Button extends Component<HTMLButtonElement> {
  constructor(
    protected className: string,
    private text: string,
  ) {
    super('button', className);
    this.container.classList.add('default-button');
  }

  render(): HTMLButtonElement {
    this.container.innerText = this.text;
    return this.container;
  }
}
