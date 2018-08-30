// Higher Order Component
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import styles from './TravelForm.css';
import { addTravelRequest } from '../../TravelActions';


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
          type="string"
          name="from"
          onBlur={handleBlur}
          placeholder="Desde donde viajas"
        />
      {touched.from && errors.from && <div className={styles.error}>{errors.from}</div>}
      </div>
      <div>
        <Field
          type="string"
          name="to"
          onBlur={handleBlur}
          placeholder="Hacia donde viajas"
        />
        {touched.to && errors.to && <div className={styles.error}>{errors.to}</div>}
      </div>
      <div>
        <Field
          type="date"
          name="date"
          onBlur={handleBlur}
          placeholder="Fecha en la que viajaras"
        />
        {touched.date && errors.date && <div className={styles.error}>{errors.date}</div>}
      </div>
      <div>
        <Field
          type="string"
          name="plate"
          onBlur={handleBlur}
          placeholder="Ingresa la placa de tu vehiculo"
        />
        {touched.plate && errors.plate && <div className={styles.error}>{errors.plate}</div>}
      </div>
      <div>
        <Field
          type="number"
          name="price"
          onBlur={handleBlur}
          placeholder="Ingresa el costo por persona"
        />
        {touched.price && errors.price && <div className={styles.error}>{errors.price}</div>}
      </div>
      <div>
        <Field
          type="textarea"
          name="content"
          onBlur={handleBlur}
          placeholder="Ingresa aqui algun comentario adicional"
        />
        {touched.content && errors.content && <div className={styles.error}>{errors.content}</div>}
      </div>
      <div className={styles['submit-container']}>
        <button className={styles['submit-button']} disabled={isSubmitting} type="submit" disabled={isSubmitting}>
          Postular tu viaje!
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
  mapPropsToValues({ from, to, date, plate, price, content }) {
    return {
      from: from || '',
      to: to || '',
      date: date || '',
      plate: plate || '',
      price: price || '',
      content: content || '',
    };
  },
  validationSchema: Yup.object().shape({
    from: Yup.string().required('Debes ingresar una ciudad de origen'),
    to: Yup.string().required('Debes ingresar una ciudad de destino'),
    date: Yup.date().required('Debes ingresar la fecha de tu viaje'),
    plate: Yup.string().max(6, 'Debe ser la placa de tu vehiculo').required('Debes ingresar la placa de tu vehiculo'),
    price: Yup.number().required('Debes ingresar el valor por persona'),
    content: Yup.string(),
  }),
  handleSubmit(values, { resetForm, props, setSubmitting }) {
    console.log('VALUES 1', values);
    console.log('PROPS', props);
    props.dispatch(addTravelRequest(values));
    // setSubmitting(false);
    // resetForm();
  },
})(MyForm);

function mapStateToProps(store) {
  console.log(store)
  return {
    store,
  };
}

const TravelForm = connect(mapStateToProps)(EnhancedForm);

export default TravelForm;
