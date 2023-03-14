import axios from 'axios';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';
import { RiDownloadLine, RiH1 } from 'react-icons/ri'
import Form from 'react-bootstrap/Form';
import Loading from './Loading';
import Selects from './Selects';


const columns = [
    {
        name: <h4>Name</h4>,
        selector: row => row.name,
        // sortable:true
    },
    {
        name: <h4>Native Name</h4>,
        selector: row => row.nativeName,
    },
    {
        name: <h4>Capital</h4>,
        selector: row => row.capital,
    },
    {
        name: <h4>Region</h4>,
        selector: row => row.region,
    },
    {
        name: <h4>Area</h4>,
        selector: row => row.area,
    },
    {
        name: <h4>Population</h4>,
        selector: row => row.population,
    },
    {
        name: <h4>Calling Code</h4>,
        selector: row => row.callingCodes,
    },
    {
        name: <h4>Flag</h4>,
        selector: row => <img width={50} height={50} src={row.flag} />
    },
];

const headers = [
    {
        label: 'Name', key: "name",
    },
    { label: 'Native Name', key: "nativeName", },
    { label: 'Capital', key: "capital", },
    { label: 'Region', key: "region", },
    { label: 'Area', key: "area", },
    { label: 'Population', key: "population", },
    { label: 'Calling Code', key: "callingCodes", }
]

function MyComponent() {
    const [countries, setcountries] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)

    const getData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://restcountries.com/v2/all')
            setcountries(data)
            setFiltered(data)
            setLoading(false)
           
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getData()
    }, [])

    useEffect(() => {
        const newData = countries.filter(country => {
            return country.name.toLowerCase().match(search.toLocaleLowerCase())
                || country.region.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFiltered(newData)
        console.log(filtered)
    }, [search])

    const toggleHandle = () => {
        toggle ? setToggle(false) : setToggle(true)

    }
 

    return (
        <>
            <DataTable

                columns={columns}
                data={filtered}
                selectableRows
                pagination
                
                fixedHeader
                responsive
                BuiltinStory theme={toggle?"dark":'default' }
                progressPending={loading}
                progressComponent={<Loading className='m-5 p-4' />}
                subHeader
          
                title='List of all country'
                actions={
                    <>
                        <CSVLink
                            className='btn btn-sm btn-success'
                            data={filtered}
                            headers={headers}
                            filename={'Text'}
                            target={'_blank'}
                        >
                            < RiDownloadLine />
                            <span > Download</span>

                        </CSVLink>


                       
                    </>

                }

                subHeaderComponent={
                    <>
                     <Form className='position-absolute top-5 start-0 mx-3'>
                            <Form.Check
                                type="switch"
                                id="custom-switch"

                                onClick={toggleHandle}
                            />
                             
                        </Form>
                   
                        <input type='text' placeholder='Search here..'
                        className='w-25 form-control mt-2'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    
                  
                    </>

                   

                }


            />





        </>

    );
};
export default MyComponent