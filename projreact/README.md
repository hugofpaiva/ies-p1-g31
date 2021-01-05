# StoreGO Web Application

### An automated store monitoring and control application.

React application based on [Devias Kit Template](https://material-ui.com/store/items/devias-kit/)




## How to Install  

**node.js** is required to run a React app. The instalation guide for it can be found [here](https://nodejs.org/en/).

  When installing node.js, npm should also installed on your computer. If you prefer to use *yarn* instead, also [install it](https://classic.yarnpkg.com/en/docs/install/).

  

### Install dependencies

1. Clone the repository

2. ```cd projreact```

3. Install packages using ```npm install``` **or** ```yarn install```

  

## How to Run Web Application

Inside the project directory, run the following built-in commands:

1. ```npm start``` **or** ```yarn start```

2. The app should be running in [http://localhost:3000](http://localhost:3000) 



## Spring API Usage

When the user is authenticated, his authentication token is stored at the local storage with key `token`. His role (MANAGER or EMPLOYEE) is also stored there, with key `authority`. 

To use the Spring API every request must send the authentication token in the header.  

```react
const requestOptions = {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ myjson: 'here' })
};
const response = await fetch('URL', requestOptions);
const data = await response.json();
```

> Based on https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples