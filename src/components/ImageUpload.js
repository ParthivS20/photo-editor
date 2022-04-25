import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons";

export default function ImageUpload({setImage, imageInpRef}) {
    const handleUpload = event => {
        let src = URL.createObjectURL(event.target.files[0]);
        let img = new Image();
        img.src = src;
        img.onload = () => {
            setImage({
                src: src,
                width: img.width,
                height: img.height,
                name: event.target.files[0].name
            })
        }
    }

    return (
        <div>
            <label className={'custom-file-upload'}>
                <input type="file" onChange={handleUpload} ref={imageInpRef}/>
                <FontAwesomeIcon icon={faCloudUpload} className={'cloud'}/>
                Upload Image
            </label>
        </div>
    )
}
