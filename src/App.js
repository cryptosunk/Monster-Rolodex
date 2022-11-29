import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";
import React from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then(
        (users) =>
          this.setState(() => {
            return { monsters: users };
          })

        //() => {
        //console.log(this.state);
        //}
      );
  }
  //Method only gets called, initilized once when our class component is initilized
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    // // console.log(this.props.monsters);
    // console.log('render from AppJS');
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this; // Optimised way instead of using this

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        {/* {filteredMonsters.map((monster) => {
   return  (
   <div key={monster.id}>
   <h1>{monster.name}</h1>
   </div>
   );
   }) */}
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
