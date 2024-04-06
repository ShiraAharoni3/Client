
import React from "react";
import axios, {Axios} from "axios";
import './LoginForm.css';



class LoginForm extends React.Component {
    state =
        {
            username: "",
            password: "",
            data: "",
            signupUsername: "",
            signupPassword: "",
            signupRepeat: "",
            usernameAvailable: true,
            users: [],
            token: "",
            posts: [],
            newPost: "",
            isUpdateClicked: true,
            isEditing: false,
            imageUrl: "",
            signupImageUrl: "",
            isDropdownVisible: false,
            isUpdateButtonVisible: true,
            newImageUrl: "",
            isProfileChangeSelected: false,
            imageStyle: {
                position: 'absolute',
                top: '20px', // Adjust this value to control the distance from the top
                right: '20px', // Adjust this value to control the distance from the right
                borderRadius: '50%', // Make the image round
                width: '200px', // Set the width of the image
                height: '200px', // Set the height of the image
                objectFit: 'cover', // Ensure the image covers the entire area while maintaining aspect ratio
                border: '2px solid #fff', // Add a border to the image for better visibility
            }


        }

    componentDidMount() {
        this.getAllUsers()
    }

    handleUpdateClick = () => {
        this.setState({isDropdownVisible: true, isUpdateButtonVisible: false});
    };

    render = () => {
        const {posts} = this.state;
        console.log("this stat" + this.state)
        return (
            <div className="login-form">
                {
                    this.state.token.length > 0
                        ?
                        <div className={"post"}>
                            <div className="user-name">
                                Welcome {this.state.username}
                            </div>
                            <div>
                                <img
                                    src={this.state.imageUrl}
                                    alt="Profile"
                                    style={this.state.imageStyle}
                                />
                                {this.state.isUpdateButtonVisible && (
                                    <button className="update-btn" onClick={this.handleUpdateClick}>
                                        Update
                                    </button>
                                )}
                                {this.state.isDropdownVisible && (
                                    <div className="update-btn">
                                        <input
                                            type="text"
                                            value={this.state.newImageUrl}
                                            onChange={(event) => this.onChange("newImageUrl", event)}

                                        />
                                        <button onClick={this.updateProfilePicture}
                                                disabled={this.state.newImageUrl.length === 0}>Update Profile Picture
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                {this.state.isDropdownVisible && (
                                    <div className="update-profile-picture-container">
                                        <input
                                            type="text"
                                            value={this.state.newImageUrl}
                                            onChange={(event) => this.onChange("newImageUrl", event)}

                                        />
                                        <button onClick={this.updateProfilePicture}
                                                disabled={this.state.newImageUrl.length === 0}>Update Profile Picture
                                        </button>
                                    </div>
                                )}
                            </div>
                            {this.state.posts.length > 0 ? (
                                <div className="post-grid">

                                    {posts.map(item => (
                                        <div key={item.id} className="post-square">
                                            <div className="post-content">
                                                {item.content}
                                            </div>
                                            <button className={"delete-post-button"}
                                                    onClick={() => this.removePost(item.id)}>
                                                Delete Post
                                            </button>
                                        </div>

                                    ))}
                                </div>
                            ) : (
                                <div className="no-posts">No posts to display</div>
                            )}
                            <div className="add-post">

                                <button onClick={this.addPost}
                                        disabled={this.state.newPost.length === 0 || this.state.newPost.length > 280}>Add
                                    Post
                                </button>
                                <input placeholder={"Enter text"} value={this.state.newPost}
                                       onChange={(event) => this.onChange("newPost", event)}></input>
                                {
                                    this.state.newPost.length > 280 && (
                                        <div>The text exceeds the character limit - (280 characters)</div>
                                    )

                                }
                            </div>


                        </div>
                        :
                        <div className="container">
                            <div className="sign-in">

                                <table>
                                    <tr>
                                        SIGN IN
                                    </tr>
                                    <tr>
                                        <input placeholder={"Enter username"} value={this.state.username}
                                               onChange={(event) => this.onChange("username", event)}/>
                                    </tr>
                                    <tr>
                                        <input placeholder={"Enter password"} type={"password"}
                                               value={this.state.password}
                                               onChange={(event) => this.onChange("password", event)}/>
                                    </tr>
                                    <tr>
                                        <button onClick={this.login}
                                                disabled={this.state.username.length === 0 || this.state.password.length === 0}>Login
                                        </button>
                                    </tr>

                                </table>
                                <div>{this.state.data}</div>
                                <div> {this.state.token}</div>
                            </div>
                        </div>
                }

            </div>
        );
    }
    updateProfilePicture = () => {
        axios.get("http://localhost:9030/update-picture-profile?newImageUrl=" + this.state.newImageUrl + "&token=" + this.state.token)
            .then(response => {
                this.setState(
                    {

                        imageUrl: this.state.newImageUrl,
                        newImageUrl: "",
                        isProfileChangeSelected: false,
                        isSettingsButtonVisible: true,
                        isDropdownVisible: false
                    })

            })
    }

    login = () => {
        axios.get("http://localhost:9030/sign-in?username=" + this.state.username +
            "&password=" + this.state.password)
            .then(response => {
                if (response.data.success) {
                    this.setState(
                        {
                            token: response.data.token
                        }, () => {
                            axios.get("http://localhost:9030/get-posts?token=" + this.state.token)
                                .then(response => {
                                    this.setState(
                                        {
                                            posts: response.data.posts
                                        })
                                })

                            axios.get("http://localhost:9030/get-imageUrl?token=" + this.state.token)
                                .then(response => {
                                    this.setState({
                                        imageUrl: response.data.imageUrl
                                    });
                                });
                        });
                }
            })

    }
    onChange = (key, event) => {
        this.setState(
            {
                [key]: event.target.value
            })
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
    addPost = () => {
        axios.get("http://localhost:9030/add-new-post?content=" + this.state.newPost + "&token=" + this.state.token)
            .then(response => {
                const currentPosts = this.state.posts;
                currentPosts.unshift({content: this.state.newPost}); // Add new post to the beginning
                this.setState({
                    posts: currentPosts.slice(0, 20), // Limit to last 20 posts
                    newPost: ""
                });
            });
    }


    removePost = (id) => {
        axios.get("http://localhost:9030/remove-post?token="
            + this.state.token + "&postId=" + id)
            .then(response => {
                axios.get("http://localhost:9030/get-posts?token=" + this.state.token)
                    .then(response => {
                        this.setState(
                            {
                                posts: response.data.posts
                            })
                    })
            })
    }
}




export default LoginForm;

