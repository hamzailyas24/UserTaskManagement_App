import AppRouter from './app-router/AppRouter';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Todo from './pages/Todo';

function App() {
  return (
    <div>
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <Todo /> */}
      <AppRouter />
    </div>
  );
}

export default App;