import './styles.scss';
import { Component } from '../../../../core/templates/Component';
import { DeleteButton } from '../../../../core/components/common/DeleteButton';
import { DefaultCheckbox } from '../../../../core/components/common/DefaultCheckbox';

export class TaskItem extends Component<HTMLDivElement> {
  static TextObject = {
    GoalText: (text: string): string => `Цель: ${text}`,
    NoGoalText: 'Без Цели',
  };

  constructor(
    private id: string,
    private text: string,
    private isChecked: boolean,
    private goalName: string,
  ) {
    super('div', 'task-item');
    this.id = id;
    this.text = text;
    this.isChecked = isChecked;
    this.goalName = goalName;
  }

  renderGoalContainer(): void {
    const { GoalText, NoGoalText } = TaskItem.TextObject;
    const goalsContainer = document.createElement('div');
    goalsContainer.innerText = GoalText(this.goalName || NoGoalText);
    this.container.append(goalsContainer);
  }

  render(): HTMLDivElement {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'task-item__main-container';
    const checkbox = new DefaultCheckbox(this.id);
    checkbox.getInput().dataset.taskCheckbox = this.id;
    const checkboxHTML = checkbox.render();
    checkbox.setIsChecked(this.isChecked);
    const textHTML = document.createElement('span');
    textHTML.className = 'task-item__text';
    textHTML.innerText = this.text;
    const deleteButton = new DeleteButton('task-item__delete-button');
    const deleteButtonHTML = deleteButton.render();
    deleteButtonHTML.dataset.deleteTaskId = this.id;
    mainContainer.append(checkboxHTML, textHTML, deleteButtonHTML);

    this.container.append(mainContainer);
    this.renderGoalContainer();

    return this.container;
  }
}
