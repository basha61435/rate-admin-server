import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import { GrAddCircle } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios from 'axios';
import Form from 'react-bootstrap/Form';

const Ciserver = () => {
  const [ciServerData, setCiServerData] = useState([]);
  const searchKeys = ['name', 'url', 'hostedType', 'username', 'createdBy', 'creationDate', 'lastModifiedBy', 'lastModifiedDate']
  const [search, setSearch] = useState('')
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [hostedType, setHostedType] = useState('Shared');
  const [isAdd, setIsAdd] = useState(false)
  useEffect(() => {
    CiData();
  }, [])
  const CiData = () => {
    axios.get(`http://localhost:8080/saparate/api/jenkins/ciservers`).then(
      (res) => {
        const { data } = res;

        setCiServerData(data)
        console.log(data);
      }, (err) => console.log(err)
    )
  }
  const Add = () => {
    ErraseData()
    setIsEdit(!isEdit)
    setIsAdd(true)
  }
  const Edit = (props) => {
    setId(props.id);
    setName(props.name);
    setUrl(props.url);
    setHostedType(props.hostedType);
    setPassword(props.password);
    setUserName(props.username)
    setIsEdit(true);
    setIsAdd(false);
  }
  const Delete = (id) => {
    setId(id)
    setIsDelete(true);

  }
  const DeleteCi = () => {
    axios.get(`http://localhost:8080/saparate/api/jenkins/ciservers/delete/${id}`).then(
      (res) => {
        if (res.status === 200) {
          setMessage("Recoard is Deleted ....!");
          setIsDelete(!isDelete);
          CiData();

        }
      }, (err) => {
        setMessage(err);
        setIsDelete(false)
      }
    )
  }
  const AddorEdit = () => {
    setIsAdd(false)
    axios.post(`http://localhost:8080/saparate/api/jenkins/ciservers/add`,
      {
        id: id,
        name: name,
        url: url,
        username: userName,
        password: password,
        hostedType: hostedType
      }).then((res) => {

        if (res.status == 200) {
          setMessage('Recoard is Updated ......!')
          setIsEdit(!isEdit);
          ErraseData();
          CiData();
        }

      }, (err) => {
        setMessage("Recoard is Not Edit.....!")
        ErraseData();
        setIsEdit(!isEdit);
        console.log(err);
        CiData();
      })
  }
  const ErraseData = () => {

    setId('')
    setName('');
    setUrl('');
    setUserName('');
    setPassword('');



  }
  return (
    <div className='d-flex w-100 h-100'>
      <Sidebar />
      <div className='w-100 h-100 m-3'>
        <div className=' fw-bolder'>CI Server List</div>
        <div> {message != null ? <div className='text-success p-2'>{message}</div> : ""} </div>
        <div className='main-content'>
          <div className='card'>
            <div className='card-body'>
              <div className='header d-flex justify-content-between'>
                <div >CI Sever</div>
                <div><GrAddCircle className='fs-4 ' onClick={() => Add()} /></div>
              </div>
              <hr />
              <div className='title d-flex justify-content-between'>
                <div className='d-flex'>Shows
                  <input type='text' value={10} className='form-control form-control-sm' style={{ width: '50px' }} />
                  Entries</div>
                <div className='d-flex'>
                  <label>Search</label>
                  <input type='search' value={search} className=' search-box form-control form-control-sm' onChange={(e) => setSearch(e.target.value)} /></div>
              </div>
              <hr />
              <div className='table-data'>
                <table className='table table-responsive '>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>URL</th>
                      <th>HOSTED TYPE</th>
                      <th>USERNAME</th>
                      <th>CREATED BY</th>
                      <th>CREATION DATE</th>

                      <th>LAST MODIFIED BY</th>
                      <th>LAST MODIFIED DATE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ciServerData.filter((user) => searchKeys
                      .some((searchKeys) => user[searchKeys]
                        .toLowerCase().includes(search.toLowerCase())))
                      .map((ele, index) => {
                        return (
                          <tr key={index}>
                            <td>{ele.name}</td>
                            <td>{ele.url}</td>
                            <td>{ele.hostedType}</td>
                            <td>{ele.username}</td>
                            <td>{ele.createdBy}</td>
                            <td>{ele.creationDate}</td>
                            <td>{ele.lastModifiedBy}</td>
                            <td>{ele.lastModifiedDate}</td>
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
      {/*Add or Edit Modal */}
      <Modal isOpen={isEdit}
        size='sm-6'
        toggle={() => setIsEdit(!isEdit)}>
        <ModalHeader toggle={() => setIsEdit(!isEdit)}>
          {isAdd == true ? "Add New Customer" : "Edit Customer"}
        </ModalHeader>

        <ModalBody>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <input type='text' placeholder='Name' className='form-control ' value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='col'>
                <input type='text' placeholder='URL' className='form-control s'
                  value={url} onChange={(e) => setUrl(e.target.value)} />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col'>
                <input type='text' placeholder='User Name' className='form-control '
                  value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className='col'>
                <input type='password' placeholder='Password' className='form-control '
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className='row mt-4'>
              <div className='col-6 '>
                <Form.Select className='form-control '
                  onChange={(e) => setHostedType(e.target.value)}>
                  <option vlaue="Shared">Shared</option>
                  <option vlaue="On-Premise">On-Premise</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isAdd == true ? <button className='btn btn-primary'
            onClick={() => AddorEdit()}>
            ADD
          </button> : <button className='btn btn-primary'
            onClick={() => AddorEdit()}>
            Edit
          </button>}

        </ModalFooter>
      </Modal>
      {/* Delete Modal */}
      <Modal isOpen={isDelete}
        size='sm-6'
        toggle={() => setIsDelete(!isDelete)}>
        <ModalHeader toggle={() => setIsDelete(!isDelete)}>
          Delete CI Server
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={DeleteCi}>
            Delete
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Ciserver