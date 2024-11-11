import { combineReducers } from "redux";
import User from "../users/UserReducer";
import Toaster from "../Toaster/ToasterReducer";
import Mumineen from "../Mumineen/MumineenReducer";
import Jamaat from "../Jamaat/JamaatReducer";

export default combineReducers({
  User,
  Toaster,
  Mumineen,
  Jamaat,
});
