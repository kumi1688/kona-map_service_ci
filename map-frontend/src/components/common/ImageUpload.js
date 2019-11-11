import React from 'react';
import ImageUploader from 'react-images-upload';
import {Button} from "react-bootstrap";
import client from "../../lib/api/client";

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pictures: [], selectedFiles: []};
        this.onDrop = this.onDrop.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    onClick () {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        console.dir(formData);

        return client.post("/api/upload", formData).then(res => {
            alert('성공')
        }).catch(err => {
            alert('실패')
        })
    };

    render() {
        return (
            <>
                <ImageUploader
                    withIcon={true}
                    buttonText='이미지 선택'
                    onChange={this.onDrop}
                    label=""
                    withPreview={true}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <Button variant="outline-info" onClick={this.onClick}>이미지 등록</Button>
            </>
        );
    }
}

export default ImageUpload;
