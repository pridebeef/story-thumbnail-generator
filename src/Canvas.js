import './Canvas.css';
import { Stage, Layer, Image, Text, Rect } from 'react-konva';
import React from 'react';

// used from https://konvajs.org/docs/react/Images.html example
class URLImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    this.image = new window.Image();
    this.image.crossOrigin = 'Anonymous';
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    this.setState({
      image: this.image,
    });
  };
  render() {
    let aspectRatio = 1.0;
    let offset = { x: 0, y: 0 };

    if (this.image && this.image.width !== 0 && this.image.height !== 0) {
      console.log({ w: this.image.width, h: this.image.height });
      if (this.image.width > this.image.height) {
        aspectRatio = this.props.width / this.image.width;
        offset.y = (this.props.height - this.image.height * aspectRatio) / 2;
      } else {
        aspectRatio = this.props.height / this.image.height;
        offset.x = (this.props.width - this.image.width * aspectRatio) / 2;
      }
    }

    return (
      <Image
        crossOrigin='Anonymous'
        x={offset.x}
        y={offset.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
        scaleX={aspectRatio}
        scaleY={aspectRatio}
      />
    );
  }
}

export const Canvas = (props) => {
  const { imageURL, textboxCount, textboxValues, settings } = props;
  const stageWidth = 256;
  const stageHeight = 256;

  const title = (
    <Text
      x={0}
      y={settings.marginTitleTop}
      text={textboxValues[0]}
      fontSize={settings.titleFontSize}
      fontFamily={settings.fontFamily}
      fill={settings.textColor.hex}
      opacity={parseFloat(settings.textColor.rgb.a)}
      width={stageWidth}
      align={'center'}
    />
  );
  const text = [...Array(textboxCount - 1)].map((_, i) => {
    return (
      <Text
        x={settings.leftAlign ? settings.leftAlignMargin : 0}
        y={
          i * settings.marginSpacing +
          settings.marginTitleTop +
          settings.marginTitleBottom
        }
        text={
          textboxValues[i + 1]
            ? `${settings.prependToggle ? settings.prependCharacter : ''} ${
                textboxValues[i + 1]
              }`
            : ''
        }
        fontSize={settings.fontSize}
        fontFamily={settings.fontFamily}
        fill={settings.textColor.hex}
        opacity={parseFloat(settings.textColor.rgb.a)}
        width={stageWidth}
        align={settings.leftAlign ? 'left' : 'center'}
        key={i}
      />
    );
  });

  const background = (
    <Rect
      x={settings.backgroundPadding / 2}
      width={stageWidth - settings.backgroundPadding}
      y={settings.backgroundPadding / 2}
      height={stageHeight - settings.backgroundPadding}
      fill={settings.backgroundColor.hex}
      opacity={parseFloat(settings.backgroundColor.rgb.a)}
    />
  );

  return (
    <Stage ref={props.stageRef} width={stageWidth} height={stageHeight}>
      <Layer>
        <URLImage src={imageURL} width={stageWidth} height={stageHeight} />
      </Layer>
      <Layer>{settings.backgroundToggle ? background : null}</Layer>
      <Layer>
        {title}
        {text}
      </Layer>
    </Stage>
  );
};
