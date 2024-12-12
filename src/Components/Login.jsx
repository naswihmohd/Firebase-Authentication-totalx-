import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from '../firebase/config'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { add } from '../features/confirmationSlice';
import { useNavigate } from 'react-router-dom';


function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const initializeRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: 'invisible',
        callback: (response) => {
          console.log('Captcha verified', response);
        },
        'expired-callback': () => {
          console.error('Captcha expired');
        },
      },)
    }
  };

  const handleSubmit = async ({ phoneNumber }) => {

    try {
      await initializeRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const fullPhoneNumber = `+91${phoneNumber}`;

      signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier).then((confirmation) => {
        console.log("OTP sent successfully" + confirmation);
        dispatch(add(confirmation))
        navigate('/verify')
      })

    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };




  return (

    //  --------------login section---------------

    <div className="m-auto p-10 min-h-screen">
      <div className='grid md:grid-cols-2'>
        <div className='px-10 py-4 '>
          <img className='w-14' src="icon.png" alt="" />
          <h1 className='font-bold pt-16 font-sans text-2xl'>Login</h1>
          <p className='font-sans text-slate-600 pt-2 pb-6 text-sm'>Login to access your travelwise account</p>
          <Formik
            initialValues={{ phoneNumber: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form action="">
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text absolute mt-3 ms-4 px-2 bg-white">Enter mobile number</span>
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="input input-bordered border-black"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className='py-3' id='recaptcha-container'></div>
                <button disabled={isSubmitting} type='submit' className='btn bg-blue-700 w-full text-white hover:bg-blue-900' >Get OTP</button>
              </Form>
            )}
          </Formik>
          <p className='text-center font-sans text-sm pt-3'>Dont have an account? <span className='text-error hover:link'>SignUp</span></p>
        </div>


        {/* --------------image section------------  */}

        <div className='flex justify-center'>
          <div className="carousel rounded-box w-96">
            <div className="carousel-item w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                className="w-full"
                alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                className="w-full"
                alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                className="w-full"
                alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                className="w-full"
                alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                className="w-full"
                alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                className="w-full"
                alt="Tailwind CSS Carousel component" />
            </div>
            <div className="carousel-item w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                className="w-full"
                alt="Tailwind CSS Carousel component" />
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}

export default Login
