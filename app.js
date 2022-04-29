
// -----------------------------lattitiude----longitude
const map = L.map('map').setView([51.4027236, 21.1471333], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFta29sMTQiLCJhIjoiY2wyaXhqZXlnMDlnYjNjcW5veGl6ZXFjaCJ9.Fyja32I5ZEUtC3zh5LnR5g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGFta29sMTQiLCJhIjoiY2wyaXhqZXlnMDlnYjNjcW5veGl6ZXFjaCJ9.Fyja32I5ZEUtC3zh5LnR5g'
}).addTo(map);

const marker = L.marker([51.4027236, 21.1471333]).addTo(map);

console.log(map)

  const amazonIp = '205.251.242.103';

const amazonDataString = JSON.stringify({"ip":"205.251.242.103","location":{"country":"US","region":"Virginia","city":"South Richmond","lat":37.52237,"lng":-77.44137,"postalCode":"","timezone":"-04:00","geonameId":4786665},"domains":["amazon.com","amzn.com","apoll-new-trends.de","edu1351.info","edu1352.info"],"as":{"asn":16509,"name":"AMAZON-02","route":"205.251.240.0\/22","domain":"http:\/\/www.amazon.com","type":"Enterprise"},"isp":"Amazon Technologies Inc. (AMAZON)"});
const amazonData = JSON.parse(amazonData);
console.log(amazonData)


// const axios.get('https://geo.ipify.org/api/v1', {
//     params: {
//       apiKey: 'at_K7lyYo6RkhFmH8vHc34ppeTlCOiYJ',
//       ipAddress: amazonIp
//     }
//   })



