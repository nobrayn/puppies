// destructuring below, after line 11 (duplicate code):
// function DisplayPhotos() {
//   return (
//     <>
//       <h2>Photos</h2>
//       {/* Images incoming */}
//     </>
//   )
// }
// export default DisplayPhotos

function DisplayPhotos({photos}) {
  return (
    <section>
      {
        // using smooth brackets after : to denote that we are going to return multiple things. Also, the ternary operators can remain on one line or be broken out like below.
        photos.length === 0
          ? <h2>No photos found.</h2>
          : (
            <>
            <h2>Puppy Photos!</h2>
            <div className="photos">
              {
                photos.map(photo => {
                  return (
                    // adding a key to make react happy. Since there's a property in the array called "id" that is unique, this will do fine! Also using the alt text from the array!
                    <div key={photo.id}className="photo-container">
                      <img src={photo.urls.small} alt={photo.alt_description} />
                    </div>
                  )
                })
              }
            </div>
            </>
        )
      }
    </section>
  )
}

export default DisplayPhotos;