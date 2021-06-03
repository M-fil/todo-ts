import './index.scss';
import { App } from './src/modules/app';
import { Navigation } from './src/core/components/Navigation';
import { TasksPage } from './src/modules/tasks';
import { GoalsPage } from './src/modules/goals';
import { ProfilePage } from './src/modules/profile';

const app = new App(
  document.body,
  {
    navigation: new Navigation(),
    pages: {
      TasksPage,
      GoalsPage,
      ProfilePage,
    },
  },
);
app.run();
