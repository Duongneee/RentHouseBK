import rootReducer from "./store/reducers/rootReducers";
import { persistStore } from "redux-persist"; 
import { createStore } from "redux";

const reduxStore = () => {
    const store = createStore(rootReducer); // sau them middleware o day 
    const persistor = persistStore(store);

    return { store, persistor }; // Trả về một đối tượng chứa store và persistor
}

export default reduxStore;
