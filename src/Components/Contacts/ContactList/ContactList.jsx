import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ContactList = () => {

let [state,setState] = useState({
      loading:false,
      contacts:[],
      errorMessage:''
})

useEffect(()=>{

      let prom1 = new Promise((res,rej)=>{
          //before updating the data
          setState({...state,loading:true,contacts:[]})
          let response = ContactServices.getAllContacts()

          res(response)
          rej()
      })
      prom1.then((res1)=>{
            //after updating the data
            setState({...state,loading:false,contacts:res1.data})
            console.log(res1.data);
      }).catch(()=>{
            alert("Data not found")
      })
},[])

let clickDelete=(contactID)=>{
    let prom = new Promise((res,rej)=>{
        setState({...state,loading:true,contacts:[]})
        let deleteResponse=ContactServices.deleteContact(contactID)
        res(deleteResponse)
        rej()
    })
    prom.then((resp)=>{
          if(resp){
              let prom1 = new Promise((res1,rej1)=>{
                setState({...state,loading:true,contacts:[]})
                let response = ContactServices.getAllContacts()
                res1(response)
                rej1()
              })
              prom1.then((resp2)=>{
                  setState({...state,loading:false,contacts:resp2.data})
              }).catch(()=>{
                  setState({...state,loading:false,errorMessage})
                  alert("Data not found")
              })
          }
    })
}

let {loading,contacts,errorMessage}=state

  return (
    <div>
      {/* <pre>{JSON.stringify(contacts)}</pre> */}
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">Contact Manager <Link className='btn btn-primary' to={'/contacts/add'}><i className='fa fa-plus-circle me-2' />Add</Link></p>
                <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A cum aperiam assumenda perspiciatis eaque rerum excepturi sint est velit nulla sed, nesciunt laudantium asperiores accusantium esse error dicta architecto. Quod!</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form action="" className='row'>
                  <div className="col-md-8">
                    <div className="mb-2">
                      <input type="text" placeholder='Search Name' className='form-control' />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input type="button" value={"Search"} className='btn btn-outline-dark' />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        loading ? <Spinner/> : 
        <section className="contact-list">
        <div className="container">
          <div className="row">

              {
                 contacts.length>0 && 
                 contacts.map((contact)=>{
                      return(
                        <React.Fragment>
                                <div className="col-md-6 my-2">
                                    <div className="card">
                                      <div className="card-body">
                                        <div className="row align-items-center">
                                          <div className="col-md-4">
                                            <img src={contact.photo} alt="" className='profile'/>
                                          </div>
                                          <div className="col-md-7">
                                            <ul className='list-group'>
                                              <li className='list-group-item list-group-item-action'>
                                                Name : <span className='fw-bold'>{contact.name}</span>
                                              </li>
                                              <li className='list-group-item list-group-item-action'>
                                                Contact : <span className='fw-bold'>{contact.contact}</span> 
                                              </li>
                                              <li className='list-group-item list-group-item-action'>
                                                Email : <span className='fw-bold'>{contact.email}</span>
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="col-md-1 d-flex flex-column align-items-center">
                                            <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-eye'/></Link>
                                            <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary'><i className='fa fa-pen'/></Link>
                                            <button className='btn btn-danger my-1' onClick={()=>{clickDelete(contact.id)}} ><i className='fa fa-trash'/></button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                        </React.Fragment>
                      )
                    })
              }
 
          </div>
        </div>
      </section>
      }
    </div>
  )
}

export default ContactList
