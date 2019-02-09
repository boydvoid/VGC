import React, { Component } from 'react'

import GamesAPI from '../../utils/gamesAPI';
//components
import LandingIcons from '../../Components/LandingIcons/LandingIcons'
import Button from '../../Components/Button/Button'
import LandingText from '../../Components/LandingText/LandingText';
import Nav from '../../Components/Nav/Nav';


class Landing extends Component {

  state= {
    random: [],
    images: [],
    
  }

    componentDidMount  = () => {
     this.getGames();
  }

  getGames = () => {
    //get 10 newest games for a specific platform XBOX, PS4, PC
    //48 = PS4, 49 = XBOX, 6 = PC

  GamesAPI.gamesNewest().then(res => {
    console.log(res.data)
    this.setState({
      random: res.data
    })

    this.getCovers();
  })
  }


  getCovers = () => {

    let games = [];

    this.state.random.forEach(element => {
      console.log(element.cover)
      GamesAPI.coverSearch(element.cover).then(res => {
        console.log(res.data[0].url) 
        res.data[0].url = res.data[0].url.replace('t_thumb', 't_cover_big')
        games.push(res.data)
        this.setState({
          images: games
        })
      });
      
    });
   
  }
  render() {
    return (
      <div className="container-fluid">
      {this.state.images.length === 0 
      
      ? 
      
      <p>Loading</p> 
      
      : 
        <div>

        {/* landing */}
        <Nav />
        <div className="row top-div">
          <div className="col-xl-5 landing-left">
            <LandingText class="text-dark"
              topText="Your Collection."
              bottomText="One Location."
              smallText="Lorem ipsum dolor sit amet, consectetur adipiscing eli t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum."
              button={true}
              buttonText="Sign Up"
              />
          </div>
          <div className="col-xl-7 landing-right">
            <div className="imgGrid">
            {this.state.images.map((item,i) => {
              if(item[0] !== undefined){
                
                return <img key={i} src={item[0].url} alt=""/>
              }
            })}
            </div>
          </div>
        </div>
        {/* icons */}
        <div className="row">
          <div className="col-xl-12 middle-div">
            <LandingIcons icon="fas fa-search" title="Search" />
            <LandingIcons icon="fas fa-search" title="Search" />
            <LandingIcons icon="fas fa-search" title="Search" />
            <LandingIcons icon="fas fa-search" title="Search" />
            <LandingIcons icon="fas fa-search" title="Search" />
            <LandingIcons icon="fas fa-search" title="Search" />
          </div>
        </div>
        {/* free div */}
        <div className="row">
          <div className="col-xl-12">
            <div className="bottom-div">
              <LandingText class="text-light"
                topText="Free."
                bottomText="Forever."
                smallText="Lorem ipsum dolor sit amet, consectetur adipiscing eli t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum."
                button={false}
                />
            </div>
          </div>
                </div>
        </div>
    }
      </div>
    )
  }
}

export default Landing;