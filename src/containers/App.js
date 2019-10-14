import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';



class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: '1', name: 'Max', age: '22' },
      { id: '2', name: 'Mara', age: '23' },
      { id: '3', name: 'Mary', age: '12' },
    ],
    otherState: 'some other state',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };


  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedsStateFromProps', props)
    return state
  }

  /*   
  Dangerous component - will be removed in the future 
    componentWillMount(){
      console.log('[App.js] componentWillMount')
  } */

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')

  }
  /* shouldComponentUpdate(props, state) {
    console.log('[App.js] shouldComponentUpdate')
    //false will prevent it to update the component
    return true;

  } */

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    //const person = Object.assign({}, this.state.person[personIndex])
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: this.state.changeCounter + 1
      };
    });
  }

  deletePersonHandler = (personIndex) => {
    //always create a copy through .slice or through spread  [...x]
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    console.log('[App.js] render');
    let persons = null;


    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated} />
      );
    }

    return (
      <Auxiliary classes={classes.App}>
        <button onClick={() => {
          this.setState({ showCockpit: false })
        }}
        >Remove Cockpit
          </button>


        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />) : null}
          {persons}
        </AuthContext.Provider>

      </Auxiliary>
    );
    //   return React.createElement('div', {className: 'App' }, React.createElement('h1'), 'Hi, I am a React App')
  }
}

export default withClass(App, classes.App);
