# JustDial Scrapper (NODE.JS)

## Getting Started

We need to install a few things to get the project up and running.

### NodeJS (which is required to run the project)

For that go to https://nodejs.org/en/download/ and install the LTS (Latest Stable) version.

## Restoring Dependencies

1. First of all we need to restore the dependencies inside the project. For that, open the project folder (the folder which contains package.json file) in command prompt.
2. Now run the following command, this will restore all the dependencies.

```
npm install
```

## Project Configuration

Open config.js file and Update the given values:

1. STARTING_PAGE: Should always be 1 unless you want to start from some other page.
2. ENDING_PAGE: Last page number till which you want the data, i.e. 10.
3. INITIAL_URL: Go to justdial.com and search for the thing you want, then copy the URL and use that value as INITIAL_URL.

## Running the project

Now we can run the project if we want by using

```
npm start
```

## Declatations

Based on the scrapper built in python https://github.com/harsh4870/Justdail-scrapper

#### 🎀 FIN 🎀
