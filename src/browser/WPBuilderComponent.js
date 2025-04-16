/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * WP Builder Component
 *
 * A standalone component that can be used in any website.
 *
 * @param {Object} props Component props
 * @param {Object} props.settings Settings for the component
 * @param {Function} props.onSave Callback when content is saved
 */
function WPBuilderComponent({ settings = {}, onSave }) {
  return (
    <div className="wp-builder-container">
      <div className="wp-builder-header">
        <h2>WP Builder</h2>
      </div>

      <div className="wp-builder-content">
        <textarea
          defaultValue=""
          placeholder="Enter your content here..."
          rows={10}
          className="wp-builder-textarea"
          onChange={(e) => {
            if (onSave) {
              onSave(e.target.value);
            }
          }}
        />
      </div>

      <div className="wp-builder-footer">
        <button className="wp-builder-save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default WPBuilderComponent;
