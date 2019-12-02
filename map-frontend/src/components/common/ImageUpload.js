import React from 'react';
import ImageUploader from 'react-images-upload';
import {Button, Form} from "react-bootstrap";
import client from "../../lib/api/client";

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pictures: []};
        this.onDrop = this.onDrop.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
    }

    onDrop(e) {
        console.dir(e.target.files);
        this.setState({
            //pictures: this.state.pictures.concat(e.target.files),
            //pictures: this.state.pictures.concat(e.target.files)
            pictures: e.target.files
        });
    }

    handleFileInput(e) {
        this.setState({
            pictures: e.target.files[0],
        })
    }

    onClick() {
        let formData = [this.state.pictures.length];
        let i;
        for (i = 0; i < this.state.pictures.length; i++) {
            formData[i] = new FormData();
            //console.dir(this.state.pictures[i]);
            formData[i].append('file', this.state.pictures[i]);
        }

        console.dir(formData);
        //formData.append('file', this.state.pictures);
        //console.dir(formData);
        let imageUrl = [];

        const uploadImage = async () => {
            const upload = async () => {
                for (i = 0; i < formData.length; i++) {
                    const result = await client.post('api/upload', formData[i]);
                    imageUrl[i] = result.data.url;
                    console.dir(result);
                }
            };
            await upload().then( res => {
                alert('업로드 성공');
                this.props.updateImageUrl(imageUrl);
            }  ).catch(err=> alert('업로드 실패'));
        };

        uploadImage();

        /*
        return client.post("/api/upload", formData).then(res => {
            console.dir(res);
            this.props.updateImageUrl(res.data.url);
            alert(`${res.data.key} 업로드 성공`);
        }).catch(err => {
            alert('이미지 파일 업로드 실패');
        });
        */
    };

    render() {
        return (
            <>
                {/*
                <ImageUploader
                    withIcon={true}
                    buttonText='이미지 선택'
                    onChange={this.onDrop}
                    label=""
                    withPreview={true}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                    maxFileSize={5242880}
                />
                <Button variant="outline-info" onClick={this.onClick}>이미지 등록</Button>
                */}

                <input type="file" name="file" multiple onChange={this.onDrop}/>
                <Button type="button" onClick={this.onClick}>업로드</Button>


            </>
        );
    }
}

export default ImageUpload;
