import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { GrAddCircle } from 'react-icons/gr'
import Form from 'react-bootstrap/Form';
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import PageNation from '../views/PageNation';
const CompanyManagement = () => {
  const [companyData,setCompanyData]=useState([]);
  const [pageRecoards,setPageRecoards]=useState([]);
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isSapCloud, setIsSapCloud] = useState(false);
  const [isHana, setIsHana] = useState(false)
  const [isABAP, setIsABAP] = useState(false);
  const [isOnPremise, setIsOnPremise] = useState(false);
  const [isSapCpi, setIsSapCpi] = useState(false);
  const [id,setId]=useState('');
  useEffect(()=>{
    CompanyDetails();
  },[]);
  const CompanyDetails=()=>{
    axios.get(`http://localhost:8080/rateadmin/api/admin/companies`)
    .then((res)=>{
      const {data}=res;
      setCompanyData(data);
      console.log("data ",data)
    },(err)=>console.log(err))
  }
  const pageData=(recoards)=>{
    // setPageRecoards('');
    setPageRecoards(recoards);
    console.log("page Recoards are ",pageRecoards)
  }
  const Add = () => {
    setIsAdd(true);
    setIsEdit(true);
  }
  const Edit = (data) => {
    setIsEdit(true);
    setIsAdd(false)
  }
  const AddOrEditComp = () => {
    setIsEdit(false);
  }
  const Delete = () => {
    setIsDelete(true);

  }
  const DeleteComp = () => {
    setIsDelete(false);
  }
  return (
    <div className='d-flex w-100 h-100'>
      <Sidebar />
      <div className='w-100 h-100'>
        <div className='mt-3 fw-bolder  m-3'>Companies List</div>
        {message != null ? <div className='text-success'>{message}</div> : <div/>}
        <div className='main-content m-3'>
        <div className='card'>
          <div className='card-body'>
          <div className='header d-flex justify-content-between'>
              <div >Companies</div>
              <div><GrAddCircle className='fs-4 actions' onClick={Add} /></div>
            </div>
            <hr/>
            <div className='title d-flex justify-content-between'>
              <div className='d-flex'>Shows
                <input type='text' value={10} className='form-control form-control-sm' style={{ width: '50px' }} />
                Entries</div>
              <div className='d-flex'>
                <label>Search</label>
                <input type='search' className=' search-box form-control form-control-sm' /></div>
            </div>
            <hr />
            <div className='table-data'>
              <table className='table table-responsive text-nowrap table-sm small'>
                <thead>
                  <tr>
                    <th>COMPANY NAME</th>
                    <th>SAP SUBACCOUNT NAME</th>
                    <th>WEBSITE</th>
                    <th>ISACTIVE</th>
                    <th>SUBSCRPTION</th>
                    <th>ACTIVATED DATE</th>
                    <th>RENEWAL DATE</th>
                    <th>TOTAL ADMINLICENSES</th>
                    <th>TOTAL USERLICENSEN</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRecoards.map((ele,index)=>{
                    return(
                  <tr key={index}>
                  <td>{ele.name}</td>
                  <td>{ele.sapSubaccountName}</td>
                  <td>{ele.website}</td>
                  <td>{ele.isActive==true ? "Active":"InActive"}</td>
                  <td>{ele.subscriptions}</td>
                  <td>{ele.activatedDate}</td>
                  <td>{ele.renewalDate}</td>
                  <td>{ele.tenantSettings.totalAdminLicenses}</td>
                  <td>{ele.tenantSettings.totalUserLicenses}</td>
                  <td>
                  <BiEdit className=' actions m-1' onClick={() => Edit(ele)}  />
                  <AiOutlineDelete  className="actions" onClick={() => Delete(ele.id)} />
                  </td>
                  </tr>
                 )})}
                </tbody>
              </table>
              <PageNation data={companyData} pageData={pageData}/>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Modal isOpen={isEdit}
        size='sm-6'
        toggle={() => setIsEdit(!isEdit)}>
        <ModalHeader toggle={() => setIsEdit(!isEdit)}>
          {isAdd == true ? "Add New Customer" : "Edit Customer"}
        </ModalHeader>
        <ModalBody>
          <div className='container'>
            <div className='row '>
              <div className='col'>
                <div>Company Name</div>
                <input type='text' placeholder='Company Name' className=' form-control form-control-sm' />
              </div>
              <div className='col'>
                <div>Website</div>
                <input type='text' placeholder='Website' className=' form-control form-control-sm' />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col'>
                <div>SAP Subaccount Name</div>
                <input type='text' placeholder='SAP Subaccount Name' className=' form-control form-control-sm' />
              </div>
              <div className='col'>
                <div>SAP Subaccount UUID</div>
                <input type='text' placeholder='SAP Subaccount UUID' className=' form-control form-control-sm' />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col'>
                <div>Phone</div>
                <input type='number' placeholder='Phone' className=' form-control form-control-sm' />
              </div>
              <div className='col'>
                <div>IsActive</div>
                <Form.Select className='form-control form-control-sm'>
                  <option value='1'>IsActive</option>
                  <option value='0'>InActive</option>
                </Form.Select>
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col'>
                <div>CROS Domain</div>
                <input type='text' placeholder='CROS Domain' className=' form-control form-control-sm' />
              </div>
              <div className='col'>
                <div>Subscriptions</div>
                <input type='number' placeholder='Subscriptions' className=' form-control form-control-sm' />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-6'>
                <Form.Select className='form-control form-control-sm '>
                  <option vlaue="Select">Select</option>
                </Form.Select>
              </div>

            </div>
            <div className='row mt-4'>
              <div className='col'>
                <div>Total AdminLicenses</div>
                <input type='number' placeholder='Total AdminLicenses' className=' form-control form-control-sm' />
              </div>
              <div className='col'>
                <div>Total UserLicenses</div>
                <input type='number' placeholder='Total UserLicenses' className=' form-control form-control-sm' />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-6'>
                <div>Volume Path</div>
                <input type='text' placeholder='Volume Path' className='form-control form-control-sm' />
              </div>
            </div>
            <div className=' row mt-4'>
              <div className='col-6 d-flex'>
                <input type='checkbox' onClick={() => setIsSapCloud(!isSapCloud)} />
                <div className=''>SAPCLOUD License</div>
              </div>
              {isSapCloud && <div className='row mt-3'>
                <div className='col-6'>
                  <div>Environments</div>
                  <input type='text' placeholder='Environments' className='form-control form-control-sm' />
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <div>StartDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                  <div className='col'>
                    <div>ExpiryDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                </div>
              </div>
              }
            </div>
            <div className=' row mt-4'>
              <div className='col-6 d-flex'>
                <input type='checkbox' onClick={() => setIsHana(!isHana)} />
                <div className=''>HANAXSA License</div>
              </div>
              {isHana && <div className='row mt-3'>
                <div className='col-6'>
                  <div>Environments</div>
                  <input type='text' placeholder='Environments' className='form-control form-control-sm' />
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <div>StartDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                  <div className='col'>
                    <div>ExpiryDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                </div>
              </div>
              }
            </div>
            <div className=' row mt-4'>
              <div className='col-6 d-flex'>
                <input type='checkbox' onClick={() => setIsABAP(!isABAP)} />
                <div className=''>ABAP License</div>
              </div>
              {isABAP && <div className='row mt-3'>
                <div className='col-6'>
                  <div>Environments</div>
                  <input type='text' placeholder='Environments' className='form-control form-control-sm' />
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <div>StartDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                  <div className='col'>
                    <div>ExpiryDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                </div>
              </div>
              }
            </div>
            <div className=' row mt-4'>
              <div className='col-6 d-flex'>
                <input type='checkbox' onClick={() => setIsOnPremise(!isOnPremise)} />
                <div className=''>ONPREMISE License</div>
              </div>
              {isOnPremise && <div className='row mt-3'>
                <div className='col-6'>
                  <div>Environments</div>
                  <input type='text' placeholder='Environments' className='form-control form-control-sm' />
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <div>StartDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                  <div className='col'>
                    <div>ExpiryDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                </div>
              </div>
              }
            </div>
            <div className=' row mt-4'>
              <div className='col-6 d-flex'>
                <input type='checkbox' onClick={() => setIsSapCpi(!isSapCpi)} />
                <div className=''>SAPCPI License</div>
              </div>
              {isSapCpi && <div className='row mt-3'>
                <div className='col-6'>
                  <div>Environments</div>
                  <input type='text' placeholder='Environments' className='form-control form-control-sm' />
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <div>StartDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                  <div className='col'>
                    <div>ExpiryDate</div><input type='date' className='form-control form-control-sm' />
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isAdd === true ? <buttom className='btn btn-primary' onClick={AddOrEditComp}>Add</buttom> : <buttom className='btn btn-primary' onClick={AddOrEditComp}>Edit</buttom>}
        </ModalFooter>
      </Modal>
      <Modal isOpen={isDelete}
        size='sm-6'
        toggle={() => setIsDelete(!isDelete)}>
        <ModalHeader toggle={() => setIsDelete(!isDelete)}>
          Delete
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete company
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={DeleteComp}>
            Delete
          </button>
        </ModalFooter>

      </Modal>
    </div>
  )
}

export default CompanyManagement