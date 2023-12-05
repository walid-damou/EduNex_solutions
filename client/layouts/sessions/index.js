import TypeGiver from "../../utils/UserType";
import SessionAm from "./ampresta";
import SessionSoc from "./societe";

const Session = () => {
  const user = TypeGiver();
  // });
  console.log(user);
  if (user.userType === "Societe") {
    return <SessionSoc />;
  } else if (user.userType === "Superadmin") {
    return <SessionAm />;
  }
};

export default Session;
