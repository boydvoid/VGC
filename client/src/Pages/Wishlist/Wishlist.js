import React, { Component } from "react";
import collectionAPI from "../../utils/collectionAPI";
import sellAPI from "../../utils/sellAPI";
import "./Wishlist.css";
import Button from "../../Components/Button/Button";
import publicSellAPI from "../../utils/publicSellAPI";
import wishlistAPI from "../../utils/wishlistAPI";

class Collection extends Component {
  state = {
    username: this.props.username,
    wishlist: [],
    socket: this.props.socket
  };

  componentWillMount = () => {
    this.getGames();
    this.socketFunction();
  };

  socketFunction = () => {
    const { socket } = this.state;

    socket.on("added to wishlist", data => {
      const { username, wishlist } = this.state;
      const tempArray = wishlist;
      tempArray.push(data.data.data);
      if (data.username === username) {
        this.setState({
          wishlist: tempArray
        });
      }
    });

    socket.on("removed from wishlist", data => {
      console.log(data);
      const { wishlist } = this.state;
      let tempArray = wishlist;
      const { username } = this.state;
      tempArray = tempArray.filter(array => {
        return array.index !== data.data.index;
      });
      if (data.username === username) {
        this.setState({
          wishlist: tempArray
        });
      }
    });
  };

  getGames = () => {
    wishlistAPI.getGames().then(data => {
      this.setState({
        wishlist: data.data
      });
    });
  };

  removeFromWishlist = event => {
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

    wishlistAPI.updateGames(data).then(done => {
      const { socket } = this.state;
      socket.emit("removed from wishlist", data);
    });
  };

  removeFromPublicSell = data => {
    publicSellAPI.removeSell(data).then(done => {
      console.log(done);
    });
  };

  render() {
    const { wishlist } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="w-100 d-flex p-20 section-title">
            <h2 className="primaryText">Wishlist</h2>
          </div>
          {this.state.wishlist.map((game, i) => {
            return (
              <div
                key={i}
                gameid={game.id}
                className="col-xl-3 collection-content text-center"
                onClick={this.props.getGameInfo}
              >
                <img
                  className="collection-img"
                  gameid={game.id}
                  src={game.url}
                  alt=""
                />
                <h2 gameid={game.id} className="gameName">
                  {game.name}
                </h2>
                <Button
                  text="X"
                  onclick={this.removeFromWishlist}
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
    );
  }
}
export default Collection;
