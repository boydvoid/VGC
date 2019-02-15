import React, { Component } from 'react'
import collectionAPI from '../../utils/collectionAPI'
class Collection extends Component {
  state= {
    collection: []
  }

  componentWillMount = () => {
    this.getGames();
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
      <div>
        {this.state.collection.map((item,i) => {
          console.log(item.data)
          return (
            <div>
              <img src={item.url} alt=""/>
              <p>{item.name}</p>
            </div>
            )
        })}
      </div>
    )
  }
}
export default Collection;