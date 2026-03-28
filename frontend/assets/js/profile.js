function getProfileElements() {
  return {
    form: document.getElementById("profile-form"),
    status: document.getElementById("profile-status"),
    fullName: document.getElementById("profile-full-name"),
    age: document.getElementById("profile-age"),
    gender: document.getElementById("profile-gender"),
    region: document.getElementById("profile-region"),
    category: document.getElementById("profile-category"),
    degree: document.getElementById("profile-degree"),
    specialisation: document.getElementById("profile-specialisation"),
    gpa: document.getElementById("profile-gpa"),
    currentYear: document.getElementById("profile-current-year"),
    incomeRange: document.getElementById("profile-income-range"),
    skills: document.getElementById("profile-skills"),
    interests: document.getElementById("profile-interests"),
    saveButton: document.getElementById("profile-save-btn"),
    resetButton: document.getElementById("profile-reset-btn")
  };
}

function setProfileStatus(message, kind = "info") {
  const { status } = getProfileElements();
  if (!status) {
    return;
  }

  status.className = `alert alert-${kind}`;
  status.textContent = message;
  status.style.display = "block";
}

function populateProfileForm(profile) {
  const fields = getProfileElements();

  if (fields.fullName) {
    fields.fullName.value = profile.fullName || "";
  }
  if (fields.age) {
    fields.age.value = profile.age ?? "";
  }
  if (fields.gender) {
    fields.gender.value = profile.gender || "Male";
  }
  if (fields.region) {
    fields.region.value = profile.region || "";
  }
  if (fields.category) {
    fields.category.value = profile.category || "General";
  }
  if (fields.degree) {
    fields.degree.value = profile.degree || "B.Tech";
  }
  if (fields.specialisation) {
    fields.specialisation.value = profile.specialisation || "";
  }
  if (fields.gpa) {
    fields.gpa.value = profile.gpa ?? "";
  }
  if (fields.currentYear) {
    fields.currentYear.value = profile.currentYear || "1st";
  }
  if (fields.incomeRange) {
    fields.incomeRange.value = profile.incomeRange || "Rs 1-5 LPA";
  }
  if (fields.skills) {
    fields.skills.value = Array.isArray(profile.skills) ? profile.skills.join(", ") : "";
  }
  if (fields.interests) {
    fields.interests.value = Array.isArray(profile.interests) ? profile.interests.join(", ") : "";
  }
}

function buildProfilePayload() {
  const fields = getProfileElements();

  return {
    fullName: fields.fullName?.value.trim() || "",
    age: fields.age?.value ? Number(fields.age.value) : null,
    gender: fields.gender?.value || null,
    region: fields.region?.value.trim() || null,
    category: fields.category?.value || null,
    degree: fields.degree?.value || null,
    specialisation: fields.specialisation?.value.trim() || null,
    gpa: fields.gpa?.value ? Number(fields.gpa.value) : null,
    currentYear: fields.currentYear?.value || null,
    incomeRange: fields.incomeRange?.value || null,
    skills: fields.skills?.value || "",
    interests: fields.interests?.value || ""
  };
}

async function loadProfile() {
  const api = window.ScholarLensAPI;
  const auth = window.ScholarLensAuth;

  if (!api || !auth || document.body.dataset.page !== "profile") {
    return;
  }

  try {
    const response = await api.fetchProfile();
    populateProfileForm(response.data);

    const session = auth.getSession();
    auth.setSession({
      ...session,
      loggedIn: true,
      userId: response.data.id,
      user: response.data
    });
  } catch (error) {
    setProfileStatus(error.message || "Failed to load profile.", "warning");
  }
}

async function saveProfile() {
  const api = window.ScholarLensAPI;
  const auth = window.ScholarLensAuth;
  const { saveButton } = getProfileElements();

  if (!api || !auth) {
    return;
  }

  try {
    if (saveButton) {
      saveButton.disabled = true;
      saveButton.textContent = "Saving...";
    }

    const response = await api.updateProfile(buildProfilePayload());
    populateProfileForm(response.data);

    const session = auth.getSession();
    auth.setSession({
      ...session,
      loggedIn: true,
      userId: response.data.id,
      user: response.data
    });

    setProfileStatus("Profile updated successfully.", "success");
  } catch (error) {
    setProfileStatus(error.message || "Failed to update profile.", "warning");
  } finally {
    if (saveButton) {
      saveButton.disabled = false;
      saveButton.textContent = "Save Profile";
    }
  }
}

function bindProfileForm() {
  const elements = getProfileElements();

  if (!elements.form) {
    return;
  }

  elements.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await saveProfile();
  });

  if (elements.resetButton) {
    elements.resetButton.addEventListener("click", () => {
      loadProfile();
      setProfileStatus("Profile values restored from your account.", "info");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  bindProfileForm();
  loadProfile();
});
