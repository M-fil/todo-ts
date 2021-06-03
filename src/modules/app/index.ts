import { MainRoutes } from '../../core/constants/routes';
import { AppInitialPages } from '../../core/interfaces/page';
import { Router } from '../../core/services/router';
import { StateManager } from '../../core/services/state';
import { Component } from '../../core/templates/Component';

interface AppComponents<T extends HTMLElement> {
  navigation: Component<T>,
  pages: AppInitialPages,
}

export class App {
  private router: Router;
  private stateManager: StateManager;

  constructor(
    private root: HTMLElement,
    private components: AppComponents<HTMLDivElement>,
  ) {
    this.root = root;
    this.components = components;
    this.stateManager = new StateManager();
    this.router = new Router(
      Object.values(MainRoutes),
      this.components.pages,
      document.querySelector('#page')!,
    );
  }

  run(): void {
    this.stateManager.init();
    const navigationHTML = this.components.navigation.render();
    this.root.append(navigationHTML);
    this.router.enableRouting();
  }
}
