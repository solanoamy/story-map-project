import { SlideDeck } from './slidedeck.js';

const map = L.map('map', {scrollWheelZoom: false}).setView([39.95, -75.16], 12);

const mapboxKey = 'pk.eyJ1Ijoic29sYW5vYSIsImEiOiJjbTE3emMzY20wNXF4MmtxMm1vdXJyNXhtIn0.ntr6qIDgX5kSaUvvr4CzDA';
const mapboxStyle = 'mapbox/dark-v11';

const baseTileLayer = L.tileLayer(`https://api.mapbox.com/styles/v1/${mapboxStyle}/tiles/512/{z}/{x}/{y}{r}?access_token=${mapboxKey}`, {
  tileSize: 512,
  zoomOffset: -1,
  detectRetina: true,
  minZoom: 5,
  maxZoom: 22,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});
baseTileLayer.addTo(map);

// ## Interface Elements
const container = document.querySelector('.slide-section');
const slides = document.querySelectorAll('.slide');


const slideOptions = {
  'phl_streets': {
    filter: function(feature) {
      return feature.properties.STNAME === 'WALNUT ST' && feature.properties.L_HUNDRED >= 3300;
    },
    style: (feature) => {
      return {
        color: 'firebrick',
        fillOpacity: 0.5,
      };
    },
  },
  'crashes_on_walnut': {
    style: (feature) => {
      if (feature.properties.fatal_or_s === 1) {
        return {
          radius: 7,    
          fillColor: 'firebrick',
          color: 'firebrick',
          weight: 3,
          fillOpacity: 0.5,
        };
      } else {
        return {
          radius: 5,
          fillColor: 'lightskyblue',
          color: 'lightskyblue',
          weight: 2,
          fillOpacity: 0.5,
        };
      }
    },
    pointToLayer: (feature, latlng) => {
      let options;
      if (feature.properties.fatal_or_s === 1) {
        options = {
          radius: 7,
          fillColor: 'firebrick',
          color: 'firebrick',
          weight: 3,
          fillOpacity: 0.5,
        };
      } else {
        options = {
          radius: 5,
          fillColor: 'lightskyblue',
          color: 'lightskyblue',
          weight: 2,
          fillOpacity: 0.5,
        };
      }
      return L.circleMarker(latlng, options);
    }
  },
  'vz_hin_2020': { 
    style: (feature) => {
      return {
        color: 'firebrick',
        fillColor: 'firebrick'
      };
    },
  },
  'hin_walnut': { 
  style: (feature) => {
    if (feature.properties.objectid === 238) {
      return {
        color: 'goldenrod',
        fillColor: 'goldenrod'
        };
    } else {
      return {
        color: 'firebrick',
        fillColor: 'firebrick'
        };
      }
    }
  }
};


// ## The SlideDeck object
const deck = new SlideDeck(container, slides, map, slideOptions);

document.addEventListener('scroll', () => deck.calcCurrentSlideIndex());

deck.preloadFeatureCollections();
deck.syncMapToCurrentSlide();
