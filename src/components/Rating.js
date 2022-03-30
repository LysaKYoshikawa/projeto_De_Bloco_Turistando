import React from "react";
import ReactDOM from "react-dom";
import ReactStars from "react-rating-stars-component";

//import "./styles.css";

export default function Rating() {
  return (
    <div className="Rating">
      <h1>First Example</h1>
      <h4>Use your own elements as icons</h4>
      <ReactStars
        size={50}
        onChange={newRating => {
          console.log(newRating);
        }}
        emptyIcon={<i className="far fa-star" />}
        halfIcon={<i className="fa fa-star-half-alt" />}
        filledIcon={<i className="fa fa-star" />}
      />
      <h1>Second Example</h1>
      <ReactStars
        size={50} 
        half={true}
        onChange={newRating => {
          console.log(newRating);
        }}
      />
    </div>
  );
}



const rootElement = document.getElementById("root");
ReactDOM.render(<Rating />, rootElement);