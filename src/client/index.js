import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    BelegTypeList: null,
    betragTotalarr: [],
  };
  submit = async () => {
    const BelegTypes = await fetch('/belegTypes');
    const BelegTypeList = JSON.parse(await BelegTypes.text());

    let betragTotalarr = [];
    BelegTypeList.forEach(async type => {
      const betragTotalres = await fetch('/betrag?type=' + type);
      const val = JSON.parse(await betragTotalres.text())[0].total;
      betragTotalarr.push(val || 0);
      console.log(val);

      //console.log(JSON.parse(await betragTotalres.text())[0].total);
      this.setState({
        BelegTypeList,
        betragTotalarr,
      });

    });

  }
  render() {
    return <div>
      <h1>Deusche Bahn</h1>
      <button onClick={this.submit}>fetch BelegTypeList</button>
      <pre dangerouslySetInnerHTML={{ __html: this.state.BelegTypeList }}></pre>
      <h1>{this.state.betragTotalarr.toString()}</h1>
    </div>;
  }
}

render(<App />, document.getElementById('root'));
