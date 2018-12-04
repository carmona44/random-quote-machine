import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Imports redux
//import { Provider, connect } from 'react-redux';
//import { createStore, combineReducers, applyMiddleware } from 'redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Random quote machine project</h3>
        </header>
        <Quote />
      </div>
    );
  }
}

class Quote extends  Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: [],
      randomQuote: '',
      randomQuoteAuthor: '',
      tweetURL: ''
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentWillMount(){
      fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
          .then((res) => {
              return res.json();
          })
          .then((res) => {
              this.setState({
                  quotes: res.quotes
              });
          }).then(() => {
             this.getRandomQuote();
          });
  }

  getRandomQuote(){
      var randomNum = Math.floor(Math.random() * this.state.quotes.length);
      var obj = this.state.quotes[randomNum];
      this.setState({
         randomQuote: obj.quote,
         randomQuoteAuthor: obj.author,
         tweetURL: 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + obj.quote + '" - ' + obj.author)
      });
  }

  render(){
      if(this.state.quotes.length > 0) {
          return (
              <div id="quote-box">
                  <div id="textos">
                      <p id="text">"{this.state.randomQuote}"</p>
                      <p id="author"> - {this.state.randomQuoteAuthor}</p>
                  </div>
                  <div id="buttons">
                    <a id="tweet-quote" className="button" href={this.state.tweetURL} title="Tuitea esta cita" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter-square"></i></a>
                    <button id="new-quote" type="button" className="btn btn-primary" onClick={this.getRandomQuote}>Nueva cita</button>
                  </div>
              </div>
          );
      } else {
          return <p>Cargando cita...</p>;
      }
  }
}

export default App;

// EJEMPLO RECOMENDADO FREECODECAMP

// import React from 'react'
// import ReactDOM from 'react-dom'
// import { Provider, connect } from 'react-redux'
// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import rootReducer from './redux/reducers'
// import App from './components/App'

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

// ReactDOM.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>,
//   document.getElementById('root')
// );

// change code below this line