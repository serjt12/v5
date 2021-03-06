// Higher Order Component
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import Logo from './images/logo.png';
import { addUserUpdateRequest } from '../../../Home/AuthActions';
import styles from './profilemain.css';
const MyForm = ({
    errors,
    touched,
    isSubmitting,
    handleBlur,
    props,
  }) => (
    (
  <div className={styles.wholeC}>
    <img className={styles.logoform} src={Logo} alt="Tobcity Divide Tus gastos" />

    <Form className={styles['form-container']}>
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
        <button type="button" onClick={props.router.goBack} className={styles.btnfinal}>CANCELAR</button>
        <button className={styles.btnfinal} disabled={isSubmitting} type="submit" disabled={isSubmitting}>
          FINALIZAR
        </button>
      </div>
    </Form>
  </div>
)
    );

MyForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  isSubmitting: PropTypes.bool,
  props: PropTypes.object,
  cellphone: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  router: PropTypes.object,
};
const EnhancedForm = withFormik({
  mapPropsToValues({ email, username, city }) {
    return {
      email,
      username,
      city,
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Queremos saber tu nombre'),
    city: Yup.string().required('Es necesario que ingreses tu ciudad'),
  }),
  handleSubmit(values, { props, resetForm, setSubmitting }) {
    const userID = props.store.auth.currentUser._id;
    props.dispatch(addUserUpdateRequest(values, userID));
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
