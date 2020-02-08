
// get requests
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let query = `
  {
    about {
      desc
    }
  }
`
// window.setInterval(() => {
//   fetch('https://mavricbackend.herokuapp.com/about')
//   .then((resp) => resp.json)
//   .then(console.log)
// }, 150000)

fetch('https://mavric.bid', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: query
  })
})
.then(resp => resp.json())
.then(console.log)

// POST for about queries

document.querySelector('.about-but').addEventListener("click", (e) => {
    e.preventDefault();
    console.log("sending")
    const about = document.querySelector('.about-text').value
    console.log(about)
    query = ` 
  mutation {
    addAbout(desc:"${about}"){
      desc
    }
  }
`
    fetch('https://mavric.bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query
        })
      })
      .then((resp) => resp.json())
      .then(console.log)
})


// Events
let k = 0
let fetchEvent = () => {
  query = `
  {
    events {
      name
      id
    }
  }
`
fetch('https://mavric.bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query
        })
})
.then((resp) => resp.json())
.then(({data}) => data.events.forEach(element => {
  let z = document.createElement('li')
  let b = document.createElement('button')
  let d = document.createElement('div')
  z.innerHTML = element.name
  console.log(z)
  b.innerHTML = "delete"
  b.className = "edel"
  b.id = element.id
  b.style.margin = "10px 0 10px 0"
  z.id = element.id
  d.append(z)
  d.append(b)
  console.log(z)
  document.querySelector('.curr-events').appendChild(d)
  console.log(document.querySelectorAll('.edel'))
  console.log(k)
  document.querySelectorAll('.edel')[k].addEventListener('click', (click) => {
      console.log("sup")
      let id = click.toElement.id
      console.log(id)
       query = `
         mutation{
           delEvent(id: "${id}") {
             id
           }
         }
       `
       fetch('https://mavric.bid', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           query:query
         })
       })
       .then((resp) => resp.json())
       .then(() => {
         location.reload()
       })      
    })
    k++
}))
}

fetchEvent() 

document.querySelector('.add').addEventListener("click", () => {
  console.log("sending")
  const name = document.querySelector('.name').value
  const date = document.querySelector('.event-date').value
  const desc = document.querySelector('.event-desc').value
  console.log(name)
  let data
  query = `
    mutation{
      addEvents(name: "${name}", date: "${date}", desc: "${desc}") {
        name,
        date,
        desc
      }
    }
  `
fetch('https://mavric.bid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(() => {
    location.reload()
  })
})

//Services
query = `
  {
    services {
      name,
      attr
    }
  }
`
fetch('https://mavric.bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query
        })
})
.then((resp) => resp.json())
.then(({data}) => data.services.forEach(element => {
  let z = document.createElement('li')
  z.innerHTML = element.name
  console.log(z)
  document.querySelector('.'+element.attr).appendChild(z)
}))
document.querySelector('.xr-but').addEventListener('click', () => {
  console.log("sending")
  const name = document.querySelector('.xr-in').value
  const attr = document.querySelector('select').value
  console.log(attr)
  console.log(name)
  let data
  query = `
    mutation{
      addService(name: "${name}", attr: "${attr}") {
        name,
        attr
      }
    }
  `
fetch('https://mavric.bid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(() => {
    location.reload()
  })
})


//Resources
query = `
  {
    resources {
      name
    }
  }
`

fetch('https://mavric.bid', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query:query
  })
})
.then((resp) => resp.json())
.then(({data}) => data.resources.forEach(element => {
  let z = document.createElement('li')
  z.innerHTML = element.name
  console.log(z)
  document.querySelector('.resource_list').appendChild(z)
}))

// Timeline
query = `
  {
    timelines {
      date,
      event,
      id
    }
  }
`
let i = 0
fetch('https://mavric.bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query
        })
})
.then((resp) => resp.json())
.then(({data}) => data.timelines.forEach(element => {
  console.log(element.id)
  let z = document.createElement('li')
  let b = document.createElement('button')
  let d = document.createElement('div')
  b.innerHTML = "delete"
  b.className = "tdel"
  b.id = element.id
  b.style.margin = "10px 0 10px 0"
  z.id = element.id
  z.innerHTML = element.event
  d.append(z)
  d.append(b)
  console.log(z)
  document.querySelector('.time').appendChild(d)
  console.log(document.querySelectorAll('.tdel')[i])
  document.querySelectorAll('.tdel')[i].addEventListener('click', (click) => {
      console.log("sup")
      let id = click.toElement.id
      console.log(id)
       query = `
         mutation{
           delTimeline(id: "${id}") {
             id
           }
         }
       `
       fetch('https://mavric.bid', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           query:query
         })
       })
       .then((resp) => resp.json())
       .then(() => {
         location.reload()
       })      
    })
    i++
  }) 
)

document.querySelector('.time-but').addEventListener('click', () => {
  const date = document.querySelector('.time-date').value
  const event = document.querySelector('.time-event').value
  console.log(date, event)

  query = `
    mutation{
      addTimeline(event: "${event}", date: "${date}") {
        event,
        date
      }
    }
  `
fetch('https://mavric.bid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(() => {
    location.reload()
  })
})

// Testimonials

query = `
  {
    testimonials {
      id,
      author,
      test
    }
  }
`
let j = 0
fetch('https://mavric.bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query
        })
})
.then((resp) => resp.json())
.then(({data}) => data.testimonials.forEach(element => {
  let z = document.createElement('li')
  let b = document.createElement('button')
  let d = document.createElement('div')
  z.innerHTML = element.test + '  -' + element.author
  console.log(z)
  b.innerHTML = "delete"
  b.className = "tedel"
  b.id = element.id
  b.style.margin = "10px 0 10px 0"
  z.id = element.id
  d.append(z)
  d.append(b)
  console.log(z)
  document.querySelector('.tests').appendChild(d)
  console.log(document.querySelectorAll('.tedel'))
  console.log(j)
  document.querySelectorAll('.tedel')[j].addEventListener('click', (click) => {
      console.log("sup")
      let id = click.toElement.id
      console.log(id)
       query = `
         mutation{
           delTestimonial(id: "${id}") {
             id
           }
         }
       `
       fetch('https://mavric.bid', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           query:query
         })
       })
       .then((resp) => resp.json())
       .then(() => {
         location.reload()
       })      
    })
    j++
}))


document.querySelector('.add-test').addEventListener('click', () => {
const author = document.querySelector('.author').value
const test = document.querySelector('.test').value

query = `
mutation{
  addTestimonial(author: "${author}", test: "${test}") {
    author,
    test
  }
}
`

fetch('https://mavric.bid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(() => {
    location.reload()
  })

})

