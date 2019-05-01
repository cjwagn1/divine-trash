import React, { Component } from "react";
import fire from "./fire";
import "./App.css";
import logo from "./test.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: [
        {
          title: null,
          location: null
        }
      ]
    }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let postsRef = fire
      .database()
      .ref("posts")
      .orderByKey()
      .limitToLast(100);
    postsRef.on("child_added", snapshot => {
      /* Update React state when message is added at Firebase Database */
      let post = { text: snapshot.val(), id: snapshot.key };
      this.setState({ posts: [post].concat(this.state.posts) });
    });
  }
  addPost(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    let post = {
      title: document.getElementById("title-input").value,
      location: document.getElementById("location-input").value,
      time: document.getElementById("estimated-input").value,
      noteField: document.getElementById("note-input").value
    };

    fire
      .database()
      .ref("posts")
      .push(post);
    // fire.database().ref('messages').push( this.inputEl.value );
    document.getElementById("PostForm").reset();
  }
  render() {
    return (
      <div className="back">
        <header>
          <h2 className="align">Divine Trash</h2>
          <img src={logo} className="App-logo" />
          <img src={logo} className="App-logo2" />
        </header>
        <div className="main">
          <form onSubmit={this.addPost.bind(this)} id="PostForm">
            <div className="demo-card-wide mdl-card mdl-shadow--2dp">
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">Welcome</h2>
              </div>
              <div className="mdl-card__supporting-text">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="title-input"
                  />
                  <label className="mdl-textfield__label" for="sample3">
                    Title
                  </label>
                </div>

                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="location-input"
                  />
                  <label className="mdl-textfield__label" for="sample3">
                    Location
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="estimated-input"
                  />
                  <label className="mdl-textfield__label" for="sample3">
                    Estimated Time
                  </label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="note-input"
                  />
                  <label className="mdl-textfield__label" for="sample3">
                    Notes
                  </label>
                </div>
              </div>

              <div className="mdl-card__actions mdl-card--border">
                <input
                  type="submit"
                  className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                />
              </div>

              <div className="mdl-card__menu">
                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                  <i className="material-icons">share</i>
                </button>
              </div>
            </div>
          </form>

          {this.state.posts.map(post => (
            <div
              key={post.id}
              className="demo-card-wide mdl-card mdl-shadow--2dp"
            >
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">{post.text.title}</h2>
              </div>
              <div className="mdl-card__supporting-text">
                {post.text.location}, {post.text.time}, {post.text.noteField}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
