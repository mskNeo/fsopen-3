import React from 'react'

const Persons = ({people, filter, deleteFunc}) => {
  
  const filteredList = people.filter((ele) => ele.name.toLowerCase().slice(0, filter.length) === filter.toLowerCase())

  const peopleList = filteredList.map((d) => {
  return (
    <div key={d.id}>
      <p>
        {d.name} {d.number}
        <button onClick={() => deleteFunc(d.id)}>delete</button>
      </p>
    </div>
  )})

  return (
    <div>
      {peopleList}
    </div>
  )
}

export default Persons