// Higher Order Component
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { addUserUpdateRequest } from '../../../Home/AuthActions';
import ImagesUploader from 'react-images-uploader';
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
      <ImagesUploader
        url="http://localhost:8000/upload_image"
        optimisticPreviews
        multiple={false}
        onLoadEnd={(err) => {
          if (err) {
            console.error(err);
          }
        }}
        label="Actualiza tu imagen"
      />
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
};
const EnhancedForm = withFormik({
  mapPropsToValues({ email, cellphone, username, city }) {
    return {
      email: email || '',
      cellphone: cellphone || '',
      username: username || '',
      city: city || '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required('Es necesario tu email'),
    cellphone: Yup.number().min(10, 'Verifica tu numero celular').required('Tu numero celular es necesario para continuar'),
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
    props,
    store,
  };
}


const EditForm = connect(mapStateToProps)(EnhancedForm);

export default EditForm;
