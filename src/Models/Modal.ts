import { AxiosPromise } from "axios";

interface Sync<T> {
  fetch: (id: number) => AxiosPromise;
  save: (data: T) => AxiosPromise;
}

interface Events {
  on: (eventname: string, callback: () => void) => void;
  trigger: (eventName: string) => void;
}

interface ModalAttributes<T> {
  get: <K extends keyof T>(key: K) => T[K];
  set: (update: T) => void;
  getAll: () => T;
}

interface HasId {
  id?: number;
}

export class Modal<T extends HasId> {
  constructor(
    private events: Events,
    private sync: Sync<T>,
    private attributes: ModalAttributes<T>
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set = (update: T): void => {
    this.attributes.set(update);
    this.events.trigger("change");
  };

  fetch(): void {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Cannot fetch without id");
    }

    this.sync.fetch(id).then((response) => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then(() => {
        this.events.trigger("save");
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
}
