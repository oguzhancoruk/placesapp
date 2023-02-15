import React, { useEffect, useState } from 'react';

function Map() {
  const [places, setPlaces] = useState([]);
  console.log(places)

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 41.0082, lng: 28.9784 },
      zoom: 12,
    });
    const service = new window.google.maps.places.PlacesService(map);

    // İlk sayfa sorgusu
    service.textSearch({
      location: { lat: 41.0082, lng: 28.9784 },
      radius: 5000,
      type: ["restaurant"],
    }, handleResults);
  }, []);

  function handleResults(results, status, pagination) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      // Mevcut sonuçları kaydet
      setPlaces((prevPlaces) => [...prevPlaces, ...results]);

      // Eğer daha fazla sayfa varsa, sonraki sayfayı almak için sorgula
      if (pagination.hasNextPage) {
        pagination.nextPage();
      }
    }
  }

  return (
    <> <div id="map" style={{ height: "300px" }}>

    </div>

    <div className='row col-sm-12 d-flex justify-content-center'>
      {places?.map((place) => {

        return (<div className='col-sm-3 mt-2' >
          <ul class="list-group ">
          <li class="list-group-item"><img src={ place.icon}/></li>
            <li class="list-group-item  ">{place.name}</li>
            <li class="list-group-item  ">{place.formatted_address}</li>
         
           
          
          </ul>
         
        </div>)
      })}
</div>
    </>

  );
}

export default Map;