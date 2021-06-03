import { Page } from '../../core/templates/Page';
import { CreateTaskBlock } from './components/CreateTaskBlock';
import { MainRoutes } from '../../core/constants/routes';
import { TaskEntity } from '../../core/interfaces/task';
import { TasksList } from './components/TasksList';
import { StateManager } from '../../core/services/state';

export class TasksPage extends Page {
  private createTaskBlock: CreateTaskBlock;
  private stateManager: StateManager;
  private tasksList: TasksList;

  constructor(
    protected id: MainRoutes,
  ) {
    super(id);
    this.stateManager = new StateManager();
    const state = this.stateManager.getState();
    this.createTaskBlock = new CreateTaskBlock(
      state.goals,
      this.createNewTask.bind(this),
    );
    this.tasksList = new TasksList(
      this.deleteTask.bind(this),
    );
  }

  private updateTasks(): void {
    const updatedTasks = this.stateManager.getState().tasks;
    this.tasksList.update(updatedTasks);
  }

  createNewTask(text: string, goalId: string): void {
    const { tasks } = this.stateManager.getState();
    const newTask: TaskEntity = {
      id: String(tasks.length),
      text,
      goalId,
      isChecked: false,
    };
    this.stateManager.updateState((prevState) => ({
      ...prevState,
      tasks: [
        ...prevState.tasks,
        newTask,
      ],
    }));
    this.updateTasks();
  }

  deleteTask(taskId: string): void {
    this.stateManager.updateState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
    this.updateTasks();
  }

  render(): HTMLElement {
    this.container.append(this.createTaskBlock.render());
    this.container.append(this.tasksList.render());
    return this.container;
  }
}
