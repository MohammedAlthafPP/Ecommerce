import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERRORS,
  VERIFY_PHONE_REQUEST,
  VERIFY_PHONE_SUCCESS,
  VERIFY_PHONE_FAIL,
  RESEND_PHONE_OTP_REQUEST,
  RESEND_PHONE_OTP_SUCCESS,
  RESEND_PHONE_OTP_FAIL,
} from "../../constants/userConstants";
import axios from "../../axios";

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/login`, { email, password }, config);
    if (data&&data.user) {
      await localStorage.setItem("Udetails", JSON.stringify(data.user));
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/register`, userData, { config });

    if (data&&data.user) {
      await localStorage.setItem("Udetails", JSON.stringify(data.user));
    }

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/me`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await localStorage.removeItem("Udetails");
    await axios.get(`/logout`);

    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/me/update`, userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
      // payload: error.response.data,
    });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/password/update`, passwords, config);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
      // payload: error.response.data,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/password/forgot`, email, config);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
      // payload: error.response.data,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/password/reset/${token}`,
      passwords,
      config
    );
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
      //payload: error.response.data,
    });
  }
};

// Get All Users --Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const { data } = await axios.get(`/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data });
  }
};

// Get User Details --Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/admin/user/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data });
  }
};

// Update User --Admin
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/admin/user/${id}`, userData, config);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
    });
  }
};

// Delete User --Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/admin/user/${id}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
    });
  }
};

// verify User Phone Number
export const verifyPhone = (otp) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_PHONE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/verify/phone`, otp, config);
    dispatch({ type: VERIFY_PHONE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VERIFY_PHONE_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
      // payload: error.response.data,
    });
  }
};

// Resend Phone OTP
export const resendPhoneOTP = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESEND_PHONE_OTP_REQUEST });

    const { data } = await axios.get(`/resendotp/${id}`);
    dispatch({ type: RESEND_PHONE_OTP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESEND_PHONE_OTP_FAIL,
      payload:
        ((error || {}).response || {}).data ||
        "something went wrong please try again",
      // payload: error.response.data,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
