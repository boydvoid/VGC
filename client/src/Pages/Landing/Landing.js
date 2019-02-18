import React, { Component } from "react";

import GamesAPI from "../../utils/gamesAPI";
import userAPI from "../../utils/userAPI";
import collectionAPI from "../../utils/collectionAPI";
import sellAPI from "../../utils/sellAPI";
// components
import LandingIcons from "../../Components/LandingIcons/LandingIcons";
import LandingText from "../../Components/LandingText/LandingText";
import Nav from "../../Components/Nav/Nav";
import Modal from "../../Components/Modal/Modal";

class Landing extends Component {
  state = {
    sRandom: [],
    sImages: [],
    sUsername: "",
    sPassword: "",
    sEmail: "",
    sPasswordMatch: "",
    sModalErrors: ""
  };

  componentDidMount = () => {
    this.getGames();
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  getGames = () => {
    // get 10 newest games for a specific platform XBOX, PS4, PC
    // 48 = PS4, 49 = XBOX, 6 = PC

    GamesAPI.getPopular().then(res => {
      this.setState({
        sRandom: res.data
      });

      this.getCovers();
    });
  };

  getCovers = () => {
    const { sRandom } = this.state;
    const gameCoverIDList = [];
    const gameCoverIDImages = [];

    sRandom.forEach(cover => {
      gameCoverIDList.push(cover.cover);
    });

    GamesAPI.gameCover(`(${gameCoverIDList})`).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].url = res.data[i].url.replace("t_thumb", "t_1080p");
        gameCoverIDImages.push(res.data[i].url);
      }

      this.setState({
        sImages: gameCoverIDImages
      });
    });
  };

  // register user console.log
  registerUser = event => {
    event.preventDefault();
    const { sUsername, sPassword, sPasswordMatch, sEmail } = this.state;

    const data = {
      username: sUsername,
      password: sPassword,
      passwordMatch: sPasswordMatch,
      email: sEmail
    };
    userAPI.registerUser(data).then(user => {
      // check the return if false user wasnt created
      console.log("anything");
      this.createUserCollection();
      if (user.data === true) {
      } else if (user.data[0] !== true) {
        this.setState({
          sModalErrors: user.data[0]
        });
      }
    });
  };

  createUserCollection = () => {
    collectionAPI.create().then(data => {
      this.createUserSell();
    });
  };

  createUserSell = () => {
    sellAPI.create().then(data => {
      window.location.reload();
    });
  };

  render() {
    const { sImages } = this.state;
    return (
      <div className="container-fluid">
        {sImages.length === 0 ? (
          // have this so the landing page doesnt show before the dashboard
          <div />
        ) : (
          <div>
            {/* landing */}
            <Nav />
            <Modal
              id="loginModal"
              login={this.loginUser}
              register={this.registerUser}
              change={this.handleInputChange}
            />
            <div className="row top-div">
              <div className="col-xl-5 landing-left">
                <LandingText
                  class="text-dark"
                  topText="Your Collection."
                  bottomText="One Location."
                  smallText="Lorem ipsum dolor sit amet, consectetur adipiscing eli t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum."
                  button
                  buttonText="Sign Up"
                />
              </div>
              <div className="col-xl-7 landing-right">
                <div className="imgGrid">
                  {sImages.map(item => {
                    if (item[0] !== undefined) {
                      return (
                        <img
                          key={item}
                          className="imgGrid-single img-fluid"
                          src={item}
                          alt=""
                        />
                      );
                    }
                  })}
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
                    <LandingText
                      class="text-light"
                      topText="Free."
                      bottomText="Forever."
                      smallText="Lorem ipsum dolor sit amet, consectetur adipiscing eli t, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum."
                      button={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Landing;
