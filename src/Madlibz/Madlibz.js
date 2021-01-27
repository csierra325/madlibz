import React from 'react';

class Madlibz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '',
      showErrors: true,
    }
  }

  newGame = async () => {
    const res = await fetch('http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25')
    if (!res.ok) {
      const error = await res.text();
      console.log(error);
    }
    const data = await res.json()
    if (data) {
      this.setState(() => ({
        title: data.title,
        blanks: data.blanks,
        valuesGiven: data.value,
        result: '',
        value: [],
        error: [],
      }));
    }
  }

  componentDidMount = async () => {
    this.newGame()
  }

  handleChange = (event, index) => {
    let input = event.target.value;
    const newValue = [...this.state.value];
    newValue[index] = input
    this.setState({ value: newValue });
  }

  handleSubmit = () => {
    // let result = [];
    // for (let i = 0; i < this.state.valuesGiven.length - 1; i++) {
    //   if (!this.state.value[i]) {
    //     this.setState(() => ({
    //       error: 'please fill this out'
    //     }))
    //   } else {
    //     result.push(this.state.valuesGiven[i]);
    //     result.push(this.state.value[i]);
    //   }
    // }
    // this.setState(() => ({
    //   result,
    // }))

    const error = this.state.blanks.map((blank, i) => !this.state.value[i]);
    this.setState({ error });

    // this.setState({ showErrors: false })
  }

  render() {
    return (
      <div className="content-area">
        <div className="form-container">
          {!this.state.result &&
            <div className="form-title">
              <h1>MADLIBZ</h1>
              <h3>Fill in all the answers to recieve a story</h3>
            </div>
          }
          <div className='content'>
            {this.state.blanks && !this.state.result && this.state.blanks.map((blank, index) =>
              <div className='blanks'>
                {this.state.error[index] && <div>Please fill this out</div>}

                {/* {!this.state.showErrors && !this.state.value[index] && <div>Please fill this out</div>} */}
                <div className='blanksTitle'>{blank}:</div>
                <input
                  onChange={(event) => { this.handleChange(event, index) }}
                  value={this.state.value[index]}
                  className={this.state.value[index]}
                />
              </div>)}
            {!this.state.result &&
              <button onClick={this.handleSubmit}>Submit</button>
            }
          </div>
          {this.state.result &&
            <div className="story">
              <h1>{this.state.title}</h1>
              <div>{this.state.result}</div>
              <button onClick={this.newGame}>New Game</button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Madlibz;
//error handle / vali
//react hooks
//clean names !!!! very important : (
//!!this.state.result.length
//this.state.reult.length