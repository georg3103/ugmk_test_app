import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routing from "pages";
import { persistedStore, appStore } from './appStore'
import { withHocs } from "./hocs";
import "./index.scss";

const App = () => {
	return (
		<div className="app">
      <Routing />
		</div>
	);
};

const AppWithHocs = withHocs(App);

export const launchApp = () => {
  const root = document.getElementById('root') as HTMLElement;
  
  ReactDOM.createRoot(root).render(
    <ReduxProvider store={appStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <AppWithHocs />
      </PersistGate>
    </ReduxProvider>
  );
};
