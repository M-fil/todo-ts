import { GoalEntity } from './goal';
import { TaskEntity } from './task';

export interface State {
  tasks: TaskEntity[],
  goals: GoalEntity[],
  profile: {
    userName: string,
  },
}
