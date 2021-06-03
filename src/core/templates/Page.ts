import { MainRoutes } from '../constants/routes';

export abstract class Page {
  protected container: HTMLElement;

  constructor(
    protected id: MainRoutes,
  ) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  public render(): HTMLElement {
    return this.container;
  }
}
