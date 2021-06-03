import './styles.scss';
import { Component } from '../../../../core/templates/Component';

export class ProfileStatistics extends Component<HTMLDivElement> {
  static TextObject = {
    NumberOfTasksText: (counter: number): string => `Количество задач: ${counter}`,
    NumberOfGoalsText: (counter: number): string => `Количество целей: ${counter}`,
  };

  constructor(
    private numberOfTasks: number,
    private numberOfGoals: number,
  ) {
    super('div', 'profile-statistics');
  }

  private renderStatisticsItem(text: string): void {
    const statisticsItem = document.createElement('div');
    statisticsItem.className = 'profile-statistics__item';
    statisticsItem.innerText = text;
    this.container.append(statisticsItem);
  }

  render(): HTMLDivElement {
    const { NumberOfTasksText, NumberOfGoalsText } = ProfileStatistics.TextObject;
    this.renderStatisticsItem(NumberOfTasksText(this.numberOfTasks));
    this.renderStatisticsItem(NumberOfGoalsText(this.numberOfGoals));
    return this.container;
  }
}
