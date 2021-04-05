import Cropper from "./Cropper";
import {useCallback, useRef, useState} from "react";
import Form from "./Form";
import {svg2Jpeg} from "./CanvasSvg/helpers";
import formatBytes from "./helpers/format-bytes";

const ImageEditor = () => {
  const svgRef = useRef();

  const [preview, setPreview] = useState('data:image/jpeg;base64,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');
  const [img, setImg] = useState();
  const onBlobImage = useCallback(async (image) => {
    const blob = await fetch(image).then(r => r.blob());
    console.log('image', {blob}, 'fileSize', formatBytes(blob.size));
    setPreview(image);
  }, []);

  const format = {
    name: 'Roba página',
    width: 300,
    height: 140,
    url: '/images/editor-robapagina-custom.svg'
  };
  /*const changeFormat = (width, height, url) => () => {
    setFormat({width, height, url});
  };*/
  /*const buttons = formats.map((f, idx) => {
    return <button key={idx} type="button" onClick={changeFormat(f.width, f.height, f.url)}>{f.name}</button>
  });*/

  const [svgLoaderData, setSvgLoaderData] = useState({
    primaryText: 'Texto primario',
    secondaryText: 'Texto secundario',
    buttonText: 'Texto botón'
  })
  const handleFormChange = (data) => {
    setSvgLoaderData(data);
  }

  const handleSubmit = async () => {
    const base64 = await svg2Jpeg(svgRef.current)
    const blob = await fetch(base64).then(r => r.blob());
    setImg({base64, blob});
  }

  return <div>
    <h3>Cortar Imagen</h3>
    <Cropper width={format.width} height={format.height} onBlobImage={onBlobImage}/>
    <hr/>
    <div className="">
      <h3>Form</h3>
      <Form values={svgLoaderData} onChange={handleFormChange}/>
      <button onClick={handleSubmit}>Generar Imagen</button>
    </div>
    <hr/>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: format.width, padding: 5}}>
        <h3>Preview</h3>
        <svg ref={svgRef} viewBox="0 0 300 250" enableBackground="new 0 0 300 250"
             height="250" width="300">
          <g>
            <rect fill="#FFFFFF" width="300" height="250"/>
            <rect x="1.5" y="1.5" fill="none" stroke="#CECECE" strokeWidth="3" width="297" height="247"/>
            <image id="cover" width="300" height="140"
                   href={preview}/>
          </g>
          <g>
            <text id="text-primary" x="50%" y="166" fontSize="17" textAnchor="middle"
                  fontFamily="Arial, Helvetica, sans-serif">
              {svgLoaderData.primaryText}
            </text>
            <text id="text-secondary" x="50%" y="190" fontSize="14" textAnchor="middle"
                  fontFamily="Arial, Helvetica, sans-serif">
              {svgLoaderData.secondaryText}
            </text>
          </g>
          <g>
            <path fill="#006CA5" d="M100,205h100c8.3,0,15,6.7,15,15l0,0c0,8.3-6.7,15-15,15H100c-8.3,0-15-6.7-15-15
			l0,0C85,211.7,91.7,205,100,205z"/>
            <text fill="#FFFFFF" x="50%" y="224" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif">
              {svgLoaderData.buttonText}
            </text>
          </g>
        </svg>
      </div>
      <div style={{padding: 5}}>
        <h3>Generado</h3>
        {img && <p>FileSize: {formatBytes(img.blob.size)}</p>}
        {img ? <img src={img.base64} alt="No hay imagen"/> : <p>No hay imagen</p>}
      </div>
    </div>
  </div>
}

export default ImageEditor;