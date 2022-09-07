import { Modal } from "./Modal";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Modal<UserProps> {
  static buildUser(value: UserProps) {
    return new User(
      new Eventing(),
      new ApiSync(rootUrl),
      new Attributes<UserProps>(value)
    );
  }

  static buildUserCollection() {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge = (): void => {
    this.set({ age: Math.round(Math.random() * 100) });
  };
}
