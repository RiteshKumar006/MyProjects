import React from 'react'

function Table({data, config}) {

    const renderedRow = data.map((item, index) =>{
        return (
            <tr key={index} className="border-b border-gray-300 text-center">
                <td className="border-b border-gray-300 p-2 m-2">{item.name}</td>
                <td className={`border-b border-gray-300 w-10 p-3 m-2 ${item.color}`}></td>
                {item.score && <td className="border-b border-gray-300 m-2 p-2">{item.score}</td>}
            </tr>
        )
    })

    const renderHeading = config.map((item, index) => {
        return (
            <th key={index}>{item.label}</th>
        )
    })
  return (
    // <div>
    //     {data.map((item,index) =>{
    //         return (
    //             <div key={index} className="flex items-center justify-between border-b border-gray-300 p-2">
    //                 <span className="text-lg w-10">{item.name}</span>
    //                 <span className={`text-lg ${item.color} w-10 h-10`}>{}</span>
    //                 {item.score && <span className="text-lg">{item.score}</span>}
    //             </div>
    //         )  
    //     })}

    // </div>
    <div>
                <table className="table-auto border-spacing-2">
                    <thead>
                        <tr className='border-b-2 border-gray-300 text-center'>
                        {renderHeading}
                        </tr>
                    </thead>
                    <tbody>
                        {renderedRow}
                    </tbody>
                </table>     
    </div>
  )
}

export default Table