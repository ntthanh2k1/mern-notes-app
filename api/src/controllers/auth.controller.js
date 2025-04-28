const register = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: `Error register method: ${error.message}.` });
  }
}

const login = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: `Error login method: ${error.message}.` });
  }
};

const logout = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: `Error logout method: ${error.message}.` });
  }
};

export { register, login, logout };
