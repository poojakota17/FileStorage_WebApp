
import React, { useEffect, useState } from 'react';
import './App.css';
//import { withAuthenticator, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react'
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react'
//import { withAuthenticator, AmplifySignUp } from 'aws-amplify-react'
import { Auth } from 'aws-amplify';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import awsconfig from './aws-exports';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

Amplify.register(Auth)
Amplify.configure(awsconfig);
API.configure(config);


var token
var role;

class SendTweet extends React.Component {
  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.state = {
      selectedFile: null
    }
    this.state = { text: '', result: '' };
  }
  callAPI = (data, method, url) => {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object

    myHeaders.append("Authorization", token);

    // using built in JSON utility package turn object to string and store in a variable
    //var raw = JSON.stringify(params);
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(response => {
        document.getElementById("uploadCaptureInputFile").value = ""
        alert(response)
      })
      .then(result => this.setState({ "result": JSON.parse(result).body }))
      .catch(error => console.log(error))
  }
  callAPI2 = (method, url) => {
    var header = new Headers;
    header.append("Authorization", token);
    var request = {
      method: method,
      headers: header,
      redirect: 'follow'
    };
    fetch(url, request)
      .then(response => response.text())
      .then(response => alert(response))
      .catch(error => console.log(error))
  }

  myChangeHandler = event => {
    this.setState({ text: event.target.value })
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  // myDownloadhandler = (event) => {
  //   event.preventDefault();
  //   this.callAPI2('GET', 'https://oie96n6v9e.execute-api.us-east-1.amazonaws.com/newdev/items');

  // }
  mySubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.selectedFile.size > 10485760) {
      alert("Please select a file less than 10MB!");
      document.getElementById("uploadCaptureInputFile").value = "";
    }
    else {
      let data = new FormData();
      data.append('file', this.state.selectedFile)
      data.append('filedescription', this.state.text)
      console.log(this.state.selectedFile.name)
      console.log(data)
      this.callAPI(data, 'POST', 'https://oie96n6v9e.execute-api.us-east-1.amazonaws.com/newdev/items');
    }
  }
  render() {

    return (
      <div>
        <Form inline onSubmit={this.mySubmitHandler} role="form">

          <Form.File id="uploadCaptureInputFile" onChange={this.onChangeHandler} label="Select a file to upload(<10MB): " />

          <Form.Group>

            <Form.Control as="textarea" rows={3} className="mr-sm-3" type="text" onChange={this.myChangeHandler} placeholder="File Description" />

          </Form.Group>
          <Form.Group>
            <Button type="submit" md={4} variant="primary"   >Upload File</Button>{' '}
          </Form.Group>

          {/* <a href ="" color = "white" onClick ={this.myDownloadhandler}>Download</a> */}
        </Form>
      </div>
    );
  }
}

class Listfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []

    };
    this.callAPI3 = this.callAPI3.bind(this);
  };

  callAPI3 = (method, url) => {
    var header = new Headers;

    header.append("Authorization", token);
    var request = {
      method: method,
      headers: header,
      redirect: 'follow'
    };

    fetch('https://oie96n6v9e.execute-api.us-east-1.amazonaws.com/newdev/items', request)
      .then(response => response.text())

      .then(response => {
        console.log(response)
        //console.log(typeof(JSON.parse(response)))
        this.setState({ data: JSON.parse(response) })

      })
      .catch(error => console.log(error))
  };

  handleClick(filename) {

    var header = new Headers;
    header.append("Content-Type", "application/json");
    header.append("Authorization", token);
    var request = {
      method: 'DELETE',
      headers: header,
      body: JSON.stringify({ "filename": filename }),
      redirect: 'follow'
    };

    fetch('https://oie96n6v9e.execute-api.us-east-1.amazonaws.com/newdev/items', request)
      .then(response => response.text())
      .then(response => alert(response))

    this.mySubmitHandler()
      .catch(error => console.log(error))
      .catch(error => alert(error))

  }


  mySubmitHandler = (event) => {
    event.preventDefault();
    console.log(token)
    this.callAPI3('GET', 'https://oie96n6v9e.execute-api.us-east-1.amazonaws.com/newdev/items');



  }


  renderRow(index, element) {
    return (

      <div>
        <Row>
          {role === "Admin" &&
            <Col md="auto">{element.Name} </Col>
          }

          <Col md="auto" >{element.filename} <br></br>
            <a href={element.link} target="_blank" download>Download</a> {' '}
            <Button type="input" onClick={() => this.handleClick(element.filename)} variant="danger">Delete</Button>
          </Col>
          <Col md="auto" >
            {element.Uploaded_Time.substring(4, 25)} <br></br>/ {element.LastModified_time.substring(4, 25)}
          </Col>
          <Col md="auto">{element.file_description} </Col>
        </Row>
      </div >
    )

  }


  render() {
    var result = this.state.data.map((element, index) => this.renderRow(index, element))
    return (

      <div>
        <Button type="submit" size="lg" variant="primary" onClick={this.mySubmitHandler} >List Files</Button>{' '}
        { role === "Admin" &&
          <div>
            <Alert variant="success">
              <Alert.Heading>Hey Admin, here are the user details. Manage user's files carefully!!!!!!</Alert.Heading>
            </Alert>
            <Row >

              <Col md="auto">Last Name, First Name</Col>
              <Col md="auto">File Name</Col>
              <Col md="auto"> Uploaded Time/<br></br>Updated Time (UTC)</Col>
              <Col md="auto">File Description</Col>
            </Row>
            {result}
          </div>
        }
        {role !== undefined && role !== 'Admin' &&
          <div>

            <Row>
              <Col font-color="#6c757d" >File Name</Col>
              <Col > Uploaded Time / Last Modified Time(UTC)</Col>
              <Col  >File Description</Col><br></br>
            </Row>
            <br></br>{result}

          </div>
        }
      </div>


    )
  }
}





// function App() {

// const [username,setUser] = useState();
// useEffect(() => {
//   /* Get the AWS credentials for the current user from Identity Pools.  */
//   Auth.currentSession()
//     .then(cognitoUser => {
//      // console.log(cognitoUser)
//       const {idToken: { payload}} = cognitoUser
//       const {idToken: { jwtToken}} = cognitoUser
//       var {accessToken: {username}} = cognitoUser
//       token = jwtToken;
//       user = username;
//       console.log(payload)
//       console.log(payload.aud)
//       setUser(payload['cognito:username'] );

//     })
//   }, [])

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [username, setUsername] = React.useState();
  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)





      //console.log(authData);

      Auth.currentSession()
        .then(cognitoUser => {
          const { idToken: { jwtToken } } = cognitoUser
          token = jwtToken;
          //const {payload['cognito:username']} = cognitoUser;
          const { idToken: { payload } } = cognitoUser;
          setUsername(payload);
          role = cognitoUser.idToken.payload['custom:Role'];
          console.log('showing user')
          console.log(cognitoUser.idToken.payload['custom:Role'])
          console.log(payload)
          console.log(username)

        })
    })

  }, []);



  return authState === AuthState.SignedIn && user ? (

    <Container fluid className="App-header" >

      <div>
        <h1 style={{ textAlign: "center" }}>Welcome! {user.attributes.name} {user.attributes.family_name} </h1>
        <br></br>
      </div>
      <Col>
        <Row>

          <SendTweet />
        </Row><br></br>
        <Row> <Listfiles /></Row>
      </Col>
      <div><AmplifySignOut /></div>



    </Container>
  ) : (<AmplifyAuthenticator>
    <AmplifySignUp
      slot="sign-up"
      headerText="Welcome to File Storage Application Sign Up "
      formFields={[

        { type: "username" },
        { type: "password" },
        { type: "email" },

        {
          type: "name",
          label: "First Name *",
          required: true,
          placeholder: "First Name"
        },
        {
          type: "family_name",
          label: "Last Name *",
          required: true,
          placeholder: "Last Name"
        },
        {
          type: "custom:Role",
          label: "Role *",
          required: true,
          placeholder: "Accepted values: Admin/Enduser"
        }
      ]}
    />
    <AmplifySignIn headerText="Welcome to File Storage Application Sign-In" slot="sign-in"></AmplifySignIn>
  </AmplifyAuthenticator>
    );
}

export default AuthStateApp;