let jump = require("jump.js")
let Glide = require('@glidejs/glide')
let ab = document.querySelector(".ab")
let ev = document.querySelector(".ev")
let about = document.querySelector(".about")
let event = document.querySelector(".events")

let date = new Date()
let time = date.getHours()
console.log(time)
let theme = "light"
if(time > 18 || time < 6 ) 
    theme = "dark"
mapboxgl.accessToken = 'pk.eyJ1IjoiamFwbmVldCIsImEiOiJjazQzM25majcwM3diM21uMXk4bnVieWl6In0.Nw00DmDETPkUH7dtCSzC9Q';
const map = new mapboxgl.Map({
container: 'map', // container id
style: `mapbox://styles/mapbox/${theme}-v10`, //hosted style id
center: [-76.937759, 38.989697], // starting position
zoom: 14 // starting zoom
});

var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-76.9365, 38.9891]
        },
        properties: {
        title: 'Mapbox',
        description: 'Iribe Center',
        name: "iribe"
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-76.9476, 38.9851]
        },
        properties: {
        title: 'Mapbox',
        description: 'Brandon Morse',
        name: 'bm'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-76.9365, 38.9901]
        },
        properties: {
        title: 'Mapbox',
        description: 'UMIACS',
        name: "umiacs"
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-76.9416, 38.9881]
        },
        properties: {
        title: 'Mapbox',
        description: 'MITH',
        name: 'mith'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-76.9416, 38.9885]
        },
        properties: {
        title: 'Mapbox',
        description: 'HCIL',
        name: 'HCIL'
        }
    },
    {
        type: 'Feature',
        geometry: {
        type: 'Point',
        coordinates: [-76.9365, 38.9895]
        },
        properties: {
        title: 'Mapbox',
        description: 'Diversity and Inclusion in Computing',
        name: "dic"
        }
    }
]
};
geojson.features.forEach((marker) => {
    let el = document.createElement('div')
    el.className = "marker"
    el.style.backgroundImage = `url(./assets/${marker.properties.name}.png)`
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map)
})



ab.addEventListener("click", () => {
  jump(about)
})

ev.addEventListener("click", () => {
  jump(event)
})

let query = `

    {
        resources {
            name
        }
    }
`
let i = 1
let num = 1
fetch('https://mavric.bid', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'mode': 'no-cors'
  },
  body: JSON.stringify({
    query: query
  })
})
.then(resp => resp.json())
.then(({data}) => {
    let groups = Math.ceil((data.resources.length)/2)
    for(let j = 1 ;j<=groups;j++) {
      let row = document.createElement('tr')
      row.classList.add(`row${j}`)
      row.classList.add("row")
      document.querySelector('.tab').appendChild(row)
    }
    data.resources.forEach(element => {
        let p = document.createElement('td')
        let ind = element.name.indexOf('-')
        let cont = ""
        if(ind != -1)
          cont = element.name.substring(0,ind)
        else 
          cont = element.name
        p.innerHTML = cont
        p.className = "resource-p"
        console.log(element)
        if(i/2 <= num) {
          document.querySelector(`.row${num}`).appendChild(p)
        }
        // document.querySelector('.left-re').appendChild(p)
        if(i%2==0)
          num+=1
        i+=1
    })
    let mapify = (e) => {
      console.log("hi")
      let locate = e.target.innerHTML
      for(let loc of geojson.features) {
        console.log(loc.properties.description)
        console.log(locate)
        console.log("hi" === "hi")
        console.log(`${loc.properties.description}`.toString() === `${locate}`.toString())
        if(`${loc.properties.description}` == `${locate}`) {
          let x = loc.geometry.coordinates[0]
          let y = loc.geometry.coordinates[1]
          map.flyTo({
            center: [
              x,y
            ],
            essential: true,
            zoom: 17
          })
        }
      }  
    }
    let names = document.querySelectorAll(".resource-p")
    console.log(names)
    for (let p of names) {
      console.log(p)
      p.addEventListener("click",mapify)
    }
}) 
  
let data = {
  "XR": [
    "Business Planning",
    "Business Valuation",
    "Marketing Guidance",   
    "Industry Networking",    
    "Market Research"
  ],
  "Corporations": [
    "Overview of the XR Tech",
    "Access to Cutting-Edge Research",
    "Intro to Potential (Sub)Contractors",
    "Intro to Partners for XR Development",
    "Support for Proposals Related to XR"
  ],
  "Academic": [
    "Intro to Potential Government",
    "Support for Patent and Copyright Claims",
    "Support for Research and Partnerships",
    "Support for XR Startup Formation By Researchers",
    "Support for IP Transfer Opportunities"
  ]
}

// Services
new Glide('.glide').mount()

console.log(data["XR Companies"])
let active = document.querySelector(".glide__slide--active").childNodes[0].innerHTML.split(" ")[0]
  console.log(active)
  data[`${active}`].forEach(element => {
  let p = document.createElement("p")
  p.innerHTML = element
  document.querySelector(".options").appendChild(p)
})

let change = () => {
  console.log("clicked")
  let active = document.querySelector(".glide__slide--active").childNodes[0].innerHTML.split(" ")[0]
  document.querySelector(".options").innerHTML = ""
  console.log(active)
  data[active].forEach(element => {
  let p = document.createElement("p")
  p.innerHTML = element
  document.querySelector(".options").appendChild(p)
})
}
document.querySelector(".glide__arrow").addEventListener("click", () => {
  setInterval(change, 1000)
})