import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { GrAddCircle } from 'react-icons/gr'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios'
import Form from 'react-bootstrap/form'
const CustomersManagement = () => {
  const [cusData, setCusData] = useState([]);
  const searchKeys = ['firstName', 'lastName', 'email', 'phone'];
  const [search, setSearch] = useState('');
  const [isAdd, setIsAdd] = useState(false)
  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [isActive, setIsActive] = useState('0');
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    CustomersData();
  }, [])
  const CustomersData = () => {
    axios.get(`http://localhost:8080/saparate/api/jenkins/userManagement/customers`).then(
      (res) => {
        const { data } = res;

        setCusData(data)
        console.log(data);
      }, (err) => console.log(err)
    )
  }
  const Add = () => {
    setIsAdd(true);
    setIsEdit(true);
    ErraseData();
  }
  const Delete = (did) => {
    setIsDelete(true);
    setId(did);
  }
  const Edit = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setPhone(data.phone);
    setIsAdmin(data.isActive);
    setIsActive(data.isActive);
    setCompany(data.tenantName);
    setId(data.id);
    setIsEdit(true);
    setIsAdd(false);
    // setId(eid);
  }
  const custAddOrEdit = () => {
    axios.post(`http://localhost:8080/saparate/api/jenkins/users/user`,
      {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        isActive: isActive,
        isAdmin: isAdmin,
        tenantName: company
      }).then((res) => {

        if (res.status === 200) {
          setMessage("Recoarded is Updated .....!")
        }
        ErraseData();
        setIsEdit(false);
        CustomersData();

      }, (err) => {
        ErraseData();
        setIsEdit(false);
        setMessage(err)
        CustomersData();
      })


  }
  const CusDelete = (id) => {
    axios.get(`http://localhost:8080/saparate/api/jenkins/users/delete/id/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setMessage("Recoard is Deleted Successfull .....!")
          console.log("message  ", message)
          setId('');
          setIsDelete(false);
          cusData();
        }
      }, (err) => {
        setMessage(err);
        console.log("message  ", message)
        setId('');
        setIsDelete(false);
        cusData();
      })
  }
  const ErraseData = () => {
    setId('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setIsActive('0');
    setCompany('');
    setIsAdmin(false)
  }
  return (
    <div className='d-flex w-100 h-100'>
      <Sidebar />
      <div className='w-100 h-100 m-3'>
        <div className=' fw-bolder'>Customers List</div>
        <div> {message != null ? <div className='text-success p-3'>{message}</div> : ""} </div>
        <div className='main-content'>
          <div className='card'>
            <div className='card-header d-flex justify-content-between'>
              <div className='d-flex text-center'>Customers
                <select class="form-control-sm">
                  <option>rodev-rodev</option>
                  <option>sapcc-sapcc</option>
                </select>
              </div>
              <div><GrAddCircle className='fs-4 ' onClick={() => Add()} /></div>
            </div>
            <div className='card-body'>
              <div className='d-flex justify-content-between'>
                <div className='d-flex'>Shows <input type='text' value={10} className='form-control form-control-sm' style={{ width: '50px' }} />  Entries</div>
                <div className='d-flex'>
                  <label>Search</label>
                  <input type='search' className=' search-box form-control form-control-sm' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <hr />
              <div className='table-data'>
                <table className='table'>
                  <thead>
                    <tr>
                      <td>FIRST NAME</td>
                      <td>LAST NAME</td>
                      <td>EMAIL</td>
                      <td>PHONE</td>
                      <td>ISACTIVE</td>
                      <td>COMPANY-SAP SUB ACCOUNT</td>
                      <td>ISADMIN</td>
                      <td>ACTIONS</td>
                    </tr>
                  </thead>
                  <tbody>
                    {cusData.filter((user) => searchKeys
                      .some((searchKeys) => user[searchKeys].toLowerCase()
                        .includes(search.toLowerCase())))
                      .map((ele, index) => {
                        return (
                          <tr key={index}>
                            <td>{ele.firstName}</td>
                            <td>{ele.lastName}</td>
                            <td>{ele.email}</td>
                            <td>{ele.phone}</td>
                            <td>{ele.isActive == 1 ? "Active" : "InActive"}</td>
                            <td>{ele.tenantName}</td>
                            <td>{ele.admin == true ? "Yes" : "No"}</td>
                            <td>
                              <BiEdit className='m-1' onClick={() => Edit(ele)} />
                              <AiOutlineDelete onClick={() => Delete(ele.id)} />
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add or Edit Modal */}
      <Modal isOpen={isEdit}
        size='sm-6'
        toggle={() => setIsEdit(!isEdit)}>
        <ModalHeader toggle={() => setIsEdit(!isEdit)}>
          {isAdd == true ? "Add Customer" : "Edit Customer"}
        </ModalHeader>
        <ModalBody>
          <div className='container'>
            <div className='row '>
              <div className='col'>
                <div>First Name</div>
                <input type='text' placeholder='First Name' className='form-control '
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className='col'>
                <div>Last Name</div>
                <input type='text' placeholder='Last Name' className='form-control '
                  value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col'>
                <div>Email</div>
                <input type='email' placeholder='Eamil' className='form-control '
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='col'>
                <div>Phone</div>
                <input type='number' placeholder='Phone Number' className='form-control '
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col'>
                <div>Is Active</div>
                <Form.Select className='form-control ' aria-label="Default select example"
                  value={isActive} onChange={(e) => setIsActive(e.target.value)}>
                  <option vlaue="1">Active</option>
                  <option vlaue="0">InActive</option>
                </Form.Select>
              </div>
              <div className='col'>
                <div>Company</div>
                <Form.Select className='form-control ' aria-label="Default select example"
                  value={company} onChange={(e) => setCompany(e.target.value)}>
                  <option vlaue="b1">b1</option>
                  <option vlaue="dev">dev</option>
                </Form.Select>
                {/* <input type='text' placeholder='Company' className='form-control ' /> */}
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col d-flex' >
                <input type='checkbox' vlaue={isAdmin} onChange={() => setIsAdmin(true)} /><div className='m-1'>Is Admin</div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isAdd === true ? <button className='btn btn-primary' onClick={custAddOrEdit}>Add</button> : <button className='btn btn-primary' onClick={custAddOrEdit}>Edit</button>}

        </ModalFooter>
      </Modal>
      {/* Delete Modal */}
      <Modal isOpen={isDelete}
        size='sm-6'
        toggle={() => setIsDelete(!isDelete)}
        id={id}>
        <ModalHeader toggle={() => setIsDelete(!isDelete)}>
          <div>Delete Customer</div>
        </ModalHeader>
        <ModalBody>
          <div>Are you sure you want to delete</div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => CusDelete(id)}>Delete</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CustomersManagement