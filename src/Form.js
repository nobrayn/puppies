import { useState } from 'react';
function Form({getUpdatedPhotos}) {
  // set default useState as empty string, as usually this will be filled with user input in the form of a string
  const [userChoice, setUserChoice] = useState('')

  const handleChange = (e) => {
    setUserChoice(e.target.value);
  }

    // update displayPhotos with images now based on a specific orientation

  return (
    // changing this function to pass an argument.. below is what it was
    // <form onSubmit={getUpdatedPhotos}>
    // and now, we pass an anonymous function in order to pass an argument here
    <form onSubmit={(e) => {
      e.preventDefault();
      getUpdatedPhotos(userChoice)
    }}>
      {/* be semantic, add a label */}
      <label htmlFor="orientationPicker">Choose photo orientation:</label>
      <select
      value={userChoice}
      name="orientationPicker"
      id="orientationPicker"
      onChange={handleChange}>
        {/* We want 4 options - portrait, landscape, square, default. Default is disabled, it's un-selectable. The others need values so they can be targeted */}
        <option value="" disabled>Please Select:</option>
        <option value="square">Square</option>
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
      </select>
      <button>Get them pups</button>
    </form>
  )
}

export default Form;