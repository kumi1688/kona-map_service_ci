import React, { Component } from 'react'
import client from "../../lib/api/client";

class ImageUploadRaw extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null,
        }
    }

    handleFileInput(e){
        console.dir(e);
        this.setState({
            selectedFile : e.target.files[0],
        })
        console.dir(this.state.selectedFile);
    }

    handlePost(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        console.dir(formData);
        return client.post("/api/upload", formData).then(res => {
            alert('성공')
        }).catch(err => {
            alert('실패')
        })
    }

    render() {
        return (
            <div>
                <input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
                <button type="button" onClick={this.handlePost}>제출</button>
            </div>
        )
    }
}

export default ImageUploadRaw;
