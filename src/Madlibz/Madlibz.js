import React, { useEffect, useState } from 'react';

function Madlibz() {

  const [story, setStory] = useState('');
  const [showErrors, setShowErrors] = useState(true);
  const [title, setTitle] = useState();
  const [blanks, setBlanks] = useState();
  const [sentences, setSentences] = useState();
  const [value, setValue] = useState('');

  const newGame = async () => {
    setValue('');
    const res = await fetch('http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25')
    if (!res.ok) {
      const error = await res.text();
      console.log(error);
    };
    const data = await res.json();
    if (data) {
      setTitle(data.title);
      setBlanks(data.blanks);
      setSentences(data.value);
      setStory('');
      setShowErrors(true);
    };
  };

  useEffect(() => {
    newGame();
  }, []);

  const handleChange = (event, index) => {
    let input = event.target.value;
    const newValue = [...value];
    newValue[index] = input;
    setValue(newValue)
  };

  const handleSubmit = () => {
    let story = [];
    let count = 0;
    for (let i = 0; i < sentences.length - 1; i++) {
      if (typeof value[i] === 'undefined') {
        setShowErrors(false);
        count++;
      };
    };
    if (count === 1) {
      for (let i = 0; i < sentences.length - 1; i++) {
        story.push(sentences[i]);
        story.push(value[i]);
        setStory(story)
      };
    };
  };

  return (
    <div className="content-area">
      <div className="form-container">
        {!story &&
          <div className="form-title">
            <h1>MADLIBZ</h1>
            <h3>Fill in all the answers to recieve a story</h3>
          </div>
        }
        <div className='content'>
          {blanks && !story && blanks.map((blank, index) =>
            <div className='blanks'>
              {!showErrors && !value[index] && <div className="error">Please fill this out</div>}
              <div className='blanksTitle'>{blank}:</div>
              <input
                onChange={(event) => { handleChange(event, index) }}
                value={value[index]}
                className={value[index]}
              />
            </div>)}
          {!story &&
            <button onClick={handleSubmit}>Submit</button>
          }
        </div>
        {story &&
          <div className="story">
            <h1>{title}</h1>
            <div>{story}</div>
            <button onClick={newGame}>New Game</button>
          </div>
        }
      </div>
    </div>
  )
};

export default Madlibz;
