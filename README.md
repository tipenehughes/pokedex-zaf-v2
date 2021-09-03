# PokeDex App

**META:** _This app was conceptualized from the point of view of the customer. The intention of building this app is to envisage a scenario a customer might conceivably face, and follow the steps they may take to solve the issue using the Zendesk Apps Framework (ZAF)._

## PROBLEM

Agents do not have quick and easy access to information required to provide customers with fast and accurate service regarding our major product: Pokemon. Currently, agents must use 3rd party resources that slow response times to our customers as well as introduce inaccurate information as we are not able to vet 3rd party data.

#### How is this data obtained by agents currently?

At present, all Pokemon data that our agents use is obtained via a 3rd party source, [Bulbapedia](https://bulbapedia.bulbagarden.net/). There is no integration with Zendesk and agents must navigate to the website independently and filter through results to find the required information.

#### Why is the current resource insufficient to the needs of our agents and customers?

While Bulbapedia is a significant asset to our team currently, the resource is a community driven wiki that is prone to errors in information provided as well as being difficult to use in an efficient manner when facing a high volume of customer contacts. Additionally, being a 3rd party resource it is subject to change and/or removal at any time and as such, it is important to reduce business reliance on it.

## SOLUTION

Create a Zendesk Apps framework app that provides agents with an interface to easily obtain accurate Pokemon information. The app will allow agents to obtain this information directly from the ticket sidebar which will increase speed and efficiency while relaying this information to the customer.

Primary requirements:

-   Fast, easy and reliable access to accurate Pokemon data.
-   Custom API containing required data.
-   Functionality to populate data from app to tickets.

## To run locally:

-   npm install
-   npm run watch
-   zcli apps:server ./dist

## To package for install:

-   npm run build
-   zcli apps:package ./dist
