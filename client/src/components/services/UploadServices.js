import axios from 'axios';

const UploadFile = data => {
    return axios.post('http://localhost:4000/users/upload', data)
}

export default UploadFile;