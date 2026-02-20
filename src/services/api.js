// Import axios for making HTTP requests
import axios from "axios";

// Base API URL provided in assignment
const API_URL = "/backend_dev/gettabledata.php";

/**
 * Function to fetch employee data
 * Makes a POST request with required credentials
 */
export const fetchEmployeeData = async () => {
  try {
    const response = await axios.post(API_URL, {
      username: "test",
      password: "123456",
    });

    // Return API response data
    return response.data;
  } catch (error) {
    // Throw error if API fails
    throw error;
  }
};