import { View } from "./View";
import { User, UserProps } from "../Models/User";
import { UserShow } from "./UserShow";
import { UserForm } from "./UserForm";
export class UserEdit extends View<User, UserProps> {
  regionsMap = (): { [key: string]: string } => {
    return {
      userShow: "#userShow",
      userForm: "#userForm",
    };
  };

  onRender = (): void => {
    new UserShow(this.regions["userShow"], this.modal).render();
    new UserForm(this.regions["userForm"], this.modal).render();
  };

  template(): string {
    return `
        <div id='userShow'></div>
        <div id='userForm'></div>
    `;
  }
}
