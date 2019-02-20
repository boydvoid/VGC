import React, { Component } from "react";
import sellAPI from "../../utils/sellAPI";
import Button from "../../Components/Button/Button";
import publicSellAPI from "../../utils/publicSellAPI";

class Sell extends Component {
  state = {
    username: this.props.username,
    sSell: [],
    socket: this.props.socket
  };

  componentWillMount = () => {
    this.getGames();
    this.socketFunction();
  };

  socketFunction = () => {
    const { socket } = this.state;
    socket.on("removed from sell", data => {
      const { username } = this.state;
      const tempArray = this.state.sSell.filter(array => {
        return array.index !== data.data.index;
      });
      if (username === data.username) {
        this.setState({
          sSell: tempArray
        });
      }
    });
  };

  getGames = () => {
    sellAPI.getSell().then(data => {
      this.setState({
        sSell: data.data
      });
    });
  };

  removeFromSellPage = event => {
    const id = event.target.attributes.getNamedItem("data-id").value;
    const name = event.target.attributes.getNamedItem("data-name").value;
    const url = event.target.attributes.getNamedItem("data-url").value;
    const index = event.target.attributes.getNamedItem("data-index").value;

    const data = {
      id,
      name,
      url,
      index: parseInt(index) // eslint-disable-line
    };

    sellAPI.updateSell(data).then(done => {
      this.removeFromPublicSell(data);
    });
  };

  removeFromPublicSell = data => {
    publicSellAPI.removeSell(data).then(done => {
      const { socket } = this.state;
    });
  };

  render() {
    const { sSell } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 d-flex" id="collection-wrapper">
            {sSell.map(game => {
              console.log(game);
              return (
                <div key={game.index} className="collection-content">
                  <img className="collection-img" src={game.url} alt="" />
                  <p>{game.name}</p>
                  <Button
                    text="X"
                    onclick={this.removeFromSellPage}
                    dataId={game.id}
                    dataName={game.name}
                    dataUrl={game.url}
                    dataIndex={game.index}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Sell;
