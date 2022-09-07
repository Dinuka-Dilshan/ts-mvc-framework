import { User, UserProps } from "../Models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventMap =(): { [key: string]: () => void } =>{
    return {
      "click:#btn1": this.onClick,
      "click:#changeName": this.onChangeName,
      "click:#save": this.onSave,
    };
  }

  template(): string {
    return `
            <div>
                <h1>
                User form
                </h1>
                <input id='name' placeholder='${this.modal.get("name")}'/>
                <button id='btn1'>Set Random Age</button>
                <button id='changeName'>change name</button>
                <button id='save'>Save</button>
            </div>
        `;
  }

  onClick = (): void => {
    this.modal.setRandomAge();
  };

  onChangeName = (): void => {
    const input = document.getElementById("name") as HTMLInputElement;
    this.modal.set({ name: input.value });
  };

  onSave = () => {
    this.modal.save();
  };
}
