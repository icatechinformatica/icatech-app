import { createStore } from 'redux';
import rootReducer from './reducer/index';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'user',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(persistedReducer);
export let persistor = persistStore(store);