import React, { Component } from 'react'

import GamesAPI from '../../utils/gamesAPI';
import LoginAPI from '../../utils/loginAPI';
//components
import LandingIcons from '../../Components/LandingIcons/LandingIcons'
import LandingText from '../../Components/LandingText/LandingText';
import Nav from '../../Components/Nav/Nav';
import Modal from '../../Components/Modal/Modal';


class Landing extends Component {

  state = {
    random: [],
    images: [],
    username: "",
    password: "",
    email: "",
    passwordMatch: "",
    modalErrors: ""

  }
  componentWillMount = () => {
    this.checkLogin();
  }
  componentDidMount = () => {
    this.getGames();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  checkLogin = event => {
    LoginAPI.checkLogin().then(user => {

    })
  }

  getGames = () => {
    //get 10 newest games for a specific platform XBOX, PS4, PC
    //48 = PS4, 49 = XBOX, 6 = PC

    GamesAPI.getPopular().then(res => {
      this.setState({
        random: res.data
      })

      this.getCovers();
    })
  }

  getCovers = () => {

    let games = [];

    this.state.random.forEach(element => {

      GamesAPI.coverSearch(element.cover).then(res => {
        res.data[0].url = res.data[0].url.replace('t_thumb', 't_cover_big')
        games.push(res.data)
        this.setState({
          images: games
        })
      });

    });
  }

  //register user console.log
  registerUser = (event) => {
    event.preventDefault();

    //reset the errors on button click
    this.setState({
      modalErrors: ""
    })
    let data = {
      username: this.state.username,
      password: this.state.password,
      passwordMatch: this.state.passwordMatch,
      email: this.state.email,
    }
    LoginAPI.registerUser(data).then(data => {
      //check the return if false user wasnt created

      if (data.data === false) {
        this.setState({
          modalErrors: "Username exists"
        })
      }
      console.log(data.data);
    })
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
            <Modal id="loginModal" login={this.loginUser} register={this.registerUser} change={this.handleInputChange} errors={this.state.modalErrors} />
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
                  {this.state.images.map((item, i) => {
                    if (item[0] !== undefined) {

                      return <img key={i} className="imgGrid-single img-fluid" src={item[0].url} alt="" />
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