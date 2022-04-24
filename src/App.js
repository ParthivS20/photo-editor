import './App.css';
import {useState} from "react";
import ImageUpload from "./components/ImageUpload";

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
            return `calc(${maxImageHeight} * ${image.width / image.height})`;
        }
        return maxImageWidth;
    }

    const getImageHeight = () => {
        if(!image) return;
        if(image.height < image.width) {
            return `calc(${maxImageWidth} * ${image.height / image.width})`;
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
                        <div className={'image-container'} style={{width: getImageWidth(), height: getImageHeight()}}>
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
            </div>
        </div>
    );
}

export default App;
