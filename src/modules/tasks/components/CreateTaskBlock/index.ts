import './styles.scss';
import { GoalEntity } from '../../../../core/interfaces/goal';
import { Component } from '../../../../core/templates/Component';
import { DefaultInputText } from '../../../../core/components/common/DefaultInputText';
import { Button } from '../../../../core/components/common/DefaultButton';
import { DefaultSelector, OptionEntity } from '../../../../core/components/common/DefaultSelector';

interface LocalState {
  name: string,
  goal: string,
}

export class CreateTaskBlock extends Component<HTMLDivElement, LocalState> {
  protected localState: LocalState;

  static TextObject = {
    Placeholder: 'Создайте новую задачу',
    CreateButtonText: 'Создать',
    SelectGoalPlaceholder: 'Выберите Цель',
    EmptyGoalValue: '---',
  };

  constructor(
    private goals: GoalEntity[],
    private createNewTask: (text: string, goalId: string) => void,
  ) {
    super('div', 'create-task-block');
    this.localState = {
      name: '',
      goal: '',
    };
  }

  renderInput(): HTMLInputElement {
    const { Placeholder } = CreateTaskBlock.TextObject;
    const input = new DefaultInputText('create-task-block__input', Placeholder);
    const inputHTML = input.render();
    this.container.append(inputHTML);
    return inputHTML;
  }

  renderCreateButton(): HTMLButtonElement {
    const { CreateButtonText } = CreateTaskBlock.TextObject;
    const buttonHTML = new Button('create-task-block__button', CreateButtonText).render();
    this.container.append(buttonHTML);
    return buttonHTML;
  }

  renderSelectGoalButton(): HTMLSelectElement {
    const { EmptyGoalValue } = CreateTaskBlock.TextObject;
    const options: OptionEntity[] = this.goals.map((goal) => ({
      text: goal.name,
      value: goal.id,
    }));
    const defaultSelector = new DefaultSelector(
      'create-task-block__goal-selector',
      options,
      EmptyGoalValue,
    );
    const defaultSelectorHTML = defaultSelector.render();
    this.container.append(defaultSelectorHTML);
    return defaultSelectorHTML;
  }

  render(): HTMLDivElement {
    const inputHTML = this.renderInput();
    const selectHTML = this.renderSelectGoalButton();
    const buttonHTML = this.renderCreateButton();
    this.setListener('task-text-change', 'change', inputHTML, (event) => {
      const target = event.target as HTMLInputElement;
      this.localState.name = target.value;
    });
    this.setListener('create-task', 'click', buttonHTML, () => {
      let { name } = this.localState;
      const { goal } = this.localState;
      if (name) {
        this.createNewTask(name, goal);
      }
      name = '';
      inputHTML.value = '';
    });
    this.setListener('select-goal', 'change', selectHTML, (event) => {
      const target = event.target as HTMLSelectElement;
      const goalId = target.value;
      this.localState.goal = goalId;
    });
    return this.container;
  }
}
