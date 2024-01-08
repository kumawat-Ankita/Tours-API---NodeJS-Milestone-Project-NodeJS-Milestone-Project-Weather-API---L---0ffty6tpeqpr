const fs = require('fs');
const express = require('express');
const app = express();

//Middleware
app.use(express.json());

const tourDetails = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

const writeTourDataToFile = () => {
  fs.writeFileSync(`${__dirname}/data/tours.json`, JSON.stringify(tourDetails, null, 2), 'utf8');
};

app.get('/tours', (req, res) => {
  //write a code here to get all the tours from tours.json
   res.status(200).json({
    status: 200,
    message: 'Success',
    data: tourDetails,
  });
});

app.post('/tours', (req, res) => {
  const { name, description, duration, price } = req.body;
  //Write a code here for creating new tour from data/tours.json
  //For creating new id use this logic
  // const newId = tourDetails[tourDetails.length - 1].id + 1;
  
  // Create new tour object
  const newId = tourDetails.length > 0 ? tourDetails[tourDetails.length - 1].id + 1 : 1;
  const newTour = {
    id: newId,
    name,
    description,
    duration,
    price,
  };

  // Add new tour to tourDetails
  tourDetails.push(newTour);

  // Write updated data back to tours.json
  writeTourDataToFile();

  res.status(200).json({
   // status: 200,
    message: 'Tour added successfully',
  });
});

app.put('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  const updatedTour = req.body;

  // Find the index of the tour to update
  const tourIndex = tourDetails.findIndex((tour) => tour.id === tourId);

  if (tourIndex !== -1) {
    // Update tour details
    tourDetails[tourIndex] = { ...tourDetails[tourIndex], ...updatedTour };

    // Write updated data back to tours.json
    writeTourDataToFile();

    res.status(200).json({
      status: 200,
      message: 'Tour updated successfully',
    });
  } else {
    res.status(404).json({
    //  status: 404,
      message: 'Tour not found',
    });
  }
  //write a code here for updating a tour
});

app.delete('/tours/:id', (req, res) => {
  const tourId = parseInt(req.params.id);
  //Write a code here for deleting a tour from data/tours.json
 

  // Find the index of the tour to delete
  const tourIndex = tourDetails.findIndex((tour) => tour.id === tourId);

  if (tourIndex !== -1) {
    // Remove tour from tourDetails
    tourDetails.splice(tourIndex, 1);

    // Write updated data back to tours.json
    writeTourDataToFile();

    res.status(200).json({
     // status: 200,
      message: 'Tour deleted successfully',
    });
  } else {
    res.status(404).json({
     // status: 404,
      message: 'Tour not found',
    });
  }
});

module.exports = app;
