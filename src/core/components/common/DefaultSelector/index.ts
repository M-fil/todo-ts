import './styles.scss';
import { Component } from '../../../templates/Component';

export interface OptionEntity {
  text: string,
  value: string,
}

export class DefaultSelector extends Component<HTMLSelectElement> {
  constructor(
    protected className: string,
    private options: OptionEntity[],
    private emptyValue?: string,
  ) {
    super('select', className);
    this.emptyValue = (emptyValue || '') as string;
    this.container.classList.add('default-select');
  }

  private renderOption(text: string, value: string) {
    const option = document.createElement('option');
    option.text = text;
    option.value = value;
    this.container.append(option);
  }

  render(): HTMLSelectElement {
    const selectHTML = document.createElement('select');
    this.container.append(selectHTML);
    this.renderOption(this.emptyValue || '', '');
    this.options.forEach((option) => {
      this.renderOption(option.text, option.value);
    });
    return this.container;
  }
}
