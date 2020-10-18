import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { FirebaseAppProvider } from 'reactfire';
import FullPageLoading from './components/FullPageLoading';

const firebaseConfig = {
  apiKey: "AIzaSyC0A5GwDojWzEe_8iwU0eR45pIQKej10w0",
    authDomain: "always-hungry-665b7.firebaseapp.com",
    databaseURL: "https://always-hungry-665b7.firebaseio.com",
    projectId: "always-hungry-665b7",
    storageBucket: "always-hungry-665b7.appspot.com",
    messagingSenderId: "879292276437",
    appId: "1:879292276437:web:add13cc31b667a6af34c5c"};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<FullPageLoading />}>
      <App />
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
