import { initialState } from '../constants/state';
import { State } from '../interfaces/state';
import * as StorageService from './storage';

const { StorageKeys } = StorageService;

export class StateManager {
  private static instance: StateManager | null = null;
  private static wasInitialized = false;

  private state!: State;

  constructor() {
    if (!StateManager.instance) {
      StateManager.instance = this;
    } else {
      return StateManager.instance;
    }
  }

  getState(): State {
    return this.state;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getStateItem(key: keyof State) {
    return this.state[key];
  }

  updateState(fn: (prevState: State) => State): State {
    const newState = fn(this.state);
    this.state = newState;
    StorageService.saveDataToStorage(StorageKeys.State, newState);
    return newState;
  }

  init(): void {
    if (!StateManager.wasInitialized) {
      const stateFromStore = StorageService.getDataFromStorage<State | null>(StorageKeys.State);
      this.state = stateFromStore || initialState;
      StateManager.wasInitialized = true;
    }
  }
}
