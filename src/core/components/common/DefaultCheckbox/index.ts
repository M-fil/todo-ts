import './styles.scss';
import { Component } from '../../../templates/Component';

export class DefaultCheckbox extends Component<HTMLDivElement> {
  private inputHTML: HTMLInputElement;

  constructor(
    private checkboxId: string,
  ) {
    super('div', 'checkbox');
    this.inputHTML = document.createElement('input');
  }

  renderInputWithLabel(): HTMLDivElement {
    const container = document.createElement('div');
    this.inputHTML.type = 'checkbox';
    this.inputHTML.id = this.checkboxId;
    this.inputHTML.name = 'check';
    this.inputHTML.value = '';

    const label = document.createElement('label');
    label.htmlFor = this.checkboxId;
    const span = document.createElement('span');
    label.append(span);

    container.append(this.inputHTML, label);
    return container;
  }

  public setIsChecked(value: boolean): void {
    this.inputHTML.checked = value;
  }

  public getInput(): HTMLInputElement {
    return this.inputHTML;
  }

  render(): HTMLDivElement {
    this.container.className = 'checkbox';
    const form = document.createElement('form');
    const formWrapper = this.renderInputWithLabel();
    form.append(formWrapper);
    this.container.append(form);

    return this.container;
  }
}
