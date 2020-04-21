import React, { createContext, Component } from 'react';

export const AppContext = createContext();
export class ContextProvider extends Component {
  // ? Temporarily setting myself as the default user for testing purposes
  user = {
    userId: 1,
    username: `dylansheffer`,
    firstName: `Dylan`,
    lastName: `Sheffer`,
    pokedexes: {
      nodes: [
        {
          pokedexId: 1,
        }
      ]
    }
  };
  render() {
    return(
      <AppContext.Provider value={{state: {user: this.user}}}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
