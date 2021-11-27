import React, { useState, useEffect } from "react";
import Defination from "./Defination";

const App = () => {
  const [word, setWord] = useState();
  const [mean, setMean] = useState([]);
  const [main, setMain] = useState([]);
  const [audio, setAudio] = useState();

  const dataApi = async () => {
    const data = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const dataJ = await data.json();
    setMean(dataJ);
    setMain(dataJ[0]);
    const url = dataJ[0].phonetics[0].audio;
    const urla = url.replace("//ssl.", "https://");
    setAudio(urla);
  };

  useEffect(() => {
    dataApi();
  }, []);

  const Search = () => {
    dataApi();
    setWord("");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center fw-bold fs-1 p-3 bg-primary text-white">
            Pocket Dictonary
          </div>
          <div className="form-floating bg-primary py-3 pb-5 text-center">
            <input
              type="text"
              className="form-control-sm border-0 px-2 col-3"
              placeholder="Type your word"
              id="floatingInput"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyPress = {Search}
            />
          </div>
        </div>
      </div>

      {word === "" ? (
        <Defination mean={mean} main={main} audio={audio} />
      ) : (
        <div className="fs-1 text-capitalize text-center fw-bold text-decoration-underline text-white bg-dark extra">
          type a word in the box
        </div>
      )}
    </>
  );
};

export default App;
