export const fetchUsers = async () => {
  const response = await fetch("http://localhost:5000/users");
  const data = await response.json();
  return data;
};

export const validateUser = async (email, password) => {
  const users = await fetchUsers();
  return users.some(
    (user) => user.email === email && user.password === password
  );
};

export const registerUser = async (data) => {
  const users = await fetchUsers();
  if (users.some((user) => user.email === data.email)) {
    return { success: false, message: "email already exists" };
  }

  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return { success: true, message: "User registered successfully" };
  } else {
    return { success: false, message: "Failed to register user" };
  }
};
