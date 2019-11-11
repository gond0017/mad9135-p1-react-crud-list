import React from 'react'
import { Link } from 'react-router-dom'
import './ListView.css'


function ListView(props){

    return(
        
        <div className="StudentCard"> 
            <div className="card-body">
                <div className="left-align">
                    <h2 className="Profile-name"> {props.student.studentName} <br/>
                        <span className="profile-id">{props.student.studentID} </span> <br/>
                        <span className="profile-email"> {props.student.studentEmail} </span>
                    </h2>
                </div>
                <div className="right-align">
                    <Link className="btn btn-edit" to="/Edit" onClick={() => props.getStudentDetails(props.student)} >Edit</Link>
                    <button type="button"  className="btn btn-delete" onClick={() => props.handleDeleteStudent(props.student)}>Delete</button>
                </div>
            </div>
        </div>

    )

}

export default ListView