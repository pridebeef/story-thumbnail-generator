import './Textbox.css';

export const Textbox = ({ value, callback, id }) => {
  const handleChange = (event) => {
    const v = event.target.value;
    callback(v, id);
  };
  return (
    <div>
      <input type='text' value={value} onChange={handleChange} />
    </div>
  );
};

export const ExpandableTextboxes = (props) => {
  const { values, setValues, count, setCount } = props;
  const handleUpdate = (v, id) => {
    setValues({ ...values, [id]: v });
  };

  const textboxes = [];
  for (let i = 0; i < count; ++i) {
    let label = 'Title:';
    if (i > 0) {
      label = `Tag:`;
    }
    textboxes.push(
      <div key={i} className='expandable-textbox-child'>
        <p className='expandable-textbox-label'>{label}</p>
        <Textbox
          key={i}
          value={values[i]}
          callback={(v) => {
            handleUpdate(v, i);
          }}
        />
      </div>
    );
  }

  let removeButton;
  if (count > 1) {
    removeButton = (
      <button
        className='expandable-textbox-removebutton'
        onClick={() => setCount(count - 1)}
      >
        Remove
      </button>
    );
  }

  return (
    <div className='expandable-textbox-container'>
      <div className='expandable-textbox-children'>{textboxes}</div>
      <div className='expandable-textbox-buttons'>
        <button
          className='expandable-textbox-addbutton'
          onClick={() => setCount(count + 1)}
        >
          Add
        </button>
        {removeButton}
      </div>
    </div>
  );
};
