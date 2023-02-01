import { useEffect, useState } from 'react';
import './App.css';

import DisplayPhotos from './DisplayPhotos';
import Form from './Form';
const banana = 'creamPie';

function App() {
  // state item
  // set default array volume to empty value, as it will be populated by 30 photos as per our URLSearchParams below)
  const [photos, setPhotos] = useState([]);

  // adding a new piece of state to monitor the new, filtered array
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  // hook into the initial/first render of the APP to fetch puppy photos since this app is designed to display pups immediately before user interaction
  useEffect(() => {
    //query the API
    // making a function to fetch data, async/await style
    const fetchData = async () => {
      // construct base URL
      const url = new URL('https://api.unsplash.com/search/photos');
      // now add the chosen parameters. Takes an object of the specific parameters you want to use
      url.search = new URLSearchParams({
        client_id: 'DaW5rp0XkTKYLMatlYTJeRDPXNBTb1WTLvz5gr2fe90',
        query: 'puppies',
        per_page: 30,
      }); 

      // good use case here to use try/catch block to organize the fetch work/API queries using async/await
      // without it there's no place to perform error handling
      // if we were using the .then method, different story
      try {
        const data = await fetch(url);
        const response = await data.json();
        // console.log(response.results);

        // photo orientation conditions/calculation
        // get back info from API, find a new value to add to that information (portrait/landscape/square), then send it to state
        const photosWithOrientation = response.results.map(photo => {
          const ratio = photo.width / photo.height;
          // create a variable that can change, default value 'square'
          // using photo.width/photo.height we get a ratio. We're declaring here that anything between 0.75 and 1.35 is a square, otherwise 'orientation' gets reassigned an according value
          let orientation = 'square';
          if (ratio < 0.75) {
            orientation = 'portrait';
          }
          else if (ratio > 1.35) {
            orientation = 'landscape'
          }

          // update each photo object to now include an orientation property

          // can't do this because .map makes a new array, and we're telling JS to make a new array with *only* the new orientation property, stripping everything else! Bad!
          // return { orientation: orientation}

          // take whatever was in that photo and SPREAD it back in to the new array, and add as a new property 'orientation'
          // spread will not mutate the original object. This is important. We will be using the NEW DATA that we've amended into photosWithOrientation now.
          return {
            ...photo,
            // property on left can be the same name as the computed value on the right. We could have been verbose and called the property newOrientationProperty but that's too many damn letters.
            orientation: orientation
          }

        })

        // this is where we started
        // setPhotos(response.results)

        // this is where we're at after creating our photosWithOrientation function
        setPhotos(photosWithOrientation)


      } catch (error) {
        // err handle
    }
  }

  fetchData();

  }, []);

  // this was initially in Form.js but because siblings cannot share data between each other, we are defining it here and will pass props on to Form. See line 90!
  // being verbose here with this function. It can just be getPhotos or whatever makes sense!
  const getUpdatedPhotos = (userChoice) => {
    // only return photos where the orientation property is strictly equal to user choice and store those in new array stored in filteredPhotos
    const filteredPhotos = photos.filter(photo => photo.orientation === userChoice);
    setFilteredPhotos(filteredPhotos)
  }


  

  // update DisplayPhotos with images now based on a specific orientation
  // filter photos based on userChoice
  // if userChoice === 'portrait' --> show only portrait photos

  return (
    <div className="App">
      <h1>Check out these pups!</h1>
      {/* rendering components */}
      <Form getUpdatedPhotos={getUpdatedPhotos}/>
      {/* initially we were passing {photos} below, but we've created new state to monitor the filtered photos, so... */}
      <DisplayPhotos photos={filteredPhotos}/>
    </div>
  );
}

export default App;
