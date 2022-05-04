const btn = document.querySelector('.ip-button');
const input = document.querySelector('.ip-input');

const addressEl = document.querySelectorAll('.ip-data-text')[0];
const locationEl = document.querySelectorAll('.ip-data-text')[1];
const timezoneEl = document.querySelectorAll('.ip-data-text')[2];
const ispEl = document.querySelectorAll('.ip-data-text')[3];
const error = document.querySelector('.error');


// Map 
let map = L.map('map', { zoomControl: false }).setView([37.40599, -122.078514], 13);
let marker = L.marker([37.40599, -122.078514]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFta29sMTQiLCJhIjoiY2wyaXhqZXlnMDlnYjNjcW5veGl6ZXFjaCJ9.Fyja32I5ZEUtC3zh5LnR5g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGFta29sMTQiLCJhIjoiY2wyaXhqZXlnMDlnYjNjcW5veGl6ZXFjaCJ9.Fyja32I5ZEUtC3zh5LnR5g'
}).addTo(map);



// Regex for checking ip v6
const regexIpv6 = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

// Regex for checking ip v4
const regexIpv4 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

// Regex for domain name 
const regexDomainName = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;



function inputValid(input) {
  return regexIpv4.test(input) || regexIpv6.test(input) || regexDomainName.test(input)
}

function requestOnIpOrDomain(input, data) {
  if(regexIpv4.test(input) || regexIpv6.test(input)) {
    data.ipAddress = input;
  };
  if(regexDomainName.test(input)) {
    data.domain = input;
  };
}

function createErrOnPage(errorText) {
      error.innerHTML = errorText;
      error.classList.remove('not-display');
      input.classList.add('red-border');
}


 
// When click btn take input, send request, show data on page or error
btn.addEventListener('click', async (e) => {
    e.preventDefault()
    let data = {apiKey: 'at_K7lyYo6RkhFmH8vHc34ppeTlCOiYJ'};
    let ipApiData;

    if(inputValid(input.value)) {
      // clean error on page
      error.innerHTML = '';
      error.classList.add('not-display');
      input.classList.remove('red-border');

      requestOnIpOrDomain(input.value, data)

      // Request 
      try {
        ipApiData = await axios.get('https://geo.ipify.org/api/v2/country,city', {
        params: data
        })

      } catch(err) {
        if(err.response.status === 400) {
          createErrOnPage('Sorry ip address or domain was not found on our servers');
        }
        if(err.response.status === 0) {
          createErrOnPage('Try disable your addblock extension');
        } 
      }

      // Showing data from request on page
      if(ipApiData) {
        addressEl.innerHTML = ipApiData.data.ip;
        locationEl.innerHTML = `${ipApiData.data.location.city}, ${ipApiData.data.location.country}`;
        timezoneEl.innerHTML = `UTC${ipApiData.data.location.timezone}`;
        ispEl.innerHTML = ipApiData.data.isp;

        map.flyTo([ipApiData.data.location.lat, ipApiData.data.location.lng], 13);
        marker.setLatLng(new L.LatLng(ipApiData.data.location.lat, ipApiData.data.location.lng));
      } 

    } 

    else {
      createErrOnPage('Ip address or domain is not valid');
    }

})

