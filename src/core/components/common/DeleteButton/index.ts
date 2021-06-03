import './styles.scss';
import { Component } from '../../../templates/Component';
import { Button } from '../DefaultButton';

export class DeleteButton extends Component<HTMLButtonElement> {
  private button: Button;

  constructor(
    protected className: string,
    private deleteIconPath: string = './assets/tasks/trash.svg',
  ) {
    super('button', className);
    this.button = new Button(className, '');
  }

  renderButtonIcon(): void {
    const icon = document.createElement('img');
    icon.className = 'delete-button__icon';
    icon.src = this.deleteIconPath;
    this.container.append(icon);
  }

  render(): HTMLButtonElement {
    this.container = this.button.render();
    this.container.classList.add('delete-button');
    this.renderButtonIcon();
    return this.container;
  }
}
