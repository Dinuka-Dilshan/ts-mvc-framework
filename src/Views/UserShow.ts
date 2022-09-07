import { View } from "./View";
import { User, UserProps } from "../Models/User";
export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
        <h1>User Details</h1>
        <div>
            <div>Name: ${this.modal.get("name")}</div> 
            <div>Age: ${this.modal.get("age")}</div>
        </div>
    `;
  }
}
