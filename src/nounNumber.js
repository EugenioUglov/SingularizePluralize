class NounNumber {
  getSingularizedWord = async(wordToSingularize, onDone, onCatch) => {
    this.#getConvertedWord({
      url: `https://yessirapi.onrender.com/singular?request=` + wordToSingularize,
      onDone: onDone,
      onCatch: onCatch
    });
  }

  getPluralizedWord = async(wordToPluralize, onDone, onCatch) => {
    this.#getConvertedWord({
      url: `https://yessirapi.onrender.com/plural?request=` + wordToPluralize,
      onDone: onDone,
      onCatch: onCatch
    });
  }

  getSingularizedWords = async({wordsToSingularize, onDone, onCatch}) => {
    const getSingularizedWordFunction = this.getSingularizedWord;

    this.#getConvertedWords({
      wordsToConvert: wordsToSingularize, 
      functionToConvert: getSingularizedWordFunction, 
      onDone: onDone, 
      onCatch: onCatch
    });
  }

  getPluralizedWords = async({wordsToPluralarize, onDone, onCatch}) => {
    const getPluralizedWordFunction = this.getPluralizedWord;

    this.#getConvertedWords({
      wordsToConvert: wordsToPluralarize, 
      functionToConvert: getPluralizedWordFunction, 
      onDone: onDone, 
      onCatch: onCatch
    });
  }

  
  async getSingularizedWordsOld({wordsToSingularize, onDone, onCatch}) {
    let countSingularizedWords = 0;
    const singularizedWords = [];

    const getSingularizeWordsPromise = new Promise((resolve, reject) => {
      wordsToSingularize.map((wordToSingularize) => {
        return this.getSingularizedWord(
          wordToSingularize,
          (singularizedWord) => {
            singularizedWords.push(singularizedWord);
            countSingularizedWords++;
            if (countSingularizedWords >= wordsToSingularize.length) {
              resolve(singularizedWords);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });

    getSingularizeWordsPromise.then(
      (singularizedWords) => {
        if (onDone !== undefined) onDone(singularizedWords);
      },
      (error) => {
        if (onCatch !== undefined) onCatch(error);
      }
    );
  }


  async #getConvertedWords({wordsToConvert, functionToConvert, onDone, onCatch}) {
    let countConvertedWords = 0;
    const convertedWords = [];

    const getConvertedWordsPromise = new Promise((resolve, reject) => {
      wordsToConvert.map((wordToConvert) => {
        return functionToConvert(
          wordToConvert,
          (convertedWord) => {
            convertedWords.push(convertedWord);
            countConvertedWords++;
            if (countConvertedWords >= wordsToConvert.length) {
              resolve(convertedWords);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });

    getConvertedWordsPromise.then(
      (convertedWords) => {
        if (onDone !== undefined) onDone(convertedWords);
      },
      (error) => {
        if (onCatch !== undefined) onCatch(error);
      }
    );
  }

  async #getConvertedWord({url, onDone, onCatch}) {
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (onDone !== undefined) onDone(data.response);
    })
    .catch((error) => {
      if (onCatch !== undefined) onCatch(error);
    });
  }
}

export default NounNumber;