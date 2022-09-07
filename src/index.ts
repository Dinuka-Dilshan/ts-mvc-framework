import { User } from "./Models/User";
import { UserEdit } from "./Views/UserEdit";
import { UserForm } from "./Views/UserForm";
import { UserShow } from "./Views/UserShow";

const user = User.buildUser({ id: 1 });
user.fetch();

const userEdit = new UserEdit(document.getElementById("root"), user);

userEdit.render();


