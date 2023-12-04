import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Text,Label,button } from 'react-native';
// Handling form validation 
const userSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().min(7, 'Password is too short').required('Password is required'),
});

const Singup = () => {
  const initialValues = { name: '', email: '', password: '' };
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
  };
return (
    <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Label htmlFor="name"><Text>Name</Text></Label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" />

          <Label htmlFor="email"><Text>Email</Text></Label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" />

          <Label htmlFor="password"><Text>Password</Text></Label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" />

          <button type="submit" disabled={isSubmitting}><Text>Submit</Text></button>
        </Form>
      )}
    </Formik>
  );
}
export default Singup;