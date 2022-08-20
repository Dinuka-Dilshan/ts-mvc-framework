import { User } from "./Models/User";

const user = new User({ name: "dinuka" });

user.on("change", () => {
  console.log("changed");
});
user.on("change", () => {
  console.log("changed2");
});
user.on("fuck", () => {});

console.log(user);
user.trigger("chang");
