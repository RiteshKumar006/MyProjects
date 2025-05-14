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
        {label:"Fruits",
          render: (fruit) => fruit.name
        },
        {label:"Color",
          render: (fruit) => fruit.color,
        },
        {label:"Score",
          render : (fruit) => fruit.score,
        },
        // {
        //   label:"Action",
        //   render: (fruit) => <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
        // }
    ];

    const keyFn = (fruit) => {
        return fruit.name
    }
  return (
    <div>
        <Table data={data} config={config} keyFn={keyFn} />
    </div>
  )
}

export default TablePage