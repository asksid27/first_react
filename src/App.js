import React, { Component } from 'react';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true, 
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/')
  //     .then(response => response.json())
  //     .then(console.log);
  // }

  calculateFaceLocation = (data) => {
    const detect = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimg');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: detect.left_col * width,
      topRow: detect.top_row * height,
      rightCol: width - ( detect.right_col * width ),
      bottomRow: height - ( detect.bottom_row * height )
    }
  }

  boxDisplay = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
      fetch('https://agile-brushlands-82994.herokuapp.com/imageurl',{ 
        method: 'post', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({ 
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://agile-brushlands-82994.herokuapp.com/image',
            { method: 'put', 
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify({ 
                id: this.state.user.id
              })
            }
          )
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(err => console.log(err));
        }
      this.boxDisplay(this.calculateFaceLocation(response))
    })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true});
      this.setState({route: route});
    }  
    else{
      this.setState({isSignedIn: false});
      this.setState(initialState);
      this.setState({route: route});
    }
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
        route === 'signin'
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        : ( route === 'home'
          ? 
            <div>
              <Logo />
              <Rank entries={this.state.user.entries} name={this.state.user.name} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
