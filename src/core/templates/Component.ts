type EventCallbackType = (event: Event) => void;

export abstract class Component<
  T extends HTMLElement,
  S extends {} = {},
  F extends EventCallbackType = EventCallbackType,
> {
  protected container: T;

  protected listeners: {
    [prop: string]: {
      fn: F,
      type: keyof HTMLElementEventMap,
      element: HTMLElement | null,
    }
  };

  protected static TextObject: { [prop: string]: string | Function } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected localState: S | null;

  constructor(
    protected tagName: string,
    protected className: string,
  ) {
    this.container = document.createElement(tagName) as T;
    this.container.className = className;
    this.listeners = {};
    this.localState = null;
  }

  get containerHTML(): T {
    return this.container;
  }

  get localStateObject(): S | null {
    return this.localState;
  }

  public setListener(
    name: string,
    eventType: keyof HTMLElementEventMap,
    element: HTMLElement | null,
    fn: F,
  ): void {
    const isListenerAlreadySet = !!this.listeners[name];
    if (isListenerAlreadySet) {
      throw new Error(`Обработчик событий ${name} уже установлен`);
    }

    this.listeners[name] = {
      fn,
      type: eventType,
      element,
    };
    if (element) {
      element.addEventListener(eventType, fn);
    }
  }

  public removeListener(name: string): void {
    const listener = this.listeners[name];
    if (listener) {
      delete this.listeners[name];
      listener.element?.removeEventListener(listener.type, listener.fn);
    }
  }

  render(): T {
    return this.container;
  }
}
