const router = require("express").Router();
const axios = require("axios");
const yelpKey = process.env.YELP_TOKEN;
const moment = require("moment");

router.post(`/get-activities/`, (req, res) => {
  console.log(req.body);
  const { location, startDate } = req.body;
  const date = moment().unix(startDate);
  const baseURL = `https://api.yelp.com/v3`;
  let restaurantURL = `/businesses/search?location=${location}&categories=restaurants&limit=50`;
  let eventURL = `/events?location=${location}&start_date=${date}`;

  const instance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${yelpKey}` },
  });

  const getRestaurants = () => instance.get(restaurantURL);
  const getEvents = () => instance.get(eventURL);

  Promise.all([getRestaurants(), getEvents()])
    .then((results) => {
      let restaurants =
        results[0].data.length === 0
          ? res.send("Sorry, no restaurants were found in your search!")
          : results[0].data.businesses.slice(0, 6);

      let events =
        results[1].data.length === 0
          ? res.send("Sorry, no events were found for this date/location!")
          : results[1].data.events;

      res.render("search-results", {
        startDate,
        location,
        restaurants,
        events,
        layout: "index",
        title: "Date Night | Search Results",
      });
      // console.log( restaurants);
      // console.log( events);
    })
    .catch((error) => console.log(error));
});

router.post("/search-query", async (req, res) => {
  let response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=AIzaSyDbnIg8wB7mATLm6NCPqXiYEiCR1ucyEmI&input=${req.body.key}`
  );

  res.json(response.data);
});

module.exports = router;
