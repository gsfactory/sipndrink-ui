import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        {/* {label && 
          <label htmlFor={props.id || props.name}>{label}</label>
        } */}
        <input className="text-input form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error text-danger">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const MyInlineTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="row mb-3">
      <label 
        className="col-md-4 col-lg-3 col-form-label"
        htmlFor={props.id || props.name}>{label}</label>
      <div className="col-md-8 col-lg-9">
        <input className="form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error text-danger">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

const MyTextareaInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        {/* <label htmlFor={props.id || props.name}>{label}</label> */}
        <textarea className="text-input form-control" {...field} {...props} rows={2} />
        {meta.touched && meta.error ? (
          <div className="error text-danger">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const MyImageField = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
    <div className="form-group">
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input form-control" 
          type="file"
          {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error text-danger">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const MySelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        {/* <label htmlFor={props.id || props.name}>{label}</label> */}
        <select {...field} {...props} className="form-select"/>
        {meta.touched && meta.error ? (
          <div className="error text-danger">{meta.error}</div>
        ) : null}
      </div>
    );
  };

const MyInlineSelect = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <div className="row mb-3">
        <label 
          className="col-md-4 col-lg-3 col-form-label"
          htmlFor={props.id || props.name}>{label}</label>
        <div className="col-md-8 col-lg-9">
        <select {...field} {...props} className="form-select"/>
          {meta.touched && meta.error ? (
            <div className="error text-danger">{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

const MyCheckbox = ({ label, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div className="row mb-3">
        <label 
          className="col-md-4 col-lg-3 col-form-label"
          htmlFor={props.id || props.name}>{label}</label>

        <div className="col-md-8 col-lg-9">

        <input type="checkbox" {...field} {...props} className="form-check-input"/>

        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
      </div>
    );
  };

module.exports = {
    MyTextInput, 
    MySelect, 
    MyImageField, 
    MyTextareaInput,
    MyInlineTextInput,
    MyInlineSelect,
    MyCheckbox
};