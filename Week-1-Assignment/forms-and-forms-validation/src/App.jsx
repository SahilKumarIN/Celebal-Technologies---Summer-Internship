import { useState } from "react";
import "./App.css";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "San Francisco", "Chicago"],
  UK: ["London", "Manchester", "Liverpool"],
};

function validate(details) {
  const errors = {};
  if (!details.firstName.trim()) errors.firstName = "First Name is required";
  if (!details.lastName.trim()) errors.lastName = "Last Name is required";
  if (!details.username.trim()) errors.username = "Username is required";
  if (!details.email.trim()) errors.email = "Email is required";
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(details.email))
    errors.email = "Invalid email";
  if (!details.password) errors.password = "Password is required";
  else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(details.password))
    errors.password =
      "Password must be at least 8 characters and should contain at least one letter and one number";
  if (!details.phoneNo.trim()) errors.phoneNo = "Phone No. is required";
  else if (!/^\+\d{1,4}\s\d{6,12}$/.test(details.phoneNo))
    errors.phoneNo = "Format: +CountryCode Number";
  if (!details.country) errors.country = "Country is required";
  if (!details.city) errors.city = "City is required";
  if (!details.panNumber.trim()) errors.panNumber = "PAN No. is required";
  else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(details.panNumber))
    errors.panNumber = "Invalid PAN format";
  if (!details.aadharNumber.trim())
    errors.aadharNumber = "Aadhar No. is required";
  else if (!/^\d{12}$/.test(details.aadharNumber))
    errors.aadharNumber = "Aadhar must be 12 digits";
  return errors;
}

function App() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    phoneNo: "",
    country: "",
    city: "",
    panNumber: "",
    aadharNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const changeUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors(validate({ ...userDetails, [name]: value }));
  };

  const handleCountryChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      country: e.target.value,
      city: "",
    }));
    setTouched((prev) => ({
      ...prev,
      country: true,
      city: false,
    }));
    setErrors(validate({ ...userDetails, country: e.target.value, city: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors(validate(userDetails));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      phoneNo: true,
      country: true,
      city: true,
      panNumber: true,
      aadharNumber: true,
    });
    const validation = validate(userDetails);
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setSubmitted(true);
    }
  };

  const currentErrors = validate(userDetails);

  if (submitted) {
    return (
      <div>
        <h2>Submitted Details</h2>
        <ul>
          <li>First Name: {userDetails.firstName}</li>
          <li>Last Name: {userDetails.lastName}</li>
          <li>Username: {userDetails.username}</li>
          <li>Email: {userDetails.email}</li>
          <li>Phone No.: {userDetails.phoneNo}</li>
          <li>Country: {userDetails.country}</li>
          <li>City: {userDetails.city}</li>
          <li>PAN No.: {userDetails.panNumber}</li>
          <li>Aadhar No.: {userDetails.aadharNumber}</li>
        </ul>
        <button onClick={() => setSubmitted(false)}>Back to Form</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Forms & Forms Validation</h1>
      <p>Assignment - Week 1 - Celebal Summer Internship</p>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>First Name</legend>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your First Name"
            value={userDetails.firstName}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          {touched.firstName && currentErrors.firstName && (
            <span className="error">{currentErrors.firstName}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>Last Name</legend>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your Last Name"
            value={userDetails.lastName}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          {touched.lastName && currentErrors.lastName && (
            <span className="error">{currentErrors.lastName}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>Username</legend>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={userDetails.username}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          {touched.username && currentErrors.username && (
            <span className="error">{currentErrors.username}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>E-mail</legend>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          {touched.email && currentErrors.email && (
            <span className="error">{currentErrors.email}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>Password</legend>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={userDetails.password}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{ marginLeft: 8 }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {touched.password && currentErrors.password && (
            <span className="error">{currentErrors.password}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>Phone No.</legend>
          <input
            type="text"
            name="phoneNo"
            placeholder="+91 9876543210"
            value={userDetails.phoneNo}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          {touched.phoneNo && currentErrors.phoneNo && (
            <span className="error">{currentErrors.phoneNo}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>Country</legend>
          <select
            name="country"
            value={userDetails.country}
            onChange={handleCountryChange}
            onBlur={handleBlur}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {touched.country && currentErrors.country && (
            <span className="error">{currentErrors.country}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>City</legend>
          <select
            name="city"
            value={userDetails.city}
            onChange={changeUserDetails}
            onBlur={handleBlur}
            disabled={!userDetails.country}
          >
            <option value="">Select City</option>
            {userDetails.country &&
              countries[userDetails.country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {touched.city && currentErrors.city && (
            <span className="error">{currentErrors.city}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>PAN No.</legend>
          <input
            type="text"
            name="panNumber"
            placeholder="ABCDE1234F"
            value={userDetails.panNumber}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          {touched.panNumber && currentErrors.panNumber && (
            <span className="error">{currentErrors.panNumber}</span>
          )}
        </fieldset>
        <fieldset>
          <legend>Aadhar No.</legend>
          <input
            type="text"
            name="aadharNumber"
            placeholder="123412341234"
            value={userDetails.aadharNumber}
            onChange={changeUserDetails}
            onBlur={handleBlur}
          />
          {touched.aadharNumber && currentErrors.aadharNumber && (
            <span className="error">{currentErrors.aadharNumber}</span>
          )}
        </fieldset>
        <button type="submit" disabled={Object.keys(currentErrors).length > 0}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
