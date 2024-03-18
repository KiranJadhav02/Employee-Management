import React, {Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactServices } from "../../Services/ContactServices";
import Spinner from "../../Spinner/Spinner";

const EditContact = () => {

  let navigate=useNavigate()
  let{contactID}=useParams()
  let [state,setState] = useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:"",
      email:"",
      title:"",
      company:""
    },
    groups:[],
    errorMessage:""
})

  useEffect(()=>{
      let prom = new Promise((res,rej)=>{
        setState({...state,loading:true})
        let response = ContactServices.getContact(contactID)
        res(response)
        rej("Error")
      })
      prom.then((resp2)=>{
        setState({...state,loading:false,contact:resp2.data})
        console.log(resp2.data);

        return new Promise((res1,rej1)=>{
          setState({...state,loading:true})
          let groupResponse = ContactServices.getGroups()
          res1(groupResponse)
          rej1("Error")
        }).then((resp3)=>{
          setState({...state,loading:false,contact:resp2.data,groups:resp3.data})
        }).catch((error)=>{
          setState({...state,loading:false,errorMessage:error})
        })
      }).catch((error)=>{
        setState({...state,loading:false,errorMessage:error})
      })
  },[contactID])

  let updateInput=(event)=>{
    setState({
      ...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value
      }
    })
}

let submitForm=(event)=>{
  event.preventDefault();
  let prom = new Promise((res,rej)=>{
      let putContact = ContactServices.updateContact(contactID,state.contact)

      res(putContact)
      rej("Error")
  })
  prom.then((resp1)=>{
      
      if (resp1) {
        setState({...state,loading:false,contact:resp1.data})
        navigate('/contacts/list', {replace:true})
      } 
  }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error})
      navigate(`/contacts/edit/${contactID}`, {replace:false})
    
  })
}


  let {loading,contact,groups,errorMessage}=state

  return (
    <div>
      {
        loading?<Spinner/> : <React.Fragment>
                <section className="edit-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 fw-bold text-primary">Edit Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                laborum, ducimus praesentium quisquam repudiandae provident
                placeat nisi non aut consequatur natus ratione numquam iure
                officia doloribus deleniti. Officia, est porro?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" placeholder="Name" required={true} name="name" value={contact.name} onChange={updateInput} className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="text" placeholder="Photo URL" required={true} name="photo" value={contact.photo} onChange={updateInput} className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="number" placeholder="Mobile Number" required={true} name="contact" value={contact.contact} onChange={updateInput} className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="email" placeholder="Email" required={true} name="email" value={contact.email} onChange={updateInput}  className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="text" placeholder="Title" required={true} name="title" value={contact.title} onChange={updateInput} className="form-control" />
                </div>
                <div className="mb-2">
                  <input type="text" placeholder="Company" required={true} name="company" value={contact.company} onChange={updateInput}  className="form-control" />
                </div>
                <div className="mb-2">
                  <select name="group" id="" className="form-control" value={contact.group} onChange={updateInput} required={true} >
                    <option value="">Select A Group</option>
                    {
                          groups.length>0 &&
                          groups.map((group)=>{
                              return(
                                <option key={group.id} value={group.id}>{group.name}</option>
                              )
                          })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" className="btn btn-primary" value={"Update"} />
                  <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                </div>
              </form>
            </div>
            <div className="col-md-4 d-flex align-items-center">
            <img src={contact.photo} alt="" className='profile'/>
            </div>
          </div>
        </div>
      </section>
        </React.Fragment>
      }
      
    </div>
  );
};

export default EditContact;
