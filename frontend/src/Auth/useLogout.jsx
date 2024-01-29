const useLogout = () => {
  const logOut = () => {
    localStorage.removeItem("accessToken");
  };
  return logOut;
};

export default useLogout;
