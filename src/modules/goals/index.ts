import { MainRoutes } from '../../core/constants/routes';
import { GoalEntity } from '../../core/interfaces/goal';
import { StateManager } from '../../core/services/state';
import { Page } from '../../core/templates/Page';
import { CreateGoalBlock } from './components/CreateGoalBlock';
import { GoalsList } from './components/GoalsList';

export class GoalsPage extends Page {
  private createGoalBlock: CreateGoalBlock;
  private goalsList: GoalsList;
  private stateManager: StateManager;

  constructor(
    protected id: MainRoutes,
  ) {
    super(id);
    this.createGoalBlock = new CreateGoalBlock(this.createGoal.bind(this));
    this.goalsList = new GoalsList(
      this.deleteGoal.bind(this),
    );
    this.stateManager = new StateManager();
  }

  updateGoals(): void {
    const { goals } = this.stateManager.getState();
    this.goalsList.update(goals);
  }

  private createGoal(name: string): void {
    const newGoal: GoalEntity = {
      id: String(Date.now()),
      name,
    };
    this.stateManager.updateState((prevState) => ({
      ...prevState,
      goals: [...prevState.goals, newGoal],
    }));
    this.updateGoals();
  }

  private deleteGoal(goalId: string) {
    this.stateManager.updateState((prevState) => ({
      ...prevState,
      goals: prevState.goals.filter((goal) => goal.id !== goalId),
    }));
    this.updateGoals();
  }

  render(): HTMLElement {
    this.container.append(this.createGoalBlock.render());
    this.container.append(this.goalsList.render());
    return this.container;
  }
}
