// import React, { Component } from 'react';
// import fire from './fire';
//
// class App extends Component {
//
//
//   constructor(props) {
//     super(props);
//     this.state = { messages: [] }; // <- set up react state
//   }
//   componentWillMount(){
//     /* Create reference to messages in Firebase Database */
//     let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
//     messagesRef.on('child_added', snapshot => {
//       /* Update React state when message is added at Firebase Database */
//       let message = { text: snapshot.val(), id: snapshot.key };
//       this.setState({ messages: [message].concat(this.state.messages) });
//     })
//   }
//   addMessage(e){
//     e.preventDefault(); // <- prevent form submit from reloading the page
//     /* Send the message to Firebase */
//     fire.database().ref('messages').push( this.inputEl.value );
//     this.inputEl.value = ''; // <- clear the input
//   }
//   render() {
//     return (
//       <form onSubmit={this.addMessage.bind(this)}>
//         <input type="text" ref={ el => this.inputEl = el }/>
//         <input type="submit"/>
//         <ol>
//           { /* Render the list of messages */
//             this.state.messages.map( message => <li key={message.id}>{message.text}</li> )
//           }
//         </ol>
//       </form>
//     );
//   }
// }
//
// export default App;

import React, { Component } from 'react';
import fire from './fire';

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
      <div>
        <form onSubmit={this.addPost.bind(this)} id="PostForm">
          <div>
            <label>Title</label>
            <input type="text" id="title-input"/>
          </div>
          <div>
            <label>Location</label>
            <input type="text" id="location-input"/>
          </div>
          <div>
            <label>Estimated Time</label>
            <input type="text" id="Estimated-input"/>
          </div>
          <div>
            <label>Notes</label>
            <input type="text" id="Note-input"/>
          </div>
          <div>
            <input type="submit"/>
          </div>
          <ul>
            { /* Render the list of post */
               this.state.posts.map( post => <li key={post.id}>{post.title}</li> )
            }
          </ul>
        </form>
      </div>
    );
  }
}

export default App;
