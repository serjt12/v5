// Higher Order Component
import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import Map from '../../../../components/Map/MapContainer';
import PropTypes from 'prop-types';
import styles from './TravelForm.css';
import { addTravelRequest } from '../../TravelActions';
import { toggleAddTravel } from '../../../App/AppActions';
import Options from './Options';
const MyForm = ({
    errors,
    touched,
    handleBlur,
    isSubmitting,
    values,
    handleChange,
  }) => (
    (<Form className={styles['form-container']}>
      <div className={styles.space} />
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
      <div className={styles.mapContainer}>
        <Map />
      </div>
      <div>
        <Field
          type="datetime-local"
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
      <div className={styles.select}>
        <select
          name="traveltype"
          value={values.traveltype}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" label="Selecciona tu tipo de viaje" />
          <option value="local" label="Local" />
          <option value="nacional" label="Nacional" />
        </select>
        <div className={styles.select_arrow} />
        {touched.traveltype && errors.traveltype && <div className={styles.error}>{errors.traveltype}</div>}
      </div>
      <div className={styles.select}>
        <select
          name="sits"
          value={values.cupos}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" label="Cuantos cupos tienes disponibles" />
          <option value="1" label="1" />
          <option value="2" label="2" />
          <option value="3" label="3" />
          <option value="4" label="4" />
        </select>
        <div className={styles.select_arrow} />
        {touched.sits && errors.sits && <div className={styles.error}>{errors.sits}</div>}
      </div>
      <Options />
      <div className={styles['submit-container']}>
        <button className={styles['submit-button']} disabled={isSubmitting} type="submit" disabled={isSubmitting}>
          POSTULAR TU VIAJE!
        </button>
      </div>
    </Form>)
  );

MyForm.propTypes = {
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleBlur: PropTypes.func,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.fun,
};

const EnhancedForm = withFormik({
  mapPropsToValues({ from, to, date, plate, price, content, traveltype, sits }) {
    return {
      from: from || '',
      to: to || '',
      date: date || '',
      plate: plate || '',
      price: price || '',
      content: content || '',
      traveltype: traveltype || '',
      sits: sits || '',
    };
  },
  validationSchema: Yup.object().shape({
    from: Yup.string().required('Debes ingresar una ciudad de origen'),
    to: Yup.string().required('Debes ingresar una ciudad de destino'),
    date: Yup.date().min(Date(Date.now()), 'Minimo 12 horas de anterioridad').required('Ingresar la fecha y hora de tu viaje'),
    plate: Yup.string().max(6, 'Debe ser la placa de tu vehiculo').required('Debes ingresar la placa de tu vehiculo'),
    price: Yup.number().required('Debes ingresar el valor por persona'),
    content: Yup.string(),
    traveltype: Yup.string().required('Es necesario que selecciones tu tipo de viaje'),
    sits: Yup.number().max(4, 'Maximo 4 cupos').required('Es necesario que ingreses los cupos disponibles'),
  }),
  handleSubmit(values, { resetForm, props, setSubmitting }) {
    props.dispatch(toggleAddTravel());
    props.dispatch(addTravelRequest(values));
    setSubmitting(false);
    resetForm();
  },
})(MyForm);

function mapStateToProps(store) {
  // console.log(store)
  return {
    store,
  };
}

const TravelForm = connect(mapStateToProps)(EnhancedForm);

export default TravelForm;
