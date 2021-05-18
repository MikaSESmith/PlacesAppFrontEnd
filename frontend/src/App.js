// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  // URL in a variable
  const url = "https://reactjs.org"
  // State to hold the list of dogs
  const [places, setPlaces] = React.useState([])

   // Empty Dog - For the Create Form
   const emptyPlaces = {
    name: "",
    img: "",
    description: ""
  }
  const [selectedPlaces, setSelectePlaces] = React.useState(emptyPlaces)


  // Function to get list of Dogs
  const getPlaces = () => {
  // make a get a request to this url
  fetch(url + "/places/")
  // use .then to take action when the response comes in
  // convert data into js object
  .then((response) => response.json())
  // use the data from the response
  .then((data) => {
    setPlaces(data)
  })
  }
  // useEffect, to get the data right away
  React.useEffect(() => {
    getPlaces()
  }, [])

  //handleCreate - function for when the create form is submitted
  const handleCreate = (newPlaces) => {
    fetch(url + "/places/", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newPlaces)
    })
    .then(() => getPlaces())
  }

  // handleUpdate - function for when the edit form is submitted
  const handleUpdate = (places) => {
    fetch(url + "/places/" + places._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(places)
    })
    .then(() => getPlaces())
  }
  // function to specify which dog we are updated
const selectPlaces = (places) => {
  setSelectedPlaces(places)
}

  // deleteDog to delete inidividual dogs
  const deletePlaces = (places) => {
    fetch(url + "/places/" + places._id, {
      method: "delete"
    })
    .then(() => {
      getPlaces()
    })
  }


  return (
    <div className="App">
      <h1>Places App</h1>
      <hr />
      <Link to ="/create">
        <button>Add A Wonderful New Place</button>
      </Link>
      <main>
      <Switch>
      <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              places={places} 
              selectPlaces={selectPlaces}
              deletePlaces={deletePlaces} 
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                places={emptyPlaces}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              dog={selectedPlaces} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
