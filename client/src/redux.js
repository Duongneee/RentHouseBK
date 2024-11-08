import rootReducer from "./store/reducers/rootReducers";
import { persistStore } from "redux-persist"; 
import { createStore, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';


const reduxStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk)); // middleware 
    const persistor = persistStore(store);

    return { store, persistor }; // Trả về một đối tượng chứa store và persistor
}

export default reduxStore;
