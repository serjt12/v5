// Higher Order Component
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { addUserUpdateRequest, sendUserCodeRequest } from '../../../Home/AuthActions';
import styles from './profilemain.css';

const MyForm = ({
    errors,
    touched,
    handleBlur,
    isSubmitting,
    props,
  }) => (
    (
  <Form className={styles['form-container']}>

    <div>
      <Field
        className={styles.input}
        type="email"
        name="email"
        onBlur={handleBlur}
        placeholder="Introduce tu email"
      />
    {touched.email && errors.email && <div className={styles.error}>{errors.email}</div>}
    </div>
    <div>
      <Field
        type="number"
        name="cellphone"
        onBlur={handleBlur}
        placeholder="Numero de celular"
      />
      {touched.cellphone && errors.cellphone && <div className={styles.error}>{errors.cellphone}</div>}
    </div>
    <div>
      <Field
        type="text"
        name="username"
        onBlur={handleBlur}
        placeholder="Como quieres que te llamemos"
      />
      {touched.username && errors.username && <div className={styles.error}>{errors.username}</div>}
    </div>
    <div>
      <Field
        type="text"
        name="city"
        onBlur={handleBlur}
        placeholder="Cual es tu ciudad de origen"
      />
      {touched.city && errors.city && <div className={styles.error}>{errors.city}</div>}
    </div>
    <div className={styles.btnfinalcontainer}>
      <button className={styles.btnfinal} disabled={isSubmitting} type="submit" disabled={isSubmitting}>
        FINALIZAR
      </button>
      <button type="button" onClick={props.router.goBack} className={styles.btnfinal}>CANCELAR</button>
    </div>
  </Form>)
    );

MyForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  isSubmitting: PropTypes.bool,
  props: PropTypes.object,
  router: PropTypes.object,
};
const EnhancedForm = withFormik({
  mapPropsToValues({ email, cellphone, username, city }) {
    return {
      email,
      cellphone: cellphone || '',
      username,
      city,
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required('Es necesario tu email'),
    cellphone: Yup.string().max(10, 'Verifica tu numero celular').min(10, 'Verifica tu numero celular')
    .required('Tu numero celular es necesario para continuar'),
    username: Yup.string().required('Queremos saber tu nombre'),
    city: Yup.string().required('Es necesario que ingreses tu ciudad'),
  }),
  handleSubmit(values, { props, resetForm, setSubmitting }) {
    const userID = props.store.auth.currentUser._id;
    props.dispatch(addUserUpdateRequest(values, userID));
    props.dispatch(sendUserCodeRequest(values.cellphone));
    setSubmitting(false);
    resetForm();
    props.router.push('/profile');
  },
})(MyForm);

function mapStateToProps(store, props) {
  return {
    email: (store.auth.currentUser) ? store.auth.currentUser.email : '',
    cellphone: (store.auth.currentUser) ? store.auth.currentUser.cellphone : '',
    username: (store.auth.currentUser) ? store.auth.currentUser.name : '',
    city: (store.auth.currentUser) ? store.auth.currentUser.city : '',
    props,
    store,
  };
}


const EditForm = connect(mapStateToProps)(EnhancedForm);

export default EditForm;
