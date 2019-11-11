import React from 'react';
import NewItemView from './NewItemView'
import AppHeader from './AppHeader'
import ListView from './ListView'
import ListItem from './ListItem'
import NoDara from './NoData'
import { HashRouter as Router ,Route, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group';
import './App.css'

class App extends React.Component {
  
  state = {
    StudentsFromLocalStorage : [],
    studentDetails : [],
    KEY : 'STUDENT_DATA'
  }

  getLocalStorageStudentData = () => {
    //console.log("Geting data from local storage...")
    if(localStorage.getItem(this.state.KEY)){
      let localData  = JSON.parse( localStorage.getItem(this.state.KEY) );
      this.setState({ StudentsFromLocalStorage : localData })
    }
    else{
      localStorage.setItem(this.state.KEY,JSON.stringify(this.state.StudentsFromLocalStorage));
    }
  }

  componentDidMount() {
    this.getLocalStorageStudentData()
  }

  saveNewProfile = (NewStudentData) => {
    let newData = [NewStudentData, ...this.state.StudentsFromLocalStorage];
    localStorage.setItem(this.state.KEY,JSON.stringify(newData));
    this.setState({ StudentsFromLocalStorage : newData })
    console.log("Saved...")
  }

  getStudentDetails = (targetedStudent) => {
    //console.log("Geting student details...")
    this.state.StudentsFromLocalStorage.forEach(item =>{
      if(targetedStudent.id === item.id){
        this.setState({ studentDetails : item })
      }
    })
  }

  deleteStudent = (targetedStudent) => {
    const students = this.state.StudentsFromLocalStorage.filter(
      student => student.id !== targetedStudent.id
    )
    localStorage.setItem(this.state.KEY,JSON.stringify(students));
    this.setState({ StudentsFromLocalStorage : students })
    console.log("Deleted..")
  }

  updateStudentDetails = (targetedStudent) => {
    console.log("updating student detail...")
    let studID = targetedStudent.id
    let data = {
        studentID : targetedStudent.studentID,
        studentName : targetedStudent.studentName,
        studentEmail : targetedStudent.studentEmail,
        id : studID
    }
    const students = this.state.StudentsFromLocalStorage.filter(
      student => student.id !== targetedStudent.id
    )
    let newData = [data, ...students];
    localStorage.setItem(this.state.KEY,JSON.stringify(newData));
    this.setState({ StudentsFromLocalStorage : newData })
  }
  
  render(){
    let StudentListJSX = ""
    if(this.state.StudentsFromLocalStorage.length === 0){
      StudentListJSX = <NoDara />
    }else{
      StudentListJSX = this.state.StudentsFromLocalStorage.map(s => 
        (
          <ListView student={s} key={s.id} getStudentDetails={this.getStudentDetails} handleDeleteStudent={this.deleteStudent} />
        ))
    }
    
   
    return (
      <Router basename="/">
        <div className="App">
          <AppHeader />
          <Switch>
            <Route exact path="/AddNew">
              <NewItemView handleNewStudSave={this.saveNewProfile}/>
            </Route>
            <Route exact path="/">
              <CSSTransitionGroup component="div"
                transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={200}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}>
                {StudentListJSX}
              </CSSTransitionGroup>
            </Route>
            <Route exact path="/Edit">
              <CSSTransitionGroup component="div"
                transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={200}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}>
                <ListItem student={this.state.studentDetails} key={this.state.studentDetails.id} handleUpdateStudent={this.updateStudentDetails} />
              </CSSTransitionGroup>
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;