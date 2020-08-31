import { createStore } from "redux";
import { createBrowserHistory } from "history";
import RootReducer from "../Reducers/RootReducer";

export const history = createBrowserHistory({
  hashType: "slash"
});

export function configureStore(initialState) {
  const store = createStore(
    RootReducer(history),
    initialState
  );
  return store;
}
