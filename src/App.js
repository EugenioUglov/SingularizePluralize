import Loader from './fullscreen-loader/Loader';
import NounNumber from './nounNumber';
import './App.css';
import { useState } from 'react';

function App() {
  const converterOptions = {
    singularize: 'singularize',
    pluralize: 'pluralize'
  };
  
  const [valueConvertWordSelect, setValueConvertWordSelect] = useState(converterOptions.singularize);
  const [valueInputFieldToConvertWord, setValueInputFieldToConvertWord] = useState([]);
  const [loaderVisibility, setLoaderVisibility] = useState('hidden');



  function onClickConvertWordbutton() {
    const nounNumber = new NounNumber();

    const wordsFromInputFieldToConvertWord = valueInputFieldToConvertWord.split(/[^a-z]+/i).filter(Boolean);
  

    setLoaderVisibility('visible');

    if (valueConvertWordSelect === converterOptions.singularize) {
      nounNumber.getSingularizedWords({
        wordsToSingularize: wordsFromInputFieldToConvertWord,
        onDone: (result) => {
          onNounNumberRecieveResponse({alertMessage: 'Result: ' + result.join(' ')});
        },
        onCatch: () => {
          onNounNumberRecieveResponse({alertMessage: 'Request error'});
        }
      });
    }
    else if (valueConvertWordSelect === converterOptions.pluralize) {
      nounNumber.getPluralizedWords({
        wordsToPluralarize: wordsFromInputFieldToConvertWord,
        onDone: (result) => {
          onNounNumberRecieveResponse({alertMessage: 'Result: ' + result.join(' ')});
        },
        onCatch: () => {
          onNounNumberRecieveResponse({alertMessage: 'Request error'});
        }
      });
    }


    function onNounNumberRecieveResponse({alertMessage}) {
      setLoaderVisibility('hidden');
      alert(alertMessage);
    }
  }

  function handleChangeInputWordToConvert(event) {
    const valueFromInputField = event.target.value;

    setValueInputFieldToConvertWord(valueFromInputField);
  }


  return (
    <>
      <div id="loader" style={{visibility: loaderVisibility}}>
        <Loader />
      </div>

      <div className="fixed-center" style={{ fontFamily: "Arial, sans-serif" }}>
        <h1 style={{marginBottom: '50px'}}>Singularize / Pluralize</h1>

        <select className="input-soft" name="converterOptions" id="converterOptions" onChange={event => setValueConvertWordSelect(event.target.value)}>
          <option value={converterOptions.singularize}>{converterOptions.singularize}</option>
          <option value={converterOptions.pluralize}>{converterOptions.pluralize}</option>
        </select>

        <input
          type="text"
          className="input-soft"
          id="wordToConvert"
          name="wordToConvert"
          placeholder="Enter a word to convert..."
          onChange={handleChangeInputWordToConvert}
          value={valueInputFieldToConvertWord}
          autoComplete="off"
        />

        <button id="convertWord" className="button-soft" onClick={onClickConvertWordbutton}>
          Convert
        </button>
      </div>
    </>
  );
}

export default App;
