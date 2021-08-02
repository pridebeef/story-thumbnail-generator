import './App.css';
import React, { useState, useRef } from 'react';
import { ExpandableTextboxes } from './Textbox';
import { Canvas } from './Canvas';
import { Uploader } from './Uploader';
import { Settings, initialSettings } from './Settings';

const openBase64ImageInNewTab = (base64ImageData) => {
  // https://stackoverflow.com/questions/27798126/how-to-open-the-newly-created-image-in-a-new-tab
  const contentType = 'image/png';

  const byteCharacters = atob(
    base64ImageData.substr(`data:${contentType};base64,`.length)
  );
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }
  const blob = new Blob(byteArrays, { type: contentType });
  const blobUrl = URL.createObjectURL(blob);

  window.open(blobUrl, '_blank');
};

const MainUI = (props) => {
  const [textboxCount, setTextboxCount] = useState(1);
  const [textboxValues, setTextboxValues] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [settings, setSettings] = useState(initialSettings);
  const stageRef = useRef();

  const handleSave = () => {
    openBase64ImageInNewTab(stageRef.current.toDataURL());
  };

  return (
    <div className='main-ui'>
      <div className='header'>
        <p className='header-text'>Quick Thumbnail Generator</p>
      </div>
      <div className='ui-columns'>
        <div className='ui-input'>
          <div className='ui-entry'>
            <Uploader setImageURL={setImageURL} />
            <ExpandableTextboxes
              count={textboxCount}
              setCount={setTextboxCount}
              values={textboxValues}
              setValues={setTextboxValues}
            />
          </div>
          <div className='linebreak'></div>
          <div className='centered-info'>
            <a href='https://github.com/pridebeef'>
              github/pridebeef/thumbnailgen
            </a>
            <p>* 100% client side</p>
            <p>all outputs 256x256 </p>
          </div>
        </div>

        <div className='canvas-window'>
          <Canvas
            imageURL={imageURL}
            textboxCount={textboxCount}
            textboxValues={textboxValues}
            settings={settings}
            stageRef={stageRef}
          />
        </div>
        <div className='ui-submit'>
          <Settings settings={settings} setSettings={setSettings} />
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className='App'>
      <MainUI></MainUI>
    </div>
  );
}

export default App;
