import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactServices } from "../../Services/ContactServices";


const AddContact = () => {

  let navigate=useNavigate()

  let [state,setstate] = useState({
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
        setstate({...state,loading:true})
        let groupResponse = ContactServices.getGroups()

        res(groupResponse)
        rej("error")
      })
      prom.then((resp1)=>{
            setstate({...state,loading:false,groups:resp1.data})
            console.log(resp1.data);
      }).catch((error)=>{
          setstate({...state,loading:false,errorMessage:error})
          alert("Data not found")
      })
  },[])

  let updateInput=(event)=>{
      setstate({
        ...state,contact:{
          ...state.contact,
          [event.target.name]:event.target.value
        }
      })
  }

  let submitForm=(event)=>{
      event.preventDefault();
      let prom = new Promise((res,rej)=>{
          let postContact = ContactServices.createContact(state.contact)

          res(postContact)
          rej()
      })
      prom.then((resp1)=>{
          
          if (resp1) {
            setstate({...state,contact:resp1.data})
            navigate('/contacts/list', {replace:true})
          } else {
            navigate('/contacts/add', {replace:false})
          }
      }).catch(()=>{
        alert("Data not found")
      })
  }

  let {loading,contact,groups,errorMessage}=state

  return (
    <div>
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      {/* <pre>{JSON.stringify(groups)}</pre> */}
      <section className="create-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                facilis possimus nisi, excepturi error tempore harum provident
                ducimus architecto itaque nulla sequi, omnis consequuntur
                repellendus deleniti adipisci libero veritatis fuga.
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
                    <input type="email" placeholder="Email" required={true} name="email" value={contact.email} onChange={updateInput} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <input type="text" placeholder="Title" required={true} name="title" value={contact.title} onChange={updateInput} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <input type="text" placeholder="Company" required={true} name="company" value={contact.company} onChange={updateInput} className="form-control" />
                  </div>
                  <div className="mb-2">
                    <select name="group" id="" className="form-control" value={contact.group} onChange={updateInput} required={true}>
                      <option value="" >Select A Group</option>
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
                    <input type="submit" className="btn btn-success" value={"Create"} />
                    <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddContact;
