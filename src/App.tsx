import { Navigate, Route, BrowserRouter as Router, Routes as Switch } from 'react-router-dom';
import Login from '/src/pages/Login';
import NotFound from '/src/pages/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;