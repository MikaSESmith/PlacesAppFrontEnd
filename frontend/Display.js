import React from "react";
const Display = (props) => {
  // destruct the dogs from props
  const {places, selectPlaces, history} = props
  // Returns the JSX for when you have dogs
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {places.map((places) => (
        <article key={places._id}>
          <img src={places.img}/>
          <h1>{places.name}</h1>
          <h3>{places.age}</h3>
          <button onClick={() => {
            selectPlaces(places)
            history.push("/edit")
          }}>
            edit
          </button>
          <button onClick={() => {
            props.deletePlaces(places)
          }}>
            Delete
          </button>
        </article>
      ))}
    </div>
  )
  const loading = () => <h1>Loading</h1>
  return places.length > 0 ? loaded() : loading()
};
export default Display;