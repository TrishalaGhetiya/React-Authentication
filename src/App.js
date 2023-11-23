import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const authCtx = useContext(AuthContext);
  var minutes = 5;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if(setupTime == null){
    localStorage.setItem('setupTime', now)
  } else {
    if(now-setupTime > minutes*60*1000){
      localStorage.clear();
      authCtx.logout();
      localStorage.setItem('setupTime', now);
    }
  }

  
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <Layout>
      <Switch>
        {isLoggedIn && <Route path='/' exact>
          <HomePage />
        </Route>}
        {!isLoggedIn && <Route path='/auth'>
          <AuthPage />
        </Route>}
        {isLoggedIn && <Route path='/profile'>
          <UserProfile />
        </Route>}
        <Route path='*'>
          <Redirect to='/auth' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
