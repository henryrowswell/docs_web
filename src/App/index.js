import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { connect } from 'react-redux'
import {
  setProjects,
} from './actions'
import FileSystem from './FileSystem'
import ContentWindow from './ContentWindow'


class App extends Component {
  constructor(props) {
    super(props)
    // this.getDoc = this.getDoc.bind(this)
  }

  componentDidMount() {
    fetch('/everything')
      .then(res => { 
        console.log('response:', res)
        console.log('response.json:', res.clone().json())
        return res.json()
      })
      .then(projects => this.props.setProjects(projects.contents))
      .catch(error => {
        console.log('error:', error)
      })
  }

  // getDoc() {
  //   fetch('/docs/exampledoc4.md')
  //   .then(res => { 
  //     console.log('response:', res)
  //     return res.text()
  //   })
  //   .then(doc4 => this.setState({ doc4 }))
  //   .catch(error => {
  //     console.log('error:', error)
  //   })
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <FileSystem />
            </div>
            <div className="col-lg-9">
              <ContentWindow />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projects,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setProjects: (projects) => dispatch(setProjects(projects))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
