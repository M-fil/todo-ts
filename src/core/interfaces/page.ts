import { MainRoutes } from '../constants/routes';
import { Page } from '../templates/Page';

export interface PageEntity {
  new (id: MainRoutes): Page;
}

export interface AppInitialPages {
  TasksPage: PageEntity | null,
  GoalsPage: PageEntity | null,
  ProfilePage: PageEntity | null,
}
