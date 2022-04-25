import './App.css';
import {useState} from "react";
import ImageUpload from "./components/ImageUpload";
import html2canvas from "html2canvas";

function App() {
    const [image, setImage] = useState(null);
    const [date, setDate] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState('TX');
    const [zipCode, setZipCode] = useState(null);
    const [country, setCountry] = useState('United States');

    const maxImageWidth = '50vw';
    const maxImageHeight = '80vh';

    const getImageWidth = () => {
        if(!image) return;
        if(image.width < image.height) {
            return `calc(${maxImageHeight} * (${image.width}px / ${image.height}px))`;
        }
        return maxImageWidth;
    }

    const getImageHeight = () => {
        if(!image) return;
        if(image.height < image.width) {
            return `calc(${maxImageWidth} * (${image.height}px / ${image.width}px)))`;
        }
        return maxImageHeight;
    }

    const getDate = () => {
        let d = new Date(date);
        let month;
        switch (d.getMonth()) {
            case 0: month = 'Jan'; break;
            case 1: month = 'Feb'; break;
            case 2: month = 'Mar'; break;
            case 3: month = 'Apr'; break;
            case 4: month = 'May'; break;
            case 5: month = 'Jun'; break;
            case 6: month = 'Jul'; break;
            case 7: month = 'Aug'; break;
            case 8: month = 'Sep'; break;
            case 9: month = 'Oct'; break;
            case 10: month = 'Nov'; break;
            case 11: month = 'Dec'; break;
            default: break;
        }

        return (month + " " + d.getDate() + ", " + d.getFullYear() + " at " + d.toLocaleTimeString() + " CST");
    }

    const getLatLon = () => {
        return latitude + 'N ' + Math.abs(longitude) + 'W';
    }

    const getCityStateZip = () => {
        return (city + " " + state + " " + zipCode)
    }

    const handleSave = () => {
        html2canvas(document.querySelector("#capture")).then(canvas => {
            saveAs(canvas.toDataURL(), 'image.png');
        });

        function saveAs(uri, filename) {

            var link = document.createElement('a');

            if (typeof link.download === 'string') {

                link.href = uri;
                link.download = filename;

                //Firefox requires the link to be in the body
                document.body.appendChild(link);

                //simulate click
                link.click();

                //remove the link when done
                document.body.removeChild(link);

            } else {

                window.open(uri);

            }
        }
    }

    return (
        <div className="App">
            <div className={'info'}>
                <ImageUpload setImage={setImage} />
                <input type={'datetime-local'} step={1} placeholder={'date'} onChange={e => setDate(e.target.value === '' ? null : e.target.value)}/>
                <input type={'number'} placeholder={'Latitude'} onChange={e => setLatitude(e.target.value === '' ? null : e.target.value)}/>
                <input type={'number'} placeholder={'Longitude'} onChange={e => setLongitude(e.target.value === '' ? null : e.target.value)}/>
                <input type={'text'} placeholder={'Address'} onChange={e => setAddress(e.target.value === '' ? null : e.target.value)}/>
                <input type={'text'} placeholder={'City'} onChange={e => setCity(e.target.value === '' ? null : e.target.value)}/>
                <input type={'text'} placeholder={'State'} defaultValue={state} onChange={e => setState(e.target.value === '' ? null : e.target.value)}/>
                <input type={'text'} placeholder={'Zip Code'} onChange={e => setZipCode(e.target.value === '' ? null : e.target.value)}/>
                <input type={'text'} placeholder={'Country'} defaultValue={country} onChange={e => setCountry(e.target.value === '' ? null : e.target.value)}/>
            </div>
            <div className={'output'}>
                {
                    image && (
                        <div className={'image-container'} style={{width: getImageWidth(), height: getImageHeight()}} id={'capture'}>
                            <img src={image.src} alt={'uploaded'}/>
                            <div className={'attributes'}>
                                {date && <p>Network:{getDate()}</p>}
                                {date && <p>Local:{getDate()}</p>}
                                {latitude && longitude && <p>{getLatLon()}</p>}
                                {address && <p>{address}</p>}
                                {city && state && zipCode && <p>{getCityStateZip()}</p>}
                                {country && <p>{country}</p>}
                            </div>
                        </div>
                    )
                }
                {image && <button onClick={handleSave}>Save</button>}
            </div>
        </div>
    );
}

export default App;
