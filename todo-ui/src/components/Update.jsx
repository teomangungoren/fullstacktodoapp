import { retrieveTodoApi } from "./TodoApiService"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";
import { Formik,Field,Form,ErrorMessage} from "formik";
import { updateTodoApi } from "./TodoApiService";


export function Update(){

  const {id}=useParams(); 
  const [description,setDescription]=useState("");
  const [targetDate,setTargetDate]=useState("")
  const authContext=useAuth();
  const username=authContext.username; 
  const navigate=useNavigate();

  useEffect(
    ()=>retrieveTodos(),
    [id]
  );


function retrieveTodos(){
  retrieveTodoApi(username,id)
  .then(response=>{setDescription(response.data.description)
                   setTargetDate(response.data.targetDate)})
  .catch(error=>console.log(error))
}

function onSubmit(values){
  console.log(values);
  const todo={
    id:id,
    username:username,
    description:values.description,
    targetDate:values.targetDate,
    done:false
  }
  updateTodoApi(username,id,todo)
  .then(response=>{navigate("/todo")})
}

function validate(values){
 let errors={
  //description:"enter a valid description",
  //targetDate:"enter a valid targetDate"
 }
 if(values.description.length<4){
  errors.description="Description must be atleast 5 characters"
 }
 if(values.targetDate==null){
  errors.targetDate="targetDate cant be null"
 }
 
  console.log(values);
  return errors;
}

  return(
    <div className="container">
        <h1>Enter todo details</h1>
        <div>
          <Formik initialValues={{description,targetDate}}
           enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}>
            {
              (props)=>(
                <Form>
                  <ErrorMessage
                   name="description" component="div" className="alert alert-warning"/>
                   <ErrorMessage
                   name="targetDate" component="div" className="alert alert-warning"/>
                  <fieldset className="form-group">
                     <label>Description</label>
                     <Field type="text" className="form-control" name="description"></Field>
                   </fieldset>
                   <fieldset className="form-group">
                     <label>Target Date</label>
                     <Field type="date" className="form-control" name="targetDate"></Field>
                   </fieldset>
                   <div>
                     <button className="btn btn-success m-5" type="submit" >Save</button>
                   </div>
                </Form>
              )
            }
          </Formik>
        </div>
    </div>
  )

}