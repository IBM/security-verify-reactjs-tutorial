# Add SSO to a ReactJs based app using Security Verify 

Intro:
This tutorial will help you to understand the ...



Steps:

1. Security Verify Setup
2. Build & Deploy user management service
3. Build & Deploy weather api 


**4. Build & Deploy frontend gateway service**

When we create a react app, it runs on its own server (express). You can configure any other server of your choice as well like apollo. You can navigate to different components in React app using React Router mechanism. If you need to call any backend APIs from your react pages, then you can achieve it in two ways - either embed the backend API call in your React pages itself or use a gateway service to call other APIs and using proxy your react pages can call gateway service APIs. In microservices based architecture, having gateway service in between is recommended as it provides more flexibility to handle the changes in API call. In this case your UI application and gateway service runs as two different applications. Running multiple applications during development phase is fine but for production it is good to be bundled as one application which ease out the process of maintenance and increases performance too. Read this [blog](https://www.ibm.com/cloud/blog/react-web-express-api-development-production) for more information.

To integrate React UI with security verify,  we need to do login using security verify page and then come back to React UI.
Here in this tutorial, the UI code is available at `sources/frontend-gateway-svc/ui-react`. 


