# Train Scheduler App

## Overview

In this project, a train schedule application that incorporates Firebase to host arrival and departure data is created. The app retrieves and manipulates this information with Moment.js. This website provides up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

## Setup

* Firebase is used to store data
* GitHub is used to backup the project, and 
* Heroku is used to host the finished site.

## Procedure

* The app is developed such that:
When adding trains, administrators should be able to submit the following:
  * Train Name
  * Destination
  * First Train Time -- in military time
  * Frequency -- in minutes

* The app is Coded to calculate when the next train will arrive; this is relative to the current time.

* It is also coded such that users from many different machines should  be able to view same train times.

* The "minutes to arrival" and "next train time" text is updated once every minute. 

* Update and remove buttons for each train is added to the app. These let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

* The app is made such that only users who log into the site with their Google or GitHub accounts can use the site. 
