import {useEffect, useState} from "react";
import ReactCropper from 'react-easy-crop'
import {gcd, getCroppedImg} from "./helpers";

const Cropper = ({onBlobImage, width, height}) => {
  const [crop, setCrop] = useState({
    x: 0, y: 0,
  });
  const [zoom, setZoom] = useState(1)
  const [img, setImage] = useState();
  const [aspectRatio, setAspectRatio] = useState();
  const [croppedArea, setCroppedArea] = useState()
  useEffect(() => {
    if (width && height) {
      const ratio = gcd(width, height);
      setAspectRatio((width / ratio) / (height / ratio))
    }
  }, [width, height])

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result), false);
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = '';
    }
  };
  const onCropComplete = async (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels)
  }

  const endCrop = async () => {
    const croppedImage = await getCroppedImg(
      {width, height},
      img,
      croppedArea
    );
    setImage(undefined);
    onBlobImage(croppedImage);
  }

  return <>
    <input type="file" name="image" id="inputImage" accept="image/jpeg" onChange={onSelectFile}/>
    <br/>
    { img && <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(ev) => {
      setZoom(ev.target.value)
    }} />}
    <div style={{position: 'relative', height, width}} onDoubleClick={endCrop}>
      {
        img && <ReactCropper
          image={img}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onZoomChange={setZoom}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
      }
    </div>
  </>
;
};

export default Cropper