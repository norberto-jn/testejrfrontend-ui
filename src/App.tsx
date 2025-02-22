import { Navigate, Route, BrowserRouter as Router, Routes as Switch } from 'react-router-dom';
import ProtectedRoute from '/src/utils/ProtectedRoute';
import Home from '/src/pages/Home/Home';
import NotFound from '/src/pages/NotFound/NotFound';
import Login from '/src/pages/Login/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;