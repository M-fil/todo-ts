import './styles.scss';
import { TaskEntity } from '../../../../core/interfaces/task';
import { StateManager } from '../../../../core/services/state';
import { Component } from '../../../../core/templates/Component';
import { TaskItem } from '../TaskItem';

export class TasksList extends Component<HTMLDivElement> {
  private stateManager: StateManager;

  constructor(
    private deleteTask: (taskId: string) => void,
  ) {
    super('div', 'tasks-list');
    this.stateManager = new StateManager();
  }

  update(tasks: TaskEntity[]): void {
    this.container.innerHTML = '';
    tasks.forEach((task) => {
      const {
        id, text, isChecked, goalId,
      } = task;
      const { goals } = this.stateManager.getState();
      const targetGoal = goals.find((item) => item.id === goalId);
      const taskItem = new TaskItem(id, text, isChecked, targetGoal?.name || '');
      this.container.append(taskItem.render());
    });
  }

  render(): HTMLDivElement {
    this.setListener('delete-task', 'click', this.container, (event) => {
      const target = event.target as HTMLDivElement;
      const closesTarget = target.closest('[data-delete-task-id]') as HTMLDivElement;
      if (closesTarget) {
        const targetId = closesTarget.dataset.deleteTaskId;
        if (targetId) {
          this.deleteTask(targetId);
        }
      }
    });
    this.setListener('change-task-completed', 'change', this.container, (event) => {
      const target = event.target as HTMLDivElement;
      const closestTarget = target.closest('[data-task-checkbox]') as HTMLInputElement;
      if (closestTarget) {
        const targetTaskId = closestTarget.dataset.taskCheckbox;
        if (targetTaskId) {
          this.stateManager.updateState((prevState) => ({
            ...prevState,
            tasks: prevState.tasks.map((task) => {
              if (task.id === targetTaskId) {
                return {
                  ...task,
                  isChecked: closestTarget.checked,
                };
              }

              return task;
            }),
          }));
        }
      }
    });
    const { tasks } = this.stateManager.getState();
    this.update(tasks);
    return this.container;
  }
}
