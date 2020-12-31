import { LocationProvider, Router } from 'preact-iso/router';
import { ErrorBoundary } from 'preact-iso/lazy';
import Header from './Header';
import { routes } from "./routes";

export default function App() {
  return (
    <LocationProvider>
      <div id="contentcontainer" className="shadow">
        <Header/>
        <main id="maincontent">
          <ErrorBoundary>
            <Router>
              {routes.map(({ Route, url }) => (
                <Route path={url} />
              ))}
            </Router>
          </ErrorBoundary>
        </main>
      </div>
    </LocationProvider>
  );
}