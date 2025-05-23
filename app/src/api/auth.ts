


export async function getUser() {
  
  const authToken = localStorage.getItem("userToken")

  if (authToken) {

    const user = JSON.parse(atob(authToken.split('.')[1]));

    return [200, { user }] as const;
  }

  return [401, { authToken: null, user: null }] as const;
}


export async function login(email: string, password: string) {

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3040";
  console.log("API_URL :", import.meta.env.VITE_API_URL);
  

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: email, password }),
  });

  const data = await response.json();
  console.log(data)
  if (!response.ok) throw new Error(data.error || "Erreur inconnue");

  return [response.status, data] as const;
}


