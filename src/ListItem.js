import React from 'react'
import { Link } from 'react-router-dom'

class ListItem extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            studentName : props.student.studentName,
            studentEmail : props.student.studentEmail,
            studentID : props.student.studentID
        }
    
        this.handleInputChange = this.handleInputChange.bind(this);
      }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }
    
    handleFormSubmit = (event) => {
        let data = {
            studentID : this.state.studentID,
            studentName : this.state.studentName,
            studentEmail : this.state.studentEmail,
            id: this.props.student.id
        }
        this.props.handleUpdateStudent(data)
    }

    render() {
        return (
            <form id="Add-student-form" className="Add-New-Form">
                <div>
                    <label>Student Name</label>
                    <input type="text" name="studentName" value={this.state.studentName} onChange={this.handleInputChange} placeholder="Enter student name.." />
                </div>
                <div>
                    <label>Student Email</label>
                    <input type="text" name="studentEmail" value={this.state.studentEmail} onChange={this.handleInputChange} placeholder="Enter student email.." />
                </div>
                <div>
                    <label>Student ID</label>
                    <input type="text" name="studentID" value={this.state.studentID} onChange={this.handleInputChange} placeholder="Enter student id.." />
                </div>
                <div>
                    <Link to="/" className="btn" onClick={this.handleFormSubmit} type="submit">Update Student</Link>
                    <Link to="/" className="btn">Cancel</Link>
                </div>
            </form>
        )
    }
}

export default ListItem