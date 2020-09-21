import React, { useEffect, useState } from 'react';
import { getCourseInfo, sendMail } from '../core/Api/Api';
import Alert from './UI/Alert';

const ApplicationForm = () => {

    const [values, setValues] = useState({
        parentName: '',
        parentNumber: '',
        parentEmail: '',
        studentName:'',
        studentAge: '',
        id: '',
        courseDate:'',
        error: '',
        loading: false,
        success: false
    });

    const [courses, setCourse ] = useState([]);

    const [ alert, setAlert ] = useState({
        type: '',
        message: ''
    });

    const handleChange = (attribute) => event => {
        setValues({...values, [attribute]:event.target.value})
    }

    const courseInfo = () => {
        getCourseInfo()
            .then(response => {
                console.log(response)
                setCourse(response);
            }).catch( err => {
                setValues({...values, error: err});
            })
    }

    useEffect(()=>{
        courseInfo();
    },[])

    const getTimeSlots = () => 
        courses[courses.findIndex(item => item.course_id === parseInt(values.id))].slots
            .map((item, index) => {
                const d = new Date(parseFloat(item.slot));

                return <option key={index} value={d.toLocaleString()}>
                    {d.toLocaleString()}
                </option>
        })

    
    const courseList = () => courses.map(item => (
            <option key={item.course_id} value={item.course_id}>
                {item.course_name}
            </option>
    ))

    const submitHandler = () => {
        setValues({...values, loading:true})
        setAlert({type:'info', message: 'Loading...'})
        sendMail(values)
            .then(data => {
                if(data.status){
                    console.log(data.status)
                    setAlert({type:'success', message: 'Email Sent.'})
                    setValues({
                        parentName: '',
                        parentNumber: '',
                        parentEmail: '',
                        studentName:'',
                        studentAge: '',
                        error: '',
                        success: false
                    })
                    setTimeout(() => {
                        setValues({...values, loading:false})
                    }, 3000);
                }else{ 
                    setAlert({type:'danger', message: 'Invalid Request'})
                    setTimeout(() => {
                        setValues({...values, loading:false})
                    }, 3000);
                }

                
    })
}

    return(
        <div className="row">
            <div className="col-md-6 m-auto">
                <h1 className="text-center display-4 my-4">Course Application</h1> 
                {values.loading && <Alert type={alert.type} message={alert.message} />}
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Parent Name</label>
                        <input type="text" className="form-control" placeholder="John" onChange={handleChange('parentName')}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Parent Number</label>
                        <input type="text" className="form-control" placeholder="8888888888" onChange={handleChange('parentNumber')}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Parent's Email</label>
                    <input type="text" className="form-control" id="inputEmail" placeholder="john@gmail.com" onChange={handleChange('parentEmail')}/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Student Name</label>
                        <input type="text" className="form-control" placeholder="Jason" onChange={handleChange('studentName')}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Student Age</label>
                        <input type="number" className="form-control" placeholder="10" onChange={handleChange('studentAge')}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputState">Course</label>
                        <select id="inputState" className="form-control" onChange={handleChange('id')}>
                            {courseList().length===0?<option>Loading...</option>:courseList()}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputDate">Date</label>
                        <select id="inputDate" className="form-control" onChange={handleChange('courseDate')}>
                            {values.id?getTimeSlots():<option>Loading...</option>}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={submitHandler}>Submit!</button>
            </div>
        </div>
    )
}

export default ApplicationForm;