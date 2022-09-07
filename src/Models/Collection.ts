import axios from "axios";
import { Eventing } from "./Eventing";

export class Collection<T,K> {
  models: T[] = [];
  events = new Eventing();
  constructor(public rootUrl: string,public decerialize:(json:K)=>T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response) => {
      response.data.forEach((value: K) => {
        this.models.push(this.decerialize(value));
      });

      this.trigger("change");
    });
  }
}
