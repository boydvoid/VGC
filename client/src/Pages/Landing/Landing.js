import React, { Component } from 'react'

//components
import LandingIcons from '../../Components/LandingIcons/LandingIcons'
import Button from '../../Components/Button/Button'
import LandingText from '../../Components/LandingText/LandingText';
import Nav from '../../Components/Nav/Nav';
class Landing extends Component {
  render() {
    return (
      <div className="container-fluid">
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
            right
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
          <div className="col-12">
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
    )
  }
}

export default Landing;