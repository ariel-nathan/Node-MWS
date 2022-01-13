<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** ariel-nathan, Node-MWS-API, twitter_handle, nathanariel17@gmail.com, Node MWS API, A backend application that pulls scheduled MWS reports every hour. It then uploads the reports to a MongoDB Database and emails you with the status. Finally it creates API endpoints in which you can access the data.
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

![lastcommit-shield]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ariel-nathan/Node-MWS-API">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Node MWS API</h3>

  <p align="center">
    A backend application that pulls scheduled MWS reports every hour. It then uploads the reports to a MongoDB Database and emails you with the status. Finally it creates API endpoints in which you can access the data.
    <br />
    <a href="https://github.com/ariel-nathan/Node-MWS-API"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ariel-nathan/Node-MWS-API">View Demo</a>
    ·
    <a href="https://github.com/ariel-nathan/Node-MWS-API/issues">Report Bug</a>
    ·
    <a href="https://github.com/ariel-nathan/Node-MWS-API/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is built with the intention of creating a data visualization tool in react later. I plan to implement JWT authentication in the future.

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [googleapis](https://github.com/googleapis/google-api-nodejs-client#readme)
- [amazon-mws](https://github.com/bhushankumarl/amazon-mws)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You must have [Node.js](https://nodejs.org/en/) installed on your machine.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ariel-nathan/Node-MWS-API.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Fill in the .env.sample and change its name to .env
4. In order to get all google/gmail credentials follow this [guide](https://www.youtube.com/watch?v=-rcRf7yswfM&t=840s)
5. Make sure, in your MWS Reports, to schedule the AFN_Inventory Report and the Listings_Data Report for every hour
6. Start the project
   ```sh
   npm start
   ```

<!-- USAGE EXAMPLES -->

## Usage

Every 5 minutes past the hour the cron job will run and grab the AFN_Inventory Report from mws and insert it into the MongoDB Collection. Then it will expose the data to http://localhost:3000/invdata/ endpoint. It will do the same with the Listing_Data Report, but instead it will run every 10 minutes past the hour and expose the data to http://localhost:3000/listingdata/.

You can also search the endpoints by sku, asin, or id. To do this simply add /findbyasin /findbysku or /findbyid to the endpoint followed by the respective identifier. </br> Example: http://localhost:3000/invdata/findbyasin/B08L5R1CCC

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/ariel-nathan/Node-MWS-API/blob/master/LICENSE.txt) for more information.

<!-- CONTACT -->

## Contact

Ariel Nathan - nathanariel17@gmail.com

Project Link: [https://github.com/ariel-nathan/Node-MWS-API](https://github.com/ariel-nathan/Node-MWS-API)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[lastcommit-shield]: https://img.shields.io/github/last-commit/ariel-nathan/Node-MWS-API/main?style=flat-square
[license-shield]: https://img.shields.io/github/license/ariel-nathan/Node-MWS-API?label=license&style=flat-square
[license-url]: https://github.com/ariel-nathan/Node-MWS-API/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ariel-nathan
