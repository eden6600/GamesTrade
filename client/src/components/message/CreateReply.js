import React from 'react';
import PropTypes from 'prop-types';

export default function CreateReply(props) {
  const onChange = e => {
    props.onChange(e.target.value);
  };

  const onSubmit = e => {
    props.onSubmit();
  };

  return (
    <div>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Write reply"
          value={props.value}
          name="reply"
          onChange={onChange}
          rows="3"
        />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={props.disable}
        className="btn btn-info"
      >
        Submit
      </button>
    </div>
  );
}

CreateReply.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
