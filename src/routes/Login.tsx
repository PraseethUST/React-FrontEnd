import { ChangeEvent, useState, FormEvent } from 'react';
import LoginImg from '../Assets/login.jpeg';
import { useDispatch } from 'react-redux';
import { login } from '~/actions';
import Alert from 'react-bootstrap/Alert';
import Style from '../Style/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '~/components/Header';

export let token: string;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    securityQuestion: '',
    securityAnswer: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [formState, setFormState] = useState({
    message: '',
    variant: '',
    show: false,
  });
  const [view, setView] = useState('login');
  const [step, setStep] = useState(1);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (view === 'login') {
        let response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        response = await response.json();
        if (response.success) {
          token = response.token;
          setFormState({ ...formState, variant: 'success', message: "Login Successful", show: true });
          setTimeout(() => {
            const { id, roleId } = response.user;
            dispatch(login({ id, roleId }));
            navigate(roleId === 1 ? '/dashboard' : '/');
          }, 1000);
        } else {
          throw new Error(response.msg);
        }
      } else if (view === 'forgotPassword') {
        if (step === 1) {
          let response = await fetch('http://localhost:5000/api/users/verify-security', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              securityQuestion: formData.securityQuestion,
              securityAnswer: formData.securityAnswer,
            }),
          });
          response = await response.json();
          if (response.success) {
            setStep(2);
          } else {
            throw new Error(response.msg);
          }
        } else if (step === 2) {
          if (formData.newPassword !== formData.confirmNewPassword) {
            throw new Error("Passwords do not match");
          }
          let response = await fetch('http://localhost:5000/api/users/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              newPassword: formData.newPassword,
            }),
          });
          response = await response.json();
          if (response.success) {
            setFormState({ ...formState, variant: 'success', message: "Password reset successful", show: true });
            setTimeout(() => {
              setView('login');
              setStep(1);
            }, 1000);
          } else {
            throw new Error(response.msg);
          }
        }
      }
    } catch (err) {
      setFormState({ ...formState, variant: 'danger', message: err.message, show: true });
    }
  };

  return (
    <>
      <Header />
      <section className={Style['LoginSection']}>
        <div className={Style["Boxcontainer"]}>
          <div className={`${Style['user']} ${Style['signinBx']}`}>
            <div className={Style["imgBx"]}>
              <img src={LoginImg} alt="Login" />
            </div>
            <div className={Style["formBx"]}>
              <form onSubmit={handleSubmit}>
                {view === 'login' && (
                  <>
                    <h2>Sign In</h2>
                    {formState.show && <Alert variant={formState.variant}>{formState.message}</Alert>}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <input type="submit" value="Login" />
                    <p className={Style["signup"]}>
                      Don't have an account? <Link to="/Register">Sign Up.</Link>
                    </p>
                    <p className={Style["forgotPassword"]}>
                      <span onClick={() => setView('forgotPassword')} className={Style["forgotPassword"]}>Forgot Password?</span>
                    </p>
                  </>
                )}
                {view === 'forgotPassword' && (
                  <>
                    <h2>Forgot Password</h2>
                    {formState.show && <Alert variant={formState.variant}>{formState.message}</Alert>}
                    {step === 1 && (
                      <>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <select name="securityQuestion" value={formData.securityQuestion} onChange={handleChange} required>
                          <option value="">Select Security Question</option>
                          <option value="q1">What is your mother's maiden name?</option>
                          <option value="q2">What is your first pet's name?</option>
                          <option value="q3">What was the name of your first school?</option>
                        </select>
                        <input type="text" name="securityAnswer" placeholder="Security Answer" value={formData.securityAnswer} onChange={handleChange} required />
                        <input type="submit" value="Verify" />
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <input type="password" name="newPassword" placeholder="Enter New Password" value={formData.newPassword} onChange={handleChange} required />
                        <input type="password" name="confirmNewPassword" placeholder="Re-enter New Password" value={formData.confirmNewPassword} onChange={handleChange} required />
                        <input type="submit" value="Reset Password" />
                      </>
                    )}
                    <p className={Style["signup"]}>
                      Remembered your password? <span onClick={() => setView('login')} className={Style["forgotPassword"]}>Login.</span>
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
