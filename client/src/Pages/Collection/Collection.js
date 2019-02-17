import React, { Component } from 'react'
import collectionAPI from '../../utils/collectionAPI'
import sellAPI from '../../utils/sellAPI'
import './Collection.css';
import Button from '../../Components/Button/Button';
import publicSellAPI from '../../utils/publicSellAPI';
class Collection extends Component {
  state= {
    collection: [],
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

    socket.on('removed from collection', data => {
      let tempArray = this.state.collection;
      tempArray = tempArray.filter(array => {return array.index !== data.index})
      this.setState({
        collection: tempArray
      })
    }) 

  }

  getGames = () => {
    collectionAPI.getGames().then(data => {
      console.log(data.data)
      this.setState({
        collection: data.data
      })
    })
  }

  removeFromCollection = (event) => {
		let id= event.target.attributes.getNamedItem('data-id').value;
		let name= event.target.attributes.getNamedItem('data-name').value;
    let url= event.target.attributes.getNamedItem('data-url').value;
    let index= event.target.attributes.getNamedItem('data-index').value;
     
		let data = {
			id: id,
			name: name,
      url: url,
      index: parseInt(index) 
    }

    collectionAPI.updateGames(data).then(done => {
      const { socket } = this.state;

      socket.emit('removed from collection', data);

 
    })
  }
  
  addToSell =(event) => {
    console.log("pressed sell")
    let id= event.target.attributes.getNamedItem('data-id').value;
		let name= event.target.attributes.getNamedItem('data-name').value;
		let url= event.target.attributes.getNamedItem('data-url').value;
    let index= event.target.attributes.getNamedItem('data-index').value;
		let data= {
			id: id,
			name: name,
			url: url,
			index: parseInt(index) 
		}
		sellAPI.add(data).then((done) => {
			//live update with reloading page
			const { socket } = this.state;
			socket.emit('added to sell', done);
    
      this.addToPublicSell(data)
		})
  }

  addToPublicSell = (data) => {

    publicSellAPI.add(data).then(done => {
      const { socket } = this.state;
      socket.emit('added to public sell', data);
    })

  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
           
        <div className="col-xl-12 d-flex" id="collection-wrapper">
          {this.state.collection.map((game,i) => {
            return (
              <div key={i} className="collection-content">
                <img className="collection-img" src={game.url} alt=""/>
                <p>{game.name}</p>
                <Button text="X" onclick={this.removeFromCollection} dataId={game.id} dataName={game.name} dataUrl={game.url} dataIndex={game.index}/>
                <Button text="Add to Sell List" onclick={this.addToSell} dataId={game.id} dataName={game.name} dataUrl={game.url} dataIndex={game.index}/>
              </div>
              )
          })}
        </div>
        </div> 
      </div>
    )
  }
}
export default Collection;