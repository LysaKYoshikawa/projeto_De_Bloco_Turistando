import React from "react";
import ReactDOM from "react-dom";
import ReactStars from "react-rating-stars-component";

import "./../index"

export default function Rating() {
  return (
    <div className="Rating">
      <h1 class="p-4">Avalie nosso serviço</h1>
      <div class="d-flex justify-content-center">
      <ReactStars
        size={70}
        isHalf={true} 
        onChange={newRating => {
          console.log(newRating);
        }} 
      />
      </div>
    <div class="cabecalho">  
    <h1>Comente</h1>
    </div>
    <section style= {{backgroundColor: "#5487b6"}}>
        <div class="container my-2 py-5 text-dark">
            <div class="row d-flex justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-6">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="d-flex flex-start w-100">
                                <div class="w-100">
                                    <div class="form-outline">
                                        <div class="form-group shadow-textarea">
                                            <label for="exampleFormControlTextarea6">Comentário</label>
                                            <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6"
                                                rows="10" placeholder="Escreva aqui ..."></textarea>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between mt-3">
                                        <button type="button" class="btn btn-success">
                                            Enviar
                                            <i class="fas fa-long-arrow-alt-right ms-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>




    </div>

    
  );
}



const rootElement = document.getElementById("root");
ReactDOM.render(<Rating />, rootElement);