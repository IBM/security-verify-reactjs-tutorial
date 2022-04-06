import React from 'react';
import { Header, HeaderName } from 'carbon-components-react/lib/components/UIShell';
import { Button, Tile } from 'carbon-components-react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

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

        <div style={{marginTop: "5%", marginLeft: "5%", marginRight: "5%", textAlign: "center", display:"flex", justifyContent: "center",border: "2px solid white"}}>

          <div style={{width: '500px', height: '70px', marginLeft: "2rem", marginBottom: '20rem', marginTop: '4rem', position: "relative", border: "2px solid white"}}> 
              <Tile style={{fontSize: '20px'}}>
                Login through Security Verify - <Link to="login">Login</Link>
              </Tile> 
          </div>

        </div>
      </div>
      )
    }
}

export default HomePage;


