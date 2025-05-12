import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      msg: ''
    },
    validate: values => {
      const errors = {};
      if (!values.fullName) errors.fullName = 'Please enter your name';
      if (!values.email) errors.email = 'Please enter your email';
      else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Invalid email address';
      if (!values.msg) errors.msg = 'Please enter a message';
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (!res.ok) throw new Error('Failed to send');

        setFormStatus('success');
        resetForm();
      } catch (err) {
        console.error('Error submitting contact form:', err);
        setFormStatus('error');
      }
    }
  });

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => setFormStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  return (
    <div className='container-fluid bg-black text-white py-5 px-5 mt-5' style={{ minHeight: "94vh" }}>
      <h1 className='text-center mb-4 text-warning'>Contact Me</h1>

      {formStatus === 'success' && (
        <div className="alert alert-success fade-in bg-success text-white border-0 shadow-sm rounded">
          ✅ Message sent successfully!
        </div>
      )}
      {formStatus === 'error' && (
        <div className="alert alert-danger fade-in bg-danger text-white border-0 shadow-sm rounded">
          ❌ Failed to send message. Try again.
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate className='p-4 bg-dark rounded shadow'>
        <div className='row'>
          <div className='col-md-4 mb-3'>
            <label htmlFor="fullName" className="form-label">Name</label>
            <input
              name="fullName"
              className={`form-control bg-secondary text-white border-warning ${formik.errors.fullName && formik.touched.fullName ? 'is-invalid' : ''}`}
              type="text"
              placeholder='Enter your full name'
              id='fullName'
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.fullName && formik.touched.fullName && (
              <div className='text-danger mt-1'>{formik.errors.fullName}</div>
            )}
          </div>

          <div className='col-md-8 mb-3'>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              name="email"
              className={`form-control bg-secondary text-white border-warning ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
              type="email"
              placeholder='Enter your email'
              id='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className='text-danger mt-1'>{formik.errors.email}</div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="msg" className="form-label">Message</label>
            <textarea
              name="msg"
              className={`form-control bg-secondary text-white border-warning ${formik.errors.msg && formik.touched.msg ? 'is-invalid' : ''}`}
              id="msg"
              rows="4"
              placeholder='Leave a message'
              value={formik.values.msg}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.errors.msg && formik.touched.msg && (
              <div className='text-danger mt-1'>{formik.errors.msg}</div>
            )}
          </div>
        </div>

        <button type='submit' className='btn btn-warning mt-2 px-4'>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
