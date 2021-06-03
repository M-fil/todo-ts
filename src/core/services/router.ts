import { MainRoutes } from '../constants/routes';
import { AppInitialPages } from '../interfaces/page';
import { Page } from '../templates/Page';

export class Router {
  public static getHash(): MainRoutes {
    return window.location.hash.slice(1) as MainRoutes;
  }
  private currentPage!: Page;

  constructor(
    private routes: MainRoutes[],
    private pages: AppInitialPages,
    private root: HTMLElement,
  ) {
    this.routes = routes;
  }

  private clearRoute(): void {
    this.root.innerHTML = '';
  }

  private createPageInstance(key: keyof AppInitialPages, pageId: MainRoutes) {
    const PageComponent = this.pages[key];
    if (PageComponent) {
      this.currentPage = new PageComponent(pageId);
    }
  }

  private renderPage(pageId: MainRoutes): void {
    if (pageId === MainRoutes.Tasks) {
      this.createPageInstance('TasksPage', pageId);
    } else if (pageId === MainRoutes.Goals) {
      this.createPageInstance('GoalsPage', pageId);
    } else if (pageId === MainRoutes.Profile) {
      this.createPageInstance('ProfilePage', pageId);
    } else {
      this.createPageInstance('TasksPage', pageId);
    }

    const pageHTML = this.currentPage.render();
    this.clearRoute();
    this.root.append(pageHTML);
  }

  private renderInitialPage() {
    const hash = Router.getHash();
    this.renderPage(hash);
  }

  public enableRouting(): void {
    this.renderInitialPage();
    window.addEventListener('hashchange', () => {
      const hash = Router.getHash();
      const hashExists = this.routes.includes(hash);
      if (hashExists) {
        this.renderPage(hash);
      }
    });
  }
}
