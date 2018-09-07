// Higher Order Component
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import styles from './LoginForm.css';
import { validateUser } from '../../../AuthActions';

const MyForm = ({
    errors,
    touched,
    handleBlur,
    isSubmitting,
  }) => (
    (<Form className={styles['form-container']}>
      <div>
        <Field
          className={styles.input}
          type="number"
          name="cellphone"
          onBlur={handleBlur}
          placeholder="Numero Celular"
        />
      {touched.cellphone && errors.cellphone && <div className={styles.error}>{errors.cellphone}</div>}
      </div>
      <div>
        <Field
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Contraseña"
        />
        {touched.password && errors.password && <div className={styles.error}>{errors.password}</div>}
      </div>
      <div className={styles['submit-container']}>
        <button className={styles['submit-button']} disabled={isSubmitting} type="submit" disabled={isSubmitting}>
          Ingresar!
        </button>
      </div>
    </Form>)
  );

MyForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

const EnhancedForm = withFormik({
  mapPropsToValues({ cellphone, password }) {
    return {
      cellphone: cellphone || '',
      password: password || '',
    };
  },
  validationSchema: Yup.object().shape({
    cellphone: Yup.string().min(10, 'Favor ingresa los 10 digitos de tu celular').required('Es necesario tu celular'),
    password: Yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres').required('Tu contraseña es necesaria para continuar'),
  }),
  handleSubmit(values, { resetForm, props, setSubmitting }) {
    console.log('VALUES 1', values)
    props.dispatch(validateUser(values));
    setSubmitting(false);
    resetForm();
  },
})(MyForm);

const LoginForm = connect()(EnhancedForm);

export default LoginForm;
