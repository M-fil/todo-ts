import './styles.scss';
import { MainRoutes } from '../../core/constants/routes';
import { StateManager } from '../../core/services/state';
import { Page } from '../../core/templates/Page';
import { ProfileAvatar } from './components/ProfileAvatar';
import { ProfileStatistics } from './components/ProfileStatistics';

export class ProfilePage extends Page {
  private profileAvatar: ProfileAvatar;
  private stateManager: StateManager;
  private profileStatistics: ProfileStatistics;

  constructor(
    protected id: MainRoutes,
  ) {
    super(id);
    this.stateManager = new StateManager();
    const { tasks, goals, profile } = this.stateManager.getState();
    this.profileAvatar = new ProfileAvatar(profile.userName);
    this.profileStatistics = new ProfileStatistics(tasks.length, goals.length);
  }

  render(): HTMLElement {
    const profileAvatarHTML = this.profileAvatar.render();
    const profileStatisticsHTML = this.profileStatistics.render();
    const wrapper = document.createElement('div');
    wrapper.className = 'profile-wrapper';
    wrapper.append(profileAvatarHTML, profileStatisticsHTML);
    this.container.append(wrapper);

    return this.container;
  }
}
