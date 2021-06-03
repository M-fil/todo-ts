import './styles.scss';
import { Button } from '../../../../core/components/common/DefaultButton';
import { DefaultInputText } from '../../../../core/components/common/DefaultInputText';
import { Component } from '../../../../core/templates/Component';

interface LocalState {
  goalName: string,
}

export class CreateGoalBlock extends Component<HTMLDivElement> {
  protected localState: LocalState;

  static TextObject = {
    InputPlaceholder: 'Введите название цели',
    CreateGoalButtonText: 'Создать',
  };

  constructor(
    private createGoal: (name: string) => void,
  ) {
    super('div', 'create-goal-block');
    this.localState = {
      goalName: '',
    };
  }

  private renderInput(): HTMLInputElement {
    const { InputPlaceholder } = CreateGoalBlock.TextObject;
    const input = new DefaultInputText('create-goal-block__input', InputPlaceholder);
    const inputHTML = input.render();
    this.container.append(inputHTML);
    return inputHTML;
  }

  private renderCreateGoalButton(): HTMLButtonElement {
    const { CreateGoalButtonText } = CreateGoalBlock.TextObject;
    const buttonHTML = new Button('create-task-block__button', CreateGoalButtonText).render();
    this.container.append(buttonHTML);
    return buttonHTML;
  }

  render(): HTMLDivElement {
    const inputHTML = this.renderInput();
    const buttonHTML = this.renderCreateGoalButton();
    this.setListener('goal-value-change', 'change', inputHTML, (event) => {
      const target = event.target as HTMLInputElement;
      this.localState.goalName = target.value || '';
    });
    this.setListener('create-goal', 'click', buttonHTML, () => {
      this.createGoal(this.localState.goalName);
      this.localState.goalName = '';
      inputHTML.value = '';
    });
    return this.container;
  }
}
