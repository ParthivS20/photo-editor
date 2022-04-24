import React from "react";

export default function ImageUpload({setImage}) {
    const handleUpload = event => {
        let src = URL.createObjectURL(event.target.files[0]);
        let img = new Image();
        img.src = src;
        img.onload = () => {
            setImage( {
                src: src,
                width: img.width,
                height: img.height
            })
        }
    }

    return (
        <div>
            <input type="file" onChange={handleUpload}/>
        </div>
    )
}
