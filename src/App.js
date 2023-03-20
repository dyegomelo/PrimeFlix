import RoutesApp from "./routes";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css' //cria alertas mais interessantes

function App() {
  return (
    <div className="App">
      <ToastContainer outoClose={3000}/> 
    <RoutesApp/>
    </div>
  );
}

export default App;
