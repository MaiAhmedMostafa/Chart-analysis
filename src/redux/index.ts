import { configureStore } from "@reduxjs/toolkit";

import lessonsReducer from "./lessons/lessonsReducer";

/* Setup reducers */
const reducer = {
  lessons: lessonsReducer,
};

//We can setup here (Topics for sockets) & middleware (redux observables) if required

const store = configureStore({
  reducer,
});

export default store;
