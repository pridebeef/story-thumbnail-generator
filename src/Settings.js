import FontPicker from 'font-picker-react';
import { Component } from 'react';
import './Settings.css';
import { ColorPicker } from './ColorPicker.js';

const INITIAL_FONT = 'Open Sans';

export const initialSettings = {
  fontFamily: INITIAL_FONT,
  backgroundToggle: true,
  backgroundPadding: 0,
  backgroundColor: {
    rgb: { r: '255', g: '255', b: '255', a: '0.3' },
    hex: '#ffffff',
  },
  textColor: {
    rgb: { r: '0', g: '0', b: '0', a: '1' },
    hex: '#000000',
  },
  marginTitleTop: 40,
  marginTitleBottom: 50,
  marginSpacing: 45,
  fontSize: 16,
  titleFontSize: 32,
  prependToggle: true,
  prependCharacter: '•',
  leftAlign: false,
  leftAlignMargin: 30,
};

export class Settings extends Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const setState = (state) => {
      this.props.setSettings({ ...this.props.settings, ...state });
    };
    const setField = (event) => {
      if (event.target.type === 'checkbox') {
        setState({ [event.target.name]: event.target.checked });
      } else {
        setState({ [event.target.name]: event.target.value });
      }
    };
    const setFieldNum = (event) => {
      setState({ [event.target.name]: parseInt(event.target.value) });
    };

    const setBackgroundColor = (color) => {
      setState({ backgroundColor: color });
    };

    const setTextColor = (color) => {
      setState({ textColor: color });
    };

    return (
      <div className='settings'>
        <div className='font-picker'>
          <p className='setting-subheader'>Font:</p>
          <div className='linebreak' />
          <FontPicker
            apiKey='--------------------------------------'
            activeFontFamily={this.props.settings.fontFamily}
            onChange={(nextFont) =>
              setState({
                fontFamily: nextFont.family,
              })
            }
          />
        </div>

        <div className='background-settings'>
          <p className='setting-subheader'>Background:</p>
          <div className='linebreak' />
          <div className='individual-setting'>
            <label htmlFor='background-check'>Show Background:</label>
            <input
              type='checkbox'
              id='background-check'
              checked={this.props.settings.backgroundToggle}
              name='backgroundToggle'
              onChange={setField}
            />
          </div>
          <div className='individual-setting'>
            <p>Color:</p>
            <div>
              <ColorPicker
                color={this.props.settings.backgroundColor}
                setColor={setBackgroundColor}
              />
            </div>
          </div>
          <div className='individual-setting'>
            <p>Padding:</p>
            <input
              type='number'
              id='padding-setting'
              min='0'
              max='127'
              className='text-entry-setting'
              defaultValue={this.props.settings.backgroundPadding}
              name='backgroundPadding'
              onChange={setFieldNum}
            />
          </div>
        </div>

        <div className='text-settings'>
          <p className='setting-subheader'>Text:</p>
          <div className='linebreak' />
          <div className='individual-setting'>
            <p>Color:</p>
            <div>
              <ColorPicker
                color={this.props.settings.textColor}
                setColor={setTextColor}
              />
            </div>
          </div>
          <div className='individual-setting'>
            <label htmlFor='prepend-check'>Prepend:</label>
            <input
              type='text'
              className='text-entry-setting middle-option'
              name='prependCharacter'
              defaultValue={this.props.settings.prependCharacter}
              onChange={setField}
            />
            <input
              type='checkbox'
              id='prepend-check'
              name='prependToggle'
              defaultChecked={this.props.settings.prependToggle}
              onChange={setField}
            />
          </div>
          <div className='individual-setting'>
            <p>Font Size:</p>
            <input
              type='number'
              id='padding-setting'
              min='0'
              className='text-entry-setting'
              defaultValue={this.props.settings.fontSize}
              name='fontSize'
              onChange={setFieldNum}
            />
          </div>
          <div className='individual-setting'>
            <p>Title Font Size:</p>
            <input
              type='number'
              id='padding-setting'
              min='0'
              className='text-entry-setting'
              defaultValue={this.props.settings.titleFontSize}
              name='titleFontSize'
              onChange={setFieldNum}
            />
          </div>
        </div>

        <div className='text-margin-settings'>
          <p className='setting-subheader'>Text Spacing:</p>
          <div className='linebreak' />
          <div className='individual-setting'>
            <p>Title (Top):</p>
            <input
              type='number'
              className='text-entry-setting'
              name='marginTitleTop'
              min='0'
              defaultValue={this.props.settings.marginTitleTop}
              onChange={setFieldNum}
            ></input>
          </div>
          <div className='individual-setting'>
            <p>Title (Bottom):</p>
            <input
              type='number'
              className='text-entry-setting'
              name='marginTitleBottom'
              min='0'
              defaultValue={this.props.settings.marginTitleBottom}
              onChange={setFieldNum}
            ></input>
          </div>
          <div className='individual-setting'>
            <p>Spacing:</p>
            <input
              type='number'
              className='text-entry-setting'
              name='marginSpacing'
              min='0'
              defaultValue={this.props.settings.marginSpacing}
              onChange={setFieldNum}
            ></input>
          </div>
          <div className='individual-setting'>
            <label htmlFor='leftalign-check'>Left Align:</label>
            <input
              type='number'
              min='0'
              className='text-entry-setting middle-option'
              name='leftAlignMargin'
              defaultValue={this.props.settings.leftAlignMargin}
              onChange={setFieldNum}
            />
            <input
              type='checkbox'
              id='leftalign-check'
              name='leftAlign'
              defaultChecked={this.props.settings.leftAlign}
              onChange={setField}
            />
          </div>
        </div>
      </div>
    );
  }
}
