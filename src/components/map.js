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
      location: { lat: 40.0082, lng: 28.9784 },
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
      {places?.map((place) => {

        return (<div >
          <ul class="list-group row">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          <h3>{place?.name}</h3>
          <p>{place?.vicinity}</p>
        </div>)
      })}

    </>

  );
}

export default Map;