// Higher Order Component
import React from 'react';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import styles from './LoginForm.css';

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
          Registrarse
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
function equalTo(ref: any, msg: any) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test(value: any) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);
const SignUpForm = withFormik({
  mapPropsToValues({ cellphone, password, confirmPassword }) {
    return {
      cellphone: cellphone || '',
      password: password || '',
      confirmPassword: confirmPassword || '',
    };
  },
  validationSchema: Yup.object().shape({
    cellphone: Yup.string().min(10, 'Favor ingresa los 10 digitos de tu celular').required('Es necesario tu celular'),
    password: Yup.string().min(6, 'La contraseña debe tener minimo 6 caracteres').required('Tu contraseña es necesaria para continuar'),
    confirmPassword: Yup.string().equalTo(Yup.ref('password'), 'Comprueba que tengas la misma contraseña').required('Required'),
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    console.log(values)
  },
})(MyForm);

export default SignUpForm;
