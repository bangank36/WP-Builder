/**
 * External dependencies
 */
import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Internal dependencies
 */
import './style.scss';
import FormComponent from './FormComponent';

/**
 * Default settings for the WP Builder component
 */
const defaultSettings = {
  showPreview: true,
  theme: {
    primaryColor: '#0085ba',
    secondaryColor: '#0073a1',
  },
};

/**
 * Attach WP Builder Form to a container element
 *
 * @param {HTMLElement} container Container element
 * @param {Object} options Configuration options
 * @param {Object} options.schema Custom JSON schema
 * @param {Object} options.uiSchema Custom UI schema
 * @param {Object} options.data Initial form data
 * @param {boolean} options.showPreview Whether to show the JSON preview
 * @param {Function} options.onChange Callback when form data changes
 */
function attachForm(container, options = {}) {
  if (!container || !(container instanceof HTMLElement)) {
    console.error('WP Builder Form requires a valid container element');
    return null;
  }

  // Add the root class to the container
  container.classList.add('wp-builder-root');

  // Extract options
  const {
    schema,
    uiSchema,
    data,
    showPreview = defaultSettings.showPreview,
    onChange
  } = options;

  // Create React root
  const root = createRoot(container);

  // Render the component
  root.render(
    <FormComponent
      customSchema={schema}
      customUiSchema={uiSchema}
      customData={data}
      showPreview={showPreview}
      onChange={onChange}
    />
  );

  // Return a function to detach
  return function detach() {
    root.unmount();
  };
}

/**
 * Attach WP Builder to a form element
 *
 * @param {HTMLFormElement} form Form element
 * @param {Object} options Configuration options
 */
function attachToForm(form, options = {}) {
  if (!form || form.tagName.toLowerCase() !== 'form') {
    console.error('WP Builder requires a valid form element');
    return null;
  }

  // Create a container inside the form
  const container = document.createElement('div');
  container.classList.add('wp-builder-form-container');

  // Add the container to the form
  form.appendChild(container);

  // Create a hidden input to store the form data
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = options.inputName || 'wp-builder-data';
  form.appendChild(hiddenInput);

  // Attach the form with onChange handler to update the hidden input
  return attachForm(container, {
    ...options,
    onChange: (data) => {
      hiddenInput.value = JSON.stringify(data);
      if (options.onChange) {
        options.onChange(data);
      }
    }
  });
}

// Add to window object for global access
try {
  window.wpBuilder = {
    attachForm,
    attachToForm
  };
  console.log('wpBuilder object initialized successfully');
} catch (error) {
  console.error('Failed to initialize wpBuilder object:', error);
}

// Export for module usage
export { attachForm, attachToForm };
