import './styles.scss';
import { MainRoutes } from '../../constants/routes';
import { Component } from '../../templates/Component';
import { NavigationButton } from '../common/NavigationButton';
import { Router } from '../../services/router';

export class Navigation extends Component<HTMLDivElement> {
  static Buttons = [
    {
      id: '1',
      text: 'Задачи',
      route: MainRoutes.Tasks,
      icon: './assets/navigation/check-inactive.svg',
    },
    {
      id: '2',
      text: 'Цели',
      route: MainRoutes.Goals,
      icon: './assets/navigation/goal-inactive.svg',
    },
    {
      id: '3',
      text: 'Профиль',
      route: MainRoutes.Profile,
      icon: './assets/navigation/profile-inactive.svg',
    },
  ];

  private static checkIfButtonActive(routeName: MainRoutes): boolean {
    const hash = Router.getHash();
    return hash === routeName;
  }

  private currentActiveButton: HTMLAnchorElement | null;

  constructor() {
    super('div', 'main-navigation');
    this.currentActiveButton = null;
  }

  private makeNavigationButtonActive(button: HTMLAnchorElement) {
    const activeClassName = 'main-navigation__button-item_selected';
    if (this.currentActiveButton) {
      this.currentActiveButton.classList.remove(activeClassName);
    }
    button.classList.add(activeClassName);
  }

  render(): HTMLDivElement {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'main-navigation__buttons-container';
    this.setListener('nav-button-click', 'click', buttonsContainer, (event) => {
      const target = event.target as HTMLDivElement;
      const closestTarget = target.closest('[data-button-id]') as HTMLAnchorElement;
      if (closestTarget) {
        this.makeNavigationButtonActive(closestTarget);
        this.currentActiveButton = closestTarget;
      }
    });

    Navigation.Buttons.forEach((buttonItem) => {
      const {
        id, text, icon, route,
      } = buttonItem;
      const button = new NavigationButton(icon, route, text, id);
      const buttonHTML = button.render();
      buttonHTML.classList.add('main-navigation__button-item');
      const isButtonActive = Navigation.checkIfButtonActive(route);
      if (isButtonActive) {
        this.makeNavigationButtonActive(buttonHTML);
        this.currentActiveButton = buttonHTML;
      }
      buttonsContainer.append(buttonHTML);
    });
    if (!this.currentActiveButton) {
      const firstButton = buttonsContainer.querySelector('.main-navigation__button-item') as HTMLAnchorElement;
      this.currentActiveButton = firstButton;
      if (firstButton) {
        this.makeNavigationButtonActive(firstButton);
      }
    }
    this.container.append(buttonsContainer);

    return this.container;
  }
}
