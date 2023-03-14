import  axios  from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';


export default function Selects() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [values, setValues] = useState([]);
  // const [checked, setChecked] = useState('choose something.................');
  const getData = async () => {
   
    try {
        const { data } = await axios.get('https://restcountries.com/v2/all') 
        setValues(data)
     
       
    } catch (error) {
        console.log(error);
    }

   
}
const test = [];
useEffect(() => {

    getData()
}, [])

const hold = [];

for(let i = 0; i<values?.length; i++){

  let droplists = {
      label: values[i].name,
      value:`${values[i].callingCodes}`
  }
  hold.push(droplists)
}
// console.log(hold);
const choice = async(name)=>{
  // console.log('clicked.....')
  console.log(name.label)
  try {
    const res= await axios.get(`https://restcountries.com/v3.1/name/${name.label}`)
    console.log(res.data)
  } catch (error) {
    console.log(error)

  }
}
useEffect(()=>{

},[choice])
  return (
    <div className="App">
      <Select className='w-25'
        // defaultValue={selectedOption}
        // onChange={setSelectedOption}
        options={hold}
        onChange={choice}
      />
    </div>
  );
}