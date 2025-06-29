import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateForm() {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (form.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (form.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    //  Axios throws an error automatically when it receives a non-2xx status.
    try {
      const res = await axios.post("http://localhost:3000/login", form);
      if (res.status == 200) {
        const generatedToken = res?.data?.accessToken;
        localStorage.setItem("token", generatedToken);
        loginUser(res?.data?.activeUser);
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data?.message) {
        setErrors((prev) => ({ ...prev, password: err.response.data?.message }));
      } else {
        console.log("login error, internal error", err);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded bg-white mt-10">
      <h2 className="text-2xl font-bold text-purple-800 mb-12 text-center">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <input type="submit" value="Log In" className="w-full bg-red-500 text-white py-2 rounded cursor-pointer hover:bg-red-600" />

        <div className="flex justify-between text-sm mt-2">
          <Link className="hover:text-blue-500" to="#">
            Forgot password
          </Link>
          <Link className="hover:text-blue-500" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
