import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../../Services/ContactServices";
import Spinner from "../../Spinner/Spinner";

const ViewContact = () => {
    let{contactID}=useParams()
    let [state,setState] = useState({

          loading:false,
          contact:{},
          errorMessage:""
    })

    useEffect(()=>{
        
        let prom = new Promise((res1,rej1)=>{
          setState({...state,loading:true})
          let response = ContactServices.getContact(contactID)

          res1(response)
          rej1()
        })

        prom.then((resp1)=>{
            setState({...state,loading:false,contact:resp1.data})
            console.log(resp1.data);
        }).catch((error)=>{
          setState({...state,loading:false,errorMessage:error})
                alert("Data not found!!!")
        })
    },[contactID])

    let {loading,contact,errorMessage}=state
  return (
    <div>
      {/* SECTION-1 */}
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 fw-bold text-warning">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus quam fugit asperiores veniam facere odio consequatur
                id, earum voluptatum, minima ipsam velit consectetur, tempora
                amet sequi quisquam! Ratione, ut sint?
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* SECTION-2 */}
      {
        loading?<Spinner/> : 
          <React.Fragment>
            {
              Object.keys(contact).length>0 &&
              <section className="view-contact-data">
              <div className="container">
                {/* ROW-1 */}
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                  <img src={contact.photo} alt="" className='profile'/>
                  </div>
                </div>
                {/* ROW-2 */}
                <div className="row d-flex justify-content-center my-3">
                  <div className="col-md-6">
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
                          <li className='list-group-item list-group-item-action'>
                            Title : <span className='fw-bold'>{contact.title}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Company : <span className='fw-bold'>{contact.company}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Group : <span className='fw-bold'>{contact.group}</span>
                          </li>
                      </ul>
                  </div>
                </div>
                {/* ROW-3 */}
                <div className="row ">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Link to={'/'} className="btn btn-warning">BACK</Link>
                  </div>
                </div>
              </div>
            </section>
            }
          </React.Fragment>
      }
      
    </div>
  );
};

export default ViewContact;
