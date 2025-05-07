import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignUp'
import SplashScreen from './pages/splashScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<SplashScreen/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
