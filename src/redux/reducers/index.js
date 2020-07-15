import { combineReducers } from "redux";
import errors from "./errorsReducer";
import loginMode from "./loginModeReducer";
import user from "./userReducer";
import topics from "./topicsReducer";
import rooms from "./roomsReducer";
import currentRoom from "./currentRoomReducer";
import status from "./statusReducer";
import histories from "./historiesReducer";
import memberLists from "./memberListsReducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  topics, // popular topics based on users current filter settings
  rooms, // rooms which the user is a member of
	currentRoom, // the current room the user is participating in
	status, // the current status of the app
	histories, // chat histories for each room the user is an active member of
	memberLists, // member lists for each room the user is an active member of
});

export default rootReducer;
