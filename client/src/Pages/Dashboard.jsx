
import { MdTableChart } from 'react-icons/md'
import Sidebar from '../Components/Sidebar'
import useAuth from '../utils/useAuth'
function Dashboard() {

    useAuth()

    return (
        <div className='flex flex-col md:flex-row'>
          
           <Sidebar/>
           <div className='flex flex-col justify-center items-center mx-auto mt-10 md:mt-0 '>
            <h1 className='text-xl font-semibold mb-3 flex items-center'><MdTableChart/> TableSprint</h1>
            <p className='text-xl font-bold mt-5 md:mt-0'>welcome to TableSprint admin</p>
           </div>
        </div>
    )
}

export default Dashboard