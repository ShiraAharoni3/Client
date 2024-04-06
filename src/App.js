import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupFrom";

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<LoginForm/>}/>
                  <Route path="/signup" element={<SignupForm/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
    function Home() {
        return (
            <div >

                <div className= "Application">
                    <table>
                        <tr>
                            <div className="note">
                                NOTES APP -
                                <div className="explain">
                                    <tr>
                                        Welcome to the notes app
                                    </tr>
                                    <tr>
                                        In order to connect, press the button -
                                        Login and enter username and password.
                                    </tr>
                                    <tr>
                                        If you are not registered for the application,
                                        click the Signup button to register and then select the Login button.
                                    </tr>
                                    <tr>
                                        Please note that the system will show you your last 20 posts each time.
                                    </tr>
                                    <tr>
                                        have a nice time!
                                    </tr>
                                </div>
                            </div>
                        </tr>
                        <tr>
                            <Link to="/login">

                                <button className="login-butten" >Login</button>


                            </Link>
                        </tr>
                        <tr>

                            <Link to="/signup">

                                <button className="signup-butten" >Signup</button>


                            </Link>
                        </tr>
                    </table>

                </div>
            </div>
        );
    }
}


export default App;
