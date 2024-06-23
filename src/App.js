import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './components/LoginPage';
import QuestionPage from './components/QuestionPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import QueryHistoryPage from './components/QueryHistory';

const ProtectedRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Component /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/question" element={<QuestionPage />} /> */}
        <Route path="/question" element={<ProtectedRoute component={QuestionPage} />} />
        {/* <Route path="/history" element={<QueryHistoryPage />} /> */}
        <Route path="/history" element={<ProtectedRoute component={QueryHistoryPage} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
