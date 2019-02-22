import React, { Component } from "react";
import collectionAPI from "../../utils/collectionAPI";
import sellAPI from "../../utils/sellAPI";
import "./Collection.css";
import Button from "../../Components/Button/Button";
import publicSellAPI from "../../utils/publicSellAPI";

class Collection extends Component {
  state = {
    username: this.props.username,
    collection: this.props.collection,
    latestAdditions: [],
    socket: this.props.socket
  };

  componentWillMount = () => {
    this.socketFunction();
  };

  socketFunction = () => {
    const { socket } = this.state;

    socket.on("added to collection", data => {
      const { username, collection } = this.state;
      const tempArray = collection;
      tempArray.push(data.data.data);
      if (data.username === username) {
        this.setState({
          collection: tempArray
        });
      }
    });

    socket.on("removed from collection", data => {
      const { collection } = this.state;
      let tempArray = collection;
      const { username } = this.state;
      tempArray = tempArray.filter(array => {
        return array.index !== data.data.index;
      });
      if (data.username === username) {
        this.setState({
          collection: tempArray
        });
      }
    });
  };

 

  removeFromCollection = event => {
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

    collectionAPI.updateGames(data).then(done => {
      const { socket } = this.state;
      this.removeFromSell(data);
      socket.emit("removed from collection", data);
    });
  };

  removeFromSell = data => {
    sellAPI.updateSell(data).then(done => {
      const { socket } = this.state;
      this.removeFromPublicSell(data);
      socket.emit("removed from sell", data);
    });
  };

  removeFromPublicSell = data => {
    publicSellAPI.removeSell(data).then(done => {
      console.log(done);
    });
  };

  addToSell = event => {
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
    sellAPI.add(data).then(done => {
      // live update with reloading page
      const { socket } = this.state;
      socket.emit("added to sell", done);

      this.addToPublicSell(data);
    });
  };

  addToPublicSell = data => {
    publicSellAPI.add(data).then(done => {
      const { socket } = this.state;
      socket.emit("added to public sell", data);
    });
  };

  render() {
    const { collection } = this.state;
    return (
      <div className="container-fluid">
        <div className="row" style={{padding: "25px"}}>
          <div className="w-100 d-flex p-20 section-title">
            <h2 className="primaryText">Collection</h2>
          </div>
          {collection.map((game, i) => {
            return (
              <div
                key={i}
                className="col-xl-3 collection-content text-center d-flex"
                gameid={game.id}
              >
                <div>
                  <img
                    onClick={this.props.getGameInfo}
                    className="collection-img"
                    src={game.url}
                    alt=""
                    gameid={game.id}
                  />
                  <h2 gameid={game.id} className="gameName">
                    {game.name}
                  </h2>
                </div>
                <div>
                  <Button
                      text="X"
                      onclick={this.removeFromCollection}
                      dataId={game.id}
                      dataName={game.name}
                      dataUrl={game.url}
                      dataIndex={game.index}
                      class="collection-btn"
                  />
                  <Button
                      text="Add to Sell List"
                      onclick={this.addToSell}
                      dataId={game.id}
                      dataName={game.name}
                      dataUrl={game.url}
                      dataIndex={game.index}
                      class="collection-btn"
                    />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Collection;
