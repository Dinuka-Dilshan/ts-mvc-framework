interface UserProps {
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: {
    [key: string]: Callback[];
  } = {};

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
  on(eventName: string, callback: Callback): void {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  trigger(eventName: string): void {
    // this.events[eventName]?.map((event) => event());
    try {
      this.events[eventName].map((event) => event());
    } catch (error) {
      console.error(`event ${eventName} not exist`);
    }
  }
}
