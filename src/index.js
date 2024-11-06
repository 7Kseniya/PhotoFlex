import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';

Bugsnag.start({
  apiKey: 'e026fe447b931bde3aed2f2685f1805b',
  plugins: [new BugsnagPluginReact()],
});
BugsnagPerformance.start({
  apiKey: 'e026fe447b931bde3aed2f2685f1805b',
});

const ErrorBoundary =
  Bugsnag.getPlugin('react').createErrorBoundary(React);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app')
);
