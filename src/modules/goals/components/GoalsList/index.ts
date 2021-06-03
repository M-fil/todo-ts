import './styles.scss';
import { GoalEntity } from '../../../../core/interfaces/goal';
import { Component } from '../../../../core/templates/Component';
import { DeleteButton } from '../../../../core/components/common/DeleteButton';
import { StateManager } from '../../../../core/services/state';

export class GoalsList extends Component<HTMLDivElement> {
  private stateManager: StateManager;

  constructor(
    private deleteGoal: (goalId: string) => void,
  ) {
    super('div', 'goals-list');
    this.stateManager = new StateManager();
  }

  private renderGoalItem(id: string, name: string): void {
    const goalItem = document.createElement('div');
    goalItem.className = 'goals-item';
    const textHTML = document.createElement('div');
    textHTML.innerText = name;
    textHTML.className = 'goals-item__text';
    const deleteButton = new DeleteButton('goals-item__delete-button');
    const deleteButtonHTML = deleteButton.render();
    deleteButtonHTML.dataset.deleteGoalId = id;
    goalItem.append(textHTML, deleteButtonHTML);
    this.container.append(goalItem);
  }

  update(newGoals: GoalEntity[]): void {
    this.container.innerHTML = '';
    newGoals.forEach((goal) => {
      this.renderGoalItem(goal.id, goal.name);
    });
  }

  render(): HTMLDivElement {
    const { goals } = this.stateManager.getState();
    this.update(goals);
    this.setListener('delete-goal', 'click', this.container, (event) => {
      const target = event.target as HTMLDivElement;
      const closesTarget = target.closest('[data-delete-goal-id]') as HTMLDivElement;
      if (closesTarget) {
        const targetId = closesTarget.dataset.deleteGoalId;
        if (targetId) {
          this.deleteGoal(targetId);
        }
      }
    });
    return this.container;
  }
}
