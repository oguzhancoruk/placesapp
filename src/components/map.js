import React, { useEffect, useState } from 'react';

function Map() {
  const [places, setPlaces] = useState([]);
  const [service, setService] = useState(null);
  const [map, setMap] = useState(null);
  const YOUR_API_KEY="AIzaSyAm1MZUfALvfCPKMyp44HrDLYG1v7Z6Zs0"
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places`;
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.0082, lng: 28.9784 },
        zoom: 12,
      });
      const service = new window.google.maps.places.PlacesService(map);
      setMap(map);
      setService(service);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (map && service) {
      map.addListener('click', (event) => {
        const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        service.textSearch({
          location: location,
          radius: 10000,
          type: ['restaurant'],
        }, handleResults);
      });
    }
  }, [map, service]);

  function handleResults(results, status, pagination) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      setPlaces((prevPlaces) => [...prevPlaces, ...results]);
      if (pagination.hasNextPage) {
        pagination.nextPage();
      }
    }
  }

  return (
    <>
      <div id="map" style={{ height: "300px" }}></div>

      <div className='row col-sm-12 d-flex justify-content-center'>
        {places?.map((place) => {
          return (
            <div className='col-sm-3 mt-2' key={place.id}>
              <ul className="list-group">
                <li className="list-group-item"><img src={place.icon} alt={place.name} /></li>
                <li className="list-group-item">{place.name}</li>
                <li className="list-group-item">{place.formatted_address}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Map;
