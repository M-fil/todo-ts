import './styles.scss';
import { Component } from '../../../templates/Component';

export class DefaultInputText extends Component<HTMLInputElement> {
  constructor(
    protected className: string,
    private placeholder: string,
  ) {
    super('input', className);
    this.container.classList.add('default-text-input');
  }

  render(): HTMLInputElement {
    this.container.type = 'text';
    this.container.placeholder = this.placeholder;
    return this.container;
  }
}
