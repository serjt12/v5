// Higher Order Component
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { sendUserCodeConfirm } from '../../../Home/AuthActions';
import styles from './profilemain.css';
const MyForm = ({
    errors,
    touched,
    isSubmitting,
    handleBlur,
  }) => (
    (
  <Form className={styles['confirm-container']}>
    <div>
      <Field
        type="text"
        name="confirm"
        onBlur={handleBlur}
        placeholder="Codigo enviado a tu celular"
      />
      {touched.confirm && errors.confirm && <div className={styles.errorconfirm}>{errors.confirm}</div>}
    </div>
    <div className={styles.btnfinalcontainer}>
      <button className={styles.btnconfirm} disabled={isSubmitting} type="submit" disabled={isSubmitting}>
        Verificar
      </button>
    </div>
  </Form>
)
    );

MyForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  isSubmitting: PropTypes.bool,
};
const EnhancedForm = withFormik({
  mapPropsToValues({ confirm }) {
    return {
      confirm: confirm || '',
    };
  },
  validationSchema: Yup.object().shape({
    confirm: Yup.string().max(4, 'Verifica tu codigo').min(4, 'Verifica tu codigo')
    .required('Es necesario que ingreses el codigo para confirmar tu numero celular'),
  }),
  handleSubmit(values, { props, resetForm, setSubmitting }) {
    console.log(props)
    const userID = props.store.auth.currentUser._id;
    props.dispatch(sendUserCodeConfirm(values.confirm, userID));
    setSubmitting(false);
    resetForm();
  },
})(MyForm);

function mapStateToProps(store, props) {
  return {
    props,
    store,
  };
}


const ConfirmForm = connect(mapStateToProps)(EnhancedForm);

export default ConfirmForm;
