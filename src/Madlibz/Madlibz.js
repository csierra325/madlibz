import React from 'react';

class Madlibz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      story: '',
      showErrors: true,
    };
  };

  newGame = async () => {
    const res = await fetch('http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25')
    if (!res.ok) {
      const error = await res.text();
      console.log(error);
    };
    const data = await res.json();
    if (data) {
      this.setState(() => ({
        title: data.title,
        blanks: data.blanks,
        sentences: data.value,
        story: '',
        value: [],
        showErrors: true,
      }));
    };
  };

  componentDidMount = async () => {
    this.newGame();
  };

  handleChange = (event, index) => {
    let input = event.target.value;
    const newValue = [...this.state.value];
    newValue[index] = input;
    this.setState({ value: newValue });
  };

  handleSubmit = () => {
    let story = [];
    let count = 0;
    for (let i = 0; i < this.state.sentences.length - 1; i++) {
      if (typeof this.state.value[i] === 'undefined') {
        this.setState({ showErrors: false })
        count++;
      };
    };
    if (count === 1) {
      for (let i = 0; i < this.state.sentences.length - 1; i++) {
        story.push(this.state.sentences[i]);
        story.push(this.state.value[i]);
        this.setState(() => ({ story }));
      };
    };
  };

  render() {
    return (
      <div className="content-area">
        <div className="form-container">
          {!this.state.story &&
            <div className="form-title">
              <h1>MADLIBZ</h1>
              <h3>Fill in all the answers to recieve a story</h3>
            </div>
          }
          <div className='content'>
            {this.state.blanks && !this.state.story && this.state.blanks.map((blank, index) =>
              <div className='blanks'>
                {!this.state.showErrors && !this.state.value[index] && <div className="error">Please fill this out</div>}
                <div className='blanksTitle'>{blank}:</div>
                <input
                  onChange={(event) => { this.handleChange(event, index) }}
                  value={this.state.value[index]}
                  className={this.state.value[index]}
                />
              </div>)}
            {!this.state.story &&
              <button onClick={this.handleSubmit}>Submit</button>
            }
          </div>
          {this.state.story &&
            <div className="story">
              <h1>{this.state.title}</h1>
              <div>{this.state.story}</div>
              <button onClick={this.newGame}>New Game</button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Madlibz;
//react hooks