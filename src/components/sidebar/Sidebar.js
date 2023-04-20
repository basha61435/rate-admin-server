import React, { useState } from 'react'
import { motion } from 'framer-motion';
import '../../assests/Styles/Sytles.css'
import { FaUsersCog, FaServicestack } from 'react-icons/fa'
import { BiLogOutCircle, BiMenuAltRight } from 'react-icons/bi'
import { GiRamProfile, GiCompanionCube } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const Sidebar = ({ children }) => {
    const [isOpen, setISOpen] = useState(false);
    const toggle = () => {
        setISOpen(!isOpen)
    }
    const route = [

        {
            path: '/companyManagement',
            name: 'Company Management',
            icon: <GiCompanionCube />
        },
        {
            path: '/customersManagement',
            name: 'Users Management',
            icon: <FaUsersCog />
        },
        {
            path: '/ciServers',
            name: 'CiServers',
            icon: <FaServicestack />

        },
        {
            path: '/profile',
            name: 'Profile',
            icon: <GiRamProfile />
        },
        {
            path: '/',
            name: 'LogOut',
            icon: <BiLogOutCircle />
        }
    ]
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
       {!isOpen &&  <div>{props}</div> }
        </Tooltip>
      );
    return (
        <div className="main-container">
            <motion.div animate={{ width: isOpen ? "230px" : '40px' }} className='sidebar'>
                <div className='releaseOwl d-flex justify-content-between'>
                    {isOpen && <div className=' cmp-name fs-4 '>ReleaseOwl</div>}


                    <div className=' menu log  fs-3'><BiMenuAltRight onClick={toggle} /></div>
                </div>
                <hr />
                {route.map((routes, index) => {
                    return (
                        <Link to={routes.path} key={index} className='route-name d-flex mt-2'>

                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 350, hide: 400 }}
                                overlay={renderTooltip(routes.name)}
                            >
                                <div className='icon fs-4'>{routes.icon}</div>
                            </OverlayTrigger>

                            {isOpen && <div className='m-2'> {routes.name} </div>}


                        </Link>
                    )


                })}

            </motion.div>
            <div>{children}</div>
        </div>
    )
}

export default Sidebar