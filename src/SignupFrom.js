import React from 'react';
import axios from "axios";
import LoginForm from "./LoginForm";
import './LoginForm.css';

class SignupForm extends React.Component
{
    state =
        {
            signupUsername : "",
            signupPassword : "" ,
            signupRepeat : "",
            usernameAvailable : true ,
            signupImageUrl : "" ,
            users : [] ,
            handleSignupClick : false,
            signupClicked: false
        }
    render() {
        if (this.state.signupClicked) {
            return <LoginForm/>;
        } else {
            return (
                <div>
                    <div className="container">
                    <div className="sign-in" >
                    <table>
                        <tr>
                            SIGN UP
                        </tr>
                        <tr>
                            <input placeholder={"Choose username"} value={this.state.signupUsername}
                                   onChange={this.onSignupUsernameChange}
                                   style={{color: this.state.usernameAvailable ? "green" : "red"}}/>
                        </tr>
                        <tr>
                            <input placeholder={"Choose password"} type={"password"} value={this.state.signupPassword}
                                   onChange={(event) => this.onChange("signupPassword", event)}/>
                        </tr>
                        <tr>
                            <input placeholder={"Repeat password"} type={"password"} value={this.state.signupRepeat}
                                   onChange={(event) => this.onChange("signupRepeat", event)}/>
                        </tr>

                        <tr>
                            <input placeholder={"Choose profile image"} value={this.state.signupImageUrl}
                                       onChange={(event) => this.onChange("signupImageUrl", event)}/>
                        </tr>
                        <tr>
                            <button onClick={this.signup} disabled={(this.state.signupUsername.length === 0 ||
                                this.state.signupPassword.length === 0
                                || this.state.signupRepeat.length === 0) || this.state.signupRepeat !== this.state.signupPassword}>Sign
                                up
                            </button>
                        </tr>
                    </table>
                    </div>
                    </div>
                    {

                        this.state.users.map(user => {
                            return (
                                <div>
                                    {user.id}
                                    {user.username}
                                    {user.imageUrl}
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
    }

    getAllUsers = () => {
        axios.get("http://localhost:9030/get-all-users")
            .then(response => {
                this.setState(
                    {
                        users: response.data.allUsers
                    })

            })
    }
    handleSignupClick = () => {
        this.setState({ handleSignupClick: true});
    };

    onSignupUsernameChange = (event) =>
    {

        const value = event.target.value ;
        this.setState(
            {
                signupUsername : value
            } , () =>
            {
                axios.get("http://localhost:9030/username-available?username=" + this.state.signupUsername )
                    .then(response =>
                    {
                        if(response.data.success)
                        {
                            this.setState(
                                {
                                    usernameAvailable : response.data.available
                                })

                        }

                    })
            })



    }

    signup = () => {
        axios.get("http://localhost:9030/register?username=" + this.state.signupUsername + "&password=" + this.state.signupPassword + "&repeat=" + this.state.signupRepeat
            +"&imageUrl=" + this.state.signupImageUrl )
            .then(response =>
            {
                this.setState(
                    {
                        signupUsername : "",
                        signupPassword : "" ,
                        signupRepeat : "" ,
                        signupImageUrl : ""
                    })
                //this.getAllUsers()

            })

    }
    onChange = ( key, event) =>
    {
        this.setState(
            {
                [key] : event.target.value
            })
    }
}

export default SignupForm;
