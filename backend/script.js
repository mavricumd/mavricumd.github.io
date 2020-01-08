
// get requests
const proxyurl = "https://cors-anywhere.herokuapp.com/";
let query = `
  {
    about {
      desc
    }
  }
`

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: query
  })
})
.then(resp => resp.json())
.then(({data}) => document.querySelector('.about-text').innerHTML = data.about.desc)

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
    fetch('http://localhost:4000/graphql', {
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
query = `
  {
    events {
      name
    }
  }
`
fetch('http://localhost:4000/graphql', {
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
  z.innerHTML = element.name
  console.log(z)
  document.querySelector('.curr-events').appendChild(z)
}))

document.querySelector('.add').addEventListener("click", () => {
  console.log("sending")
  const name = document.querySelector('.name').value
  console.log(name)
  let data
  query = `
    mutation{
      addEvents(name: "${name}") {
        name
      }
    }
  `
fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(console.log)
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
fetch('http://localhost:4000/graphql', {
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
fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(console.log)
})

// Timeline
query = `
  {
    timelines {
      date,
      event
    }
  }
`
fetch('http://localhost:4000/graphql', {
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
  let z = document.createElement('li')
  z.innerHTML = element.event
  console.log(z)
  document.querySelector('.time').appendChild(z)
}))

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
fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(console.log)
})

// Testimonials

query = `
  {
    testimonials {
      author,
      test
    }
  }
`
fetch('http://localhost:4000/graphql', {
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
  z.innerHTML = element.test + '  -' + element.author
  console.log(z)
  document.querySelector('.tests').appendChild(z)
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

fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query:query
    })
  })
  .then((resp) => resp.json())
  .then(console.log)

})

