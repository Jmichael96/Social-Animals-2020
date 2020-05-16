import React, { Component } from 'react';
import axios from 'axios';

class Image extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null
        }
    } 


    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        });
    }
    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("/api/image/upload", data, {
          // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
          console.log(res.statusText)
        })
        .catch((err) => {
    
        })
      }
      onChangeHandler = event => {

        console.log(event.target.files[0]);
    
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form>
                        <h3>React File Upload</h3>
                        <div className="form-group">
                            <input type="file" name="file" onChange={this.onChangeHandler} />
                        </div>
                        <div className="form-group">
                        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
// const Image = () => {
//     const [file, setFile] = useState('');

//     const onFormSubmit = (e) => {
//         e.preventDefault();
//         console.log(file);
//         axios.post('/api/image/upload', file)
//         .then((res) => {
//             console.log(res);
//         })
//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <form onSubmit={(e) => onFormSubmit(e)}>
//                     <h3>React File Upload</h3>
//                     <div className="form-group">
//                         <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
//                     </div>
//                     <div className="form-group">
//                         <button className="btn btn-primary" type="submit">Upload</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }
export default Image;
