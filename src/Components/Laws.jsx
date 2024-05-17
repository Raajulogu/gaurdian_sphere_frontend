import React from 'react'
import Base from '../Base/Base'
import Datas from '../Datas.json'

const Laws = () => {
  let countries=["India","USA","UK"]
  return (
    <Base Page={"Laws"}>
      <h1 className='font-semibold text-[20px] m-4 underline'>
        Sexual Harrassment and assault Laws
      </h1>

      <table className='border-collapse border border-black m-5'>
        <thead className='text-[20px]'>
          <tr className="bg-gray-200">
            <th className="border border-black px-4 py-2">Country</th>
            <th className="border border-black px-4 py-2">Law</th>
            <th className="border border-black px-4 py-2">Punishment</th>
          </tr>
        </thead>
        <tbody className='text-[15px]'>
          {countries.map(country => (
            Datas.Laws[country].map((law, index) => (
              <tr key={index}>
                {index === 0 && (
                  <td className="border border-black px-4 py-2" rowSpan={Datas.Laws[country].length}>{country}</td>
                )}
                <td className={`border border-black px-4 py-2 ${(index+countries.indexOf(country))%2===0 ?"bg-blue-200":""}`}>{law.Law}</td>
                <td className={`border border-black px-4 py-2 ${(index+countries.indexOf(country))%2===0 ?"bg-blue-200":""}`}>{law.Punishment}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </Base>
  )
}

export default Laws