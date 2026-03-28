const loginRequestExample = `
async function login(email, password) {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
}
`;

const fetchScholarshipsExample = `
async function fetchScholarships() {
  const response = await fetch("http://localhost:5000/api/scholarships");
  return response.json();
}
`;

const applyForScholarshipExample = `
async function applyForScholarship(userId, scholarshipId, statement) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/applications/apply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`
    },
    body: JSON.stringify({ userId, scholarshipId, statement })
  });

  return response.json();
}
`;

module.exports = {
  loginRequestExample,
  fetchScholarshipsExample,
  applyForScholarshipExample
};
