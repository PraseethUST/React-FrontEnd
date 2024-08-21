import { useState, ChangeEvent, FormEvent } from 'react';
import signupImage from '../Assets/signup.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import style from '../Style/Login.module.css';

const Register = () => {
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    dob: '',
    securityQuestion: '',
    securityAnswer: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({ show: true, message: 'Registration successful' });
        console.log('Registration successful');
        navigate("/Login");
      } else {
        setAlert({ show: true, message: result.msg });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlert({ show: true, message: 'An error occurred. Please try again later.' });
    }
  };

  return (
    <section className={style['LoginSection']}>
      {alert.show && (
        <div className={style['alert-msg']}>
          <Alert variant={alert.message === 'Registration successful' ? 'success' : 'danger'} onClose={() => setAlert({ show: false, message: '' })} dismissible>
            <Alert.Heading>{alert.message === 'Registration successful' ? 'Success!' : 'Error!'}</Alert.Heading>
            <p>{alert.message}</p>
          </Alert>
        </div>
      )}
      <div className={style["Boxcontainer"]}>
        <div className={`${style["user"]} ${style["signupBx"]}`}>
          <div className={style["formBx"]}>
            <form onSubmit={handleSubmit}>
              <h2>Create an account</h2>
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required />
              <input type="tel" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} required />
              <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />

              {/* Security Questions */}
              <select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} required>
                <option value="">Select Security Question</option>
                <option value="q1">What is your mother's maiden name?</option>
                <option value="q2">What is your first pet's name?</option>
                <option value="q3">What was the name of your first school?</option>
              </select>
              <input type="text" name="securityAnswer" placeholder="Security Answer" value={formData.securityAnswer} onChange={handleChange} required />

              <input type="submit" value="Sign Up" />
              <p className={style["signup"]}>
                Already have an account? <Link to="/Login">Sign in.</Link>
              </p>
            </form>
          </div>
          <div className={style["imgBx"]}>
            <img src={signupImage} alt="Signup" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
