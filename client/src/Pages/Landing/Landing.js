import React, { Component } from "react";

import GamesAPI from "../../utils/gamesAPI";
import userAPI from "../../utils/userAPI";
import collectionAPI from "../../utils/collectionAPI";
import wishlistAPI from "../../utils/wishlistAPI";
import sellAPI from "../../utils/sellAPI";
// components
import LandingIcons from "../../Components/LandingIcons/LandingIcons";
import LandingText from "../../Components/LandingText/LandingText";
import Nav from "../../Components/Nav/Nav";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";

class Landing extends Component {
  state = {
    sRandom: [],
    sImages: [],
    sUsername: "",
    sPassword: "",
    sEmail: "",
    sPasswordMatch: "",
    sModalErrors: "",
    showRegister: false,
    socket: this.props.socket
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
      if (user.data === true) {
        this.createUserCollection();
      } else if (user.data[0] !== true) {
        this.setState({
          sModalErrors: user.data[0]
        });
      }
    });
  };

  createUserCollection = () => {
    collectionAPI.create().then(data => {
      this.createWishlist();
    });
  };

  createWishlist = () => {
    wishlistAPI.create().then(data => {
      this.createUserSell();
    });
  };

  createUserSell = () => {
    sellAPI.create().then(data => {
      window.location.reload();
    });
  };

  updateModal = () => {
    if (this.state.showRegister === false) {
      this.setState({
        showRegister: true
      });
    } else {
      this.setState({
        showRegister: false
      });
    }
  };

  render() {
    const { sImages } = this.state;
    return (
      <div className="container-fluid">
        {this.state.sImages.length === 0 ? (
          // have this so the landing page doesnt show before the dashboard
          <div />
        ) : (
          <div>
            {/* landing */}
            <Nav />
            <Modal
              id="loginModal"
              showRegister={this.state.showRegister}
              updateModal={this.updateModal}
              login={this.loginUser}
              register={this.registerUser}
              change={this.handleInputChange}
              errors={this.state.modalErrors}
            />
            <div className="row top-div">
              <div className="col-xl-5 landing-left">
                <LandingText
                  class="text-dark"
                  topText="Your Collection."
                  bottomText="One Location."
                  smallText="VGC provides users with a modern way to keep track of their collection that's accessible on any device. Simply create an account and start adding games to your collection."
                  button
                  buttonText="Login/Register"
                  toggle="modal"
                  target="#loginModal"
                />
              </div>
              <div className="col-xl-7 landing-right">
                <div className="imgGrid">
                  {this.state.sImages.map(item => {
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
            </div>
            {/* icons */}
            <div className="row">
              <div className="col-xl-12 middle-div">
                <LandingIcons
                  icon="fas landing-fa fa-search"
                  title="Instant Search"
                />
                <LandingIcons
                  icon="fas landing-fa fa-database"
                  title="Database Support"
                />
                <LandingIcons
                  icon="fas landing-fa fa-list-alt"
                  title="Detailed Game Information"
                />
                <LandingIcons
                  icon="fas landing-fa fa-dollar-sign"
                  title="Buy/Sell Games"
                />
                <LandingIcons
                  icon="fas landing-fa fa-sitemap"
                  title="Game Relations"
                />
                <LandingIcons
                  icon="fas landing-fa fa-object-group"
                  title="Easy-To-Use Design"
                />
              </div>
            </div>
            {/* free div */}
            <div className="row">
              <div className="col-xl-12 remove-padding">
                <div className="bottom-div">
                  <LandingText
                    class="text-light"
                    topText="Free."
                    bottomText="Forever."
                    smallText="We're not kidding when we say Free Forever. VGC is a passion project and charging for such would dilute its purpose."
                    button={false}
                  />
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
