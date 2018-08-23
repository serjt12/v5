// Higher Order Component
import React from 'react';
import { withFormik } from 'formik';

const Form = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  (<form onSubmit={handleSubmit}>
    <input
      type="email"
      name="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
    />
    {touched.email && errors.email && <div>{errors.email}</div>}
    <input
      type="password"
      name="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
    />
    {touched.password && errors.password && <div>{errors.password}</div>}
    <button type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </form>)
)

const Formik = withFormik({
  mapPropsToValues() {
    return {
      email: 'testttttt'
    }
  }
})(Form)

export default Formik;
