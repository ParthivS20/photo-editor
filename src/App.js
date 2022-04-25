import './App.css';
import {useRef, useState} from "react";
import ImageUpload from "./components/ImageUpload";
import html2canvas from "html2canvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateRight} from "@fortawesome/free-solid-svg-icons";

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
    const [fontSize, setFontSize] = useState(0);
    const [lineHeight, setLineHeight] = useState(0);
    const [top, setTop] = useState(0);
    const [right, setRight] = useState(0);
    const imageInpRef = useRef();

    const maxImageWidth = '50vw';
    const maxImageHeight = '80vh';

    const textStyle = {
        top: `calc(2% + ${top}px)`,
        right: `calc(4.5% - ${right}px)`,
        lineHeight: `calc(10% + ${lineHeight}px)`,
        fontSize: `calc(120% + ${fontSize}px - 2px)`
    }

    const getImageWidth = () => {
        if (!image) return;
        if (image.width < image.height) {
            return `calc(${maxImageHeight} * (${image.width}px / ${image.height}px))`;
        }
        return maxImageWidth;
    }

    const getImageHeight = () => {
        if (!image) return;
        if (image.height < image.width) {
            return `calc(${maxImageWidth} * (${image.height}px / ${image.width}px)))`;
        }
        return maxImageHeight;
    }

    const getDate = () => {
        let d = new Date(date);
        let month;
        switch (d.getMonth()) {
            case 0:
                month = 'Jan';
                break;
            case 1:
                month = 'Feb';
                break;
            case 2:
                month = 'Mar';
                break;
            case 3:
                month = 'Apr';
                break;
            case 4:
                month = 'May';
                break;
            case 5:
                month = 'Jun';
                break;
            case 6:
                month = 'Jul';
                break;
            case 7:
                month = 'Aug';
                break;
            case 8:
                month = 'Sep';
                break;
            case 9:
                month = 'Oct';
                break;
            case 10:
                month = 'Nov';
                break;
            case 11:
                month = 'Dec';
                break;
            default:
                break;
        }

        return (month + " " + d.getDate() + ", " + d.getFullYear() + " at " + d.toLocaleTimeString() + " CST");
    }

    const getLatLon = () => {
        return latitude + 'N ' + Math.abs(longitude) + 'W';
    }

    const getCityStateZip = () => {
        return (city + " " + state + " " + zipCode)
    }

    const handleReset = () => {
        const resets = document.querySelectorAll('.reload');
        for(let i = 0; i < resets.length; i++) {
            resets.item(i).dispatchEvent(new Event('click'));
        }
    }

    const handleSave = () => {
        html2canvas(document.querySelector("#capture")).then(canvas => {
            saveAs(canvas.toDataURL(), 'image.png');
        });

       const saveAs = (uri, filename) => {
           let link = document.createElement('a');
           if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } else {
                window.open(uri);
            }
        }
    }

    return (
        <div className="App">
            <div className={'info'}>
                <ImageUpload setImage={setImage} imageInpRef={imageInpRef}/>
                <div className={'image-info'}>
                    <a
                        href={image?.src || ''}
                        className={'file-name ' + (image ? '' : 'empty')}
                        onClick={e => {
                            if (!image) e.preventDefault();
                        }}
                        target={'_blank'}
                        rel={'noreferrer'}>
                        {image?.name || "No File Selected"}
                    </a>
                    {image && <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => {
                        setImage(null)
                        imageInpRef.current.value = null;
                    }}/>}
                </div>
                <div className={'input-container'}>
                    <input type={'datetime-local'} step={1} placeholder={'date'} value={date || ''}
                           onChange={e => setDate(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setDate(null)}/>
                </div>
                <div className={'input-container'}>
                    <input type={'number'} placeholder={'Latitude'} value={latitude || ''}
                           onChange={e => setLatitude(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setLatitude(null)}/>
                </div>
                <div className={'input-container'}>
                    <input type={'number'} placeholder={'Longitude'}  value={longitude || ''}
                           onChange={e => setLongitude(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'}  onClick={() => setLongitude(null)}/>
                </div>
                <div className={'input-container'}>
                    <input type={'text'} placeholder={'Address'} value={address || ''}
                           onChange={e => setAddress(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setAddress(null)}/>
                </div>
                <div className={'input-container'}>
                    <input type={'text'} placeholder={'City'} value={city || ''}
                           onChange={e => setCity(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'}  onClick={() => setCity(null)}/>
                </div>
                <div className={'input-container'}>
                    <input type={'text'} placeholder={'State'} value={state || ''}
                           onChange={e => setState(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setState('TX')}/>
                </div>
                <div className={'input-container'}>
                    <input type={'text'} placeholder={'Zip Code'} value={zipCode || ''}
                           onChange={e => setZipCode(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setZipCode(null)}/>
                </div>
                <div className={'input-container'}>
                    <input type={'text'} placeholder={'Country'} value={country || ''}
                           onChange={e => setCountry(e.target.value === '' ? null : e.target.value)}/>
                    <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setImage('United States')}/>
                </div>
                <label className={'range-label'}>
                    <div className={'range-title'}>Font Size</div>
                    <div className={'range-container'}>
                        <input type={'range'} min={-10} max={10} value={fontSize} onChange={e => setFontSize(e.target.value)}/>
                        <span className={'range-value'}>{fontSize}</span>
                        <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setFontSize(0)}/>
                    </div>
                </label>
                <label className={'range-label'}>
                    <div className={'range-title'}>Line Height</div>
                    <div className={'range-container'}>
                        <input type={'range'} min={-10} max={10} value={lineHeight} onChange={e => setLineHeight(e.target.value)}/>
                        <span className={'range-value'}>{lineHeight}</span>
                        <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setLineHeight(0)}/>
                    </div>
                </label>
                <label className={'range-label'}>
                    <div className={'range-title'}>X-Ajustment</div>
                    <div className={'range-container'}>
                        <input type={'range'} min={-20} max={20} value={right} onChange={e => setRight(e.target.value)}/>
                        <span className={'range-value'}>{right}</span>
                        <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setRight(0)}/>
                    </div>
                </label>
                <label className={'range-label'}>
                    <div className={'range-title'}>Y-Ajustment</div>
                    <div className={'range-container'}>
                        <input type={'range'} min={-20} max={20} value={top} onChange={e => setTop(e.target.value)}/>
                        <span className={'range-value'}>{top}</span>
                        <FontAwesomeIcon icon={faArrowRotateRight} className={'reload'} onClick={() => setTop(0)}/>
                    </div>
                </label>
                <button className={'reset'} onClick={handleReset}>Reset</button>
            </div>
            <div className={'output'}>
                {
                    image && (
                        <div className={'image-container'} style={{width: getImageWidth(), height: getImageHeight()}}
                             id={'capture'}>
                            <img src={image.src} alt={'uploaded'}/>
                            <div className={'attributes'} style={textStyle}>
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
                {image && <button className={'save'} onClick={handleSave}>Save</button>}
            </div>
        </div>
    );
}

export default App;
