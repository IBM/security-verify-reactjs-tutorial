import React from 'react';
import { Header, HeaderName } from 'carbon-components-react/lib/components/UIShell';
import { Tile } from 'carbon-components-react';

class HomePage extends React.Component {

    render(){

      let loginURL = 'http://' + window.location.hostname + '/login';

      return (
      <div>
        <div className="container">
          <Header aria-label="IBM Platform Name" >
            <HeaderName href="#" prefix="" style={{ marginLeft: "43%", fontSize: "25px"}}>
              Demo App
            </HeaderName>
          </Header>
        </div>

        <div style={{marginTop: "5%", marginLeft: "5%", marginRight: "5%", textAlign: "center", display:"flex", justifyContent: "center",border: "2px solid white"}}>

          <div style={{width: '500px', height: '70px', marginLeft: "2rem", marginBottom: '20rem', marginTop: '4rem', position: "relative", border: "2px solid white"}}> 
              <Tile style={{fontSize: '20px'}}>
                Login through Security Verify - <a target="_blank" href={loginURL}>Login</a>
              </Tile> 
          </div>

        </div>
      </div>
      )
    }
}

export default HomePage;


