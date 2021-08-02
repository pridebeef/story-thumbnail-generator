// uploads to browser -> this entire thing should remain in the client
// adapted from
// https://stackoverflow.com/questions/51155186/upload-image-to-redux-and-show-in-react-konva
export const Uploader = (props) => {
  const { setImageURL } = props;
  let fileUploaderSelect;
  const onUpload = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setImageURL(reader.result);
    };
  };
  return (
    <div className='ui-uploader-container'>
      <input
        value='Select Image'
        type='button'
        onClick={() => {
          fileUploaderSelect.click();
        }}
      />
      <input
        id='file-uploader-select'
        ref={(ref) => {
          fileUploaderSelect = ref;
        }}
        type='file'
        style={{ display: 'none' }}
        onChange={(event) => {
          onUpload(event);
        }}
      />
    </div>
  );
};
