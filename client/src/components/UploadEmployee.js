import React, { useState } from 'react';
import UploadFile from "./services/UploadServices";

const UploadEmployee = () => {
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [fileSelected, setfileSelected] = useState();

    const handleChange = (e) => {
        //console.log(e.target.files);
        setfileSelected(e.target.files)
    }

    const handleUpload = (e) => { 
        e.preventDefault();
        let data = new FormData();
        data.append('file', fileSelected[0]);
        
        setLoading(true);
        setUploadStatus(false);
        setErrorStatus(false);

        UploadFile(data)
        .then(res => {
            console.log(res);
            setLoading(false);
            setUploadStatus(true);
            setMessage(res.data.message)
        })
        .catch(err => {
            console.log(err.response)
            setLoading(false);
            setErrorStatus(true);
            setMessage(err.response.data.error)
        })
       
      }

    return(
        <div>
            {
                loading ? (
                    <div className="loading">{loading ? 'Loading...' : ''}</div>
                ) : (
                    <form onSubmit={handleUpload}>
                        <div className="status">{ message ? (<div className={errorStatus ? 'error' : 'success'}>{message}</div>) : '' }</div>
                        <div className="form-group"> 
                        <input className="form-control" type="file" accept=".csv" onChange={handleChange} />
                        </div>
                        <button className="btn btn-success">Upload</button>
                    </form>
                )
            }
        </div>
    )
}
 
export default UploadEmployee;