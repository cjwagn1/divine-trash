import React, { Component } from 'react';
import fire from './fire';
import './App.css';
import logo from './test.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [],
                   post: [{
                     title: null,
                     location: null
                   }]
                  }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let postsRef = fire.database().ref('posts').orderByKey().limitToLast(100);
    postsRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let post = { text: snapshot.val(), id: snapshot.key };
      this.setState({ posts: [post].concat(this.state.posts) });
    })
  }
  addPost(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    let post = {
      title: document.getElementById("title-input").value,
      location: document.getElementById("location-input").value,
      time: document.getElementById("Estimated-input").value,
      noteField: document.getElementById("Note-input").value
          }

    fire.database().ref('posts').push( post );
    // fire.database().ref('messages').push( this.inputEl.value );
    document.getElementById("PostForm").reset();
  }
  render() {
    return (
    <div class = "back">
     <header>
     <h2 class = "align">Divine Trash</h2>
      <img src = {logo} className="App-logo" />
      <img src = {logo} className="App-logo2" />

     </header>
      <div class = "test">
        <form onSubmit={this.addPost.bind(this)} id="PostForm">
          <div>
            <label> Title: </label>
            <input type="text" id="title-input"/>
          </div>
          <div>
          <br />
            <label> Location: </label>
            <input type="text" id="location-input"/>
          </div>
          <div>
          <br />
            <label>  Estimated Time: </label>
            <input type="text" placeholer = "tesnbhbt" required id="Estimated-input"/>
          </div>
          <div>
          <br />
            <label >Notes: </label>
            <input type="text" id="Note-input"/>
          </div>
          <div>
          <br />
            <input type="submit"/>
          </div>
          <ul>
            { /* Render the list of post */
               this.state.posts.map( post => <li key={post.id}>{post.text.title}, {post.text.location}, {post.text.time}, {post.text.noteField}</li> )


            }
          </ul>
        </form>
      </div>
    </div>
    );
  }
}

export default App;
