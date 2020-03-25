let jump = require("jump.js")
let Glide = require('@glidejs/glide')
let ab = document.querySelector(".ab")
let ev = document.querySelector(".ev")
let about = document.querySelector(".about")
let event = document.querySelector(".events")

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