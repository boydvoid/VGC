import React, { Component } from 'react'
import collectionAPI from '../../utils/collectionAPI'
import sellAPI from '../../utils/sellAPI'
import Button from '../../Components/Button/Button';
import publicSellAPI from '../../utils/publicSellAPI';

class Sell extends Component {
  state = {
    sell: [],
    socket: this.props.socket
  }

  componentWillMount = () => {
    this.getGames();
    this.socketFunction();
  }

  socketFunction = () => {
    const { socket } = this.state;

    socket.on('added to collection', data => {
      let tempArray = this.state.collection;
      tempArray.push(data.data)
      this.setState({
        collection: tempArray
      })
    })

    socket.on('removed from sell', data => {
      let tempArray = this.state.sell;
      tempArray = tempArray.filter(array => { return array.index !== data.index })
      this.setState({
        collection: tempArray
      })
    })

  }

  getGames = () => {
    sellAPI.getSell().then(data => {
      console.log(data.data)
      this.setState({
        sell: data.data
      })
    })
  }

  removeFromSell = (event) => {
    let id = event.target.attributes.getNamedItem('data-id').value;
    let name = event.target.attributes.getNamedItem('data-name').value;
    let url = event.target.attributes.getNamedItem('data-url').value;
    let index = event.target.attributes.getNamedItem('data-index').value;

    let data = {
      id: id,
      name: name,
      url: url,
      index: parseInt(index)
    }

    sellAPI.updateSell(data).then(done => {
      const { socket } = this.state;

      socket.emit('removed from sell', data);


    })
  }

  addToPublicSell = (event) => {
    let id = event.target.attributes.getNamedItem('data-id').value;
    let name = event.target.attributes.getNamedItem('data-name').value;
    let url = event.target.attributes.getNamedItem('data-url').value;
    let index = event.target.attributes.getNamedItem('data-index').value;
    let data = {
      id: id,
      name: name,
      url: url,
      index: parseInt(index)
    }

    publicSellAPI.add(data).then(done => {
      const { socket } = this.state;
      socket.emit('added to publick sell', data);
    })

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-xl-12 d-flex" id="collection-wrapper">
            {this.state.sell.map((game, i) => {
              return (
                <div key={i} className="collection-content">
                  <img className="collection-img" src={game.url} alt="" />
                  <p>{game.name}</p>
                  <Button text="X" onclick={this.removeFromSell} dataId={game.id} dataName={game.name} dataUrl={game.url} dataIndex={game.index} />
                  <Button text="Sell Game" onclick={this.addToPublicSell} dataId={game.id} dataName={game.name} dataUrl={game.url} dataIndex={game.index} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
export default Sell;