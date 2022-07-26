import './App.css';
import React from 'react';
import Child from './Child';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      toggled: false,
      inputText: "",
      data: null,
      error: null,
      isLoaded: false,
      items: [],
      currentPage: 0
    };
    this.toggleText = this.toggleText.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getPreviousPage = this.getPreviousPage.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.limit = 2;
  }

  componentDidMount() {
    this.fetchPageData(0, this.limit);
  }

  //1. Fetch data from API
  fetchPageData(start, limit) {
    this.setState({currentPage:start});
    fetch("https://jsonplaceholder.typicode.com/users?_start=" + start + "&_limit=" + limit)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  
  toggleText() {
    this.setState({ toggled: !this.state.toggled })
  }

  handleInput = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  //4. For getting data from the child component
  handleCallback = (childData) =>{
    this.setState({data: childData})
  }

  handlePageClick(start, limit) {
    this.fetchPageData(start, limit)
  }

  getPreviousPage() {
    if(this.state.currentPage > 0) {
      this.fetchPageData(this.state.currentPage - 1, this.limit);
    }
  }

  getNextPage() {
    if(this.state.currentPage < 10) {
      this.fetchPageData(this.state.currentPage + 1, this.limit);
    }
  }

  render() {
    let pages = [];

    for (var i=0; i < 5; i++) {
      let start = i;
      pages.push(<li id={"page_" + (i+1)} key={i} onClick={() => this.handlePageClick(start, this.limit)} className="page-item"><a className="page-link" href="/#">{i+1}</a></li>);
    }

    return (
      <div className="container">
        <div className="card mb-5">
          <div className="card-body">
            <p>1. Create a page to display users list with pagination.
API : https://jsonplaceholder.typicode.com/users
Offset : _start
Limit : _limit</p>
            <div>
              <div>
                <ul>
                {this.state.items.map((item, i) => {         
                  return (
                    <li key={i}>
                      <div>Name: {item.name}</div>
                      <div>Email: {item.email}</div>
                    </li>
                  ) 
                })}
                </ul>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="/#" onClick={this.getPreviousPage}>Previous</a></li>
                  {pages}
                  <li className="page-item"><a className="page-link" href="/#" onClick={this.getNextPage}>Next</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>


        <div className="card mb-5">
          <div className="card-body">
            <p>2.Make the button functional. A click on button should toggle (show/hide) the string `Toggled/   Toggle` each time it is pressed.</p>
            <button onClick={this.toggleText} id="toggleBtn" className="btn btn-primary">Click to toggle</button>
            <label id="toggleText">{this.state.toggled ? "Toggled!" : "Toggle"}</label>
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-body">
            <p>3.Create an input where the user should be able to type in any characters on input and those characters should show in the browser.</p>
            <input type="text" id="myInputBox" placeholder='Enter some text here...' onKeyUp={this.handleInput} className="form-control" />
            <div className="alert alert-primary mt-2">
              <label id="inputText">You have entered: {this.state.inputText}</label>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <p>4.Make a component where parent text (I need to be updated from my child) should be updated when the Child button below is clicked. Feel free to use any string to update the parent's current string.</p>
            <div>
                <Child parentCallback = {this.handleCallback}/>
                <div className="alert alert-primary mt-2">
                  <label id="inputText">Text from child component: {this.state.data}</label>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
export default App;
