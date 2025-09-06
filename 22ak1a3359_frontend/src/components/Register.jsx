import React, { useState ,useEffect} from 'react';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        mobileNo: '',
        githubUsername: '',
        rollno: '',
        accessCode: ''
    });
    useEffect(() => {
        const data={
        email: "shyampradeepreddy21@gmail.com",
        name: "Yadavakunta Pradeep Reddy",
        mobileNo: "9014311730",
        githubUsername: "ShyamPradeepReddy",
        rollno: "22AK1A3359",
        accessCode: "yzZvgG"
    }
    const Data1= {
    email: "shyampradeepreddy321@gmail.com",
    name: "Yadavakunta Pradeep Reddy",
    rollNo: "22AK1A3359",
    accessCode: "yzZvgG",
    clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
    clientSecret: "tVJaaaRBSeXcRXEM"
}

        // Send data on component mount
        axios.post('http://20.244.56.144/evaluation-service/auth', Data1)
            .then((response) => {
                console.log(response.data.message);
                 console.log(response.data);
                setResponseMsg(response.data.message);
                 saveResponseAsFile(response.data.message);
            })
            .catch((error) => {
                console.error('Error sending data:', error);
                setResponseMsg('Failed to send data');
            });
    }, []);
    useEffect(() => {
        const data={
        email: "shyampradeepreddy21@gmail.com",
        name: "Yadavakunta Pradeep Reddy",
        mobileNo: "9014311730",
        githubUsername: "ShyamPradeepReddy",
        rollno: "22AK1A3359",
        accessCode: "yzZvgG"
    }
        axios.post('http://20.244.56.144/evaluation-service/auth', Data1)
            .then((response) => {
                console.log(response.data.message);
                 console.log(response.data);
                setResponseMsg(response.data.message);
                 saveResponseAsFile(response.data.message);
            })
            .catch((error) => {
                console.error('Error sending data:', error);
                setResponseMsg('Failed to send data');
            });
    }, []);
    useEffect(() => {
        // JSON data to send
        const logData = {
            stack: "backend",
            level: "error",
            package: "handler",
            message: "Received string expected bool"   // Boolean as required by API
        };

        // Send POST request
        axios.post('http://20.244.56.144/evaluation-service/logs', logData)
            .then(response => {
                console.log('API Response:', response.data);
                setResponseMsg(response.data.message);
                setLogID(response.data.logID);
            })
            .catch(error => {
                console.error('Error sending log:', error);
                setResponseMsg('Failed to send log');
            });
    }, []);
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const saveResponseAsFile = (content) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'response.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://20.244.56.144/evaluation-service/register', formData);
            setResponseMsg(response.data.message);
            console.log(response.data);
            console.log(response.data.message);
            const blob = new Blob([response.data.message], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'server_response.txt';
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error submitting form:', error);
            setResponseMsg('Submission failed');
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br /><br />
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
                <input type="text" name="mobileno" placeholder="Mobile No" value={formData.mobileno} onChange={handleChange} required /><br /><br />
                <input type="text" name="githubusername" placeholder="GitHub Username" value={formData.githubusername} onChange={handleChange} required /><br /><br />
                <input type="text" name="rollno" placeholder="Roll Number" value={formData.rollno} onChange={handleChange} required /><br /><br />
                <input type="text" name="accesscode" placeholder="Access Code" value={formData.accesscode} onChange={handleChange} required /><br /><br />
                <button type="submit">Submit</button>
            </form>

            {responseMsg && <p style={{ marginTop: '20px' }}>{responseMsg}</p>}
        </div>
    );
}

export default Register;
