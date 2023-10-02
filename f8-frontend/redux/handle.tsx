const handleError = (error:any, thunkAPI:any) => {
    const message = 
    (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }

const functions = {
    handleError,
}
  
export default functions;