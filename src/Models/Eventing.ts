type Callback = () => void;

export class Eventing {
  events: {
    [key: string]: Callback[];
  } = {};

  on = (eventName: string, callback: Callback): void => {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  };

  trigger = (eventName: string): void => {
    // this.events[eventName]?.map((event) => event());
    try {
      this.events[eventName].map((event) => event());
    } catch (error) {
      console.error(`event ${eventName} not exist`);
    }
  };
}
