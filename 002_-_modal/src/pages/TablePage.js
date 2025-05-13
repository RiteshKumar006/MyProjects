import React from 'react'
import Table from '../components/Table'

function TablePage() {

    const data =[
        { name: 'Apple', color: 'bg-red-500', score: 5 },
        { name: 'Banana', color: 'bg-yellow-500', score: 5 },
        { name: 'Grape', color: 'bg-purple-500',score: 5 },
        { name: 'Orange', color: 'bg-orange-500', score: 5 },
        { name: 'Strawberry', color: 'bg-red-500',score: 5 },
        { name: 'Watermelon', color: 'bg-green-500',score: 5 },
    ]

    const config = [
        {label:"Fruits"},
        {label:"Color"},
        {label:"Score"}
    ]
  return (
    <div>
        <Table data={data} config={config} />
    </div>
  )
}

export default TablePage