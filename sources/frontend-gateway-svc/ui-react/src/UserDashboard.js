import React from 'react';
import { Header, HeaderName } from 'carbon-components-react/lib/components/UIShell';
import { Tile, Button, Tabs, Tab, TextInput } from 'carbon-components-react';

class UserDashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        recvdWeatherData: false,
        weatherData: "",
        recvdProfileInfo: false,
        ProfileInfo: ""
      };
    }

    getUserProfile = async () => {
      alert("Fetching the profile information...");
      let URL = "/getUserProfile"
      await fetch(URL, { method: "get" })
        .then(res => {
          return res.json();
        })
        .then(
            (result) => {
                // alert(JSON.stringify(result));
              let response = JSON.stringify(result);
              this.setState( {recvdProfileInfo: true, ProfileInfo: response} );
        },
        (error) => {
          alert(error);
          }
        )
    }

    getWeatherDetails = async () => {
      const inputLocation = document.getElementById('location').value;
      
      if ( inputLocation ){
        alert("Fetching Weather Details ....");
        let URL = "/getWeatherDetails/" + inputLocation;
        
        await fetch(URL, { method: "get" })
        .then(res => {
          return res.json();
        })
        .then(
            (result) => {
              let testStr = JSON.stringify(result);
              this.setState( {recvdWeatherData: true, weatherData: testStr} );
        },
        (error) => {
          alert(error);
          }
        )
      } else {
        alert("Location is not provided.");
      }
    }

    render(){
   
        return (
        <div>
          <div className="container">
            <Header aria-label="IBM Platform Name" >
              <HeaderName href="#" prefix="" style={{ marginLeft: "43%", fontSize: "25px"}}>
              Demo App
              </HeaderName>
            </Header>
          </div>

          <div style={{marginTop: "5%", marginLeft: "5%", marginRight: "5%", textAlign: "center", display:"flex", border: "2px solid white", justifyContent: "center"}}>
          {/* border: "2px solid red", */}

              <div style={{ marginLeft: "2rem", marginBottom: '20rem', marginTop: '2rem', marginRight: "2rem", border: "2px solid white", width: "80%", height: "70px", textAlign:"left", position: "relative"}}> 
                <Tile>
                  <h4>Welcome !</h4>
                </Tile> 
              </div>
            
              <div style={{ marginLeft: "2rem", marginBottom: '2rem', marginTop: '10rem', marginRight: "2rem", border: "1px solid gray", width: "72%", textAlign:"left", position: "absolute"}}> 
              
              <Tabs scrollIntoView={false} type="container">
                  <Tab href="#" id="tab-1" label="User Profile">
                    <div className="some-content" style = {{ border: "2px solid white"}}>
                        Click on the following button to get your profile details.
                        <br/><br/>
                        <Button  kind="primary" tabIndex={0} type="submit"
                          onClick={(e) => {this.getUserProfile(e)}}>
                          Get My Profile
                        </Button>
                        <br/><br/>
                      
                      {!this.state.recvdProfileInfo? null : this.state.ProfileInfo}
                    </div>
                  </Tab>

                  <Tab href="#" id="tab-2" label="Weather Updates" >
                    <div className="some-content">
                      You would like to know the weather of:
                      <br/><br/>
                      <TextInput
                        id="location"
                        invalidText="Invalid error message."
                        labelText=""
                        placeholder="Provide the location"
                        required
                      />
                      <br/><br/>
                      <Button kind="primary" tabIndex={0} type="submit"
                        onClick={(e) => {this.getWeatherDetails(e)}}>
                        Get Weather Updates
                      </Button>
                      <br/><br/>
                      
                      {!this.state.recvdWeatherData? null : this.state.weatherData}
                    </div>
                  </Tab>
                </Tabs>

              
              </div>
          </div>
        </div>
        )
    }
}

export default UserDashboard;


