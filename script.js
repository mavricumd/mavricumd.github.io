console.log("baap is here")

let query = `

    {
        resources {
            name
        }
    }
`

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
    data.resources.forEach(element => {
        let p = document.createElement('p')
        p.innerHTML = element.name
        p.className = "resource-p"
        console.log(element)
        document.querySelector('.left-re').appendChild(p)
    })
}) 
  