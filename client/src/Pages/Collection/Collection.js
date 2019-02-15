import React, { Component } from 'react'
import collectionAPI from '../../utils/collectionAPI'
import './Collection.css';
import Button from '../../Components/Button/Button';
class Collection extends Component {
  state= {
    collection: [],
    socket: this.props.socket
  }

  componentWillMount = () => {
    this.getGames();
    const { socket } = this.state;
    socket.on('added to collection', data => {
      let tempArray = this.state.collection;
      tempArray.push(data)
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


  render () {
    return (
      <div className="container-fluid">
        <div className="row">
           
      <div className="col-xl-12 d-flex" id="collection-wrapper">
        {this.state.collection.map((item,i) => {
          return (
            <div key={i} className="collection-content">
              <img className="collection-img" src={item.url} alt=""/>
              <p>{item.name}</p>
              <Button text="X" onclick={this.props.removeFromCollection} />
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