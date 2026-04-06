const ADMIN_SCHOLARSHIP_FORM_OPTIONS = {
  category: ["Scholarship", "Internship", "Hackathon", "Fellowship", "Competition"],
  mode: ["Online", "Offline", "Hybrid"],
  degree: ["All", "B.Tech", "B.Sc", "MBA"],
  branches: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "Other"],
  years: ["1st", "2nd", "3rd", "4th"],
  domainTags: ["AI", "Web Development", "Data Science", "Core", "Cybersecurity"],
  additionalTags: ["Women", "Research", "Startup", "Government"]
};

function getAdminScholarshipFormElements() {
  return {
    idInput: document.getElementById("admin-scholarship-id"),
    titleInput: document.getElementById("admin-scholarship-title"),
    descriptionInput: document.getElementById("admin-scholarship-description"),
    categoryInput: document.getElementById("admin-scholarship-category"),
    providerInput: document.getElementById("admin-scholarship-provider"),
    applicationLinkInput: document.getElementById("admin-scholarship-application-link"),
    officialWebsiteInput: document.getElementById("admin-scholarship-official-website"),
    deadlineInput: document.getElementById("admin-scholarship-deadline"),
    modeInput: document.getElementById("admin-scholarship-mode"),
    degreeInput: document.getElementById("admin-scholarship-degree"),
    eligibilityInput: document.getElementById("admin-scholarship-eligibility"),
    cgpaRequiredInput: document.getElementById("admin-scholarship-cgpa-required"),
    minCgpaWrap: document.getElementById("admin-scholarship-min-cgpa-wrap"),
    minCgpaInput: document.getElementById("admin-scholarship-min-cgpa"),
    backlogsInput: document.getElementById("admin-scholarship-backlogs"),
    dynamicFieldsMount: document.getElementById("admin-scholarship-dynamic-fields"),
    feedback: document.getElementById("admin-scholarship-feedback"),
    formTitle: document.getElementById("admin-scholarship-form-title"),
    saveButton: document.getElementById("admin-scholarship-save")
  };
}

function buildAdminSelectOptions(options, placeholder = null) {
  const placeholderMarkup = placeholder ? `<option value="">${escapeHtml(placeholder)}</option>` : "";
  return `${placeholderMarkup}${options
    .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
    .join("")}`;
}

function buildAdminCheckboxGroup(name, options) {
  return options
    .map(
      (option) => `
        <label class="admin-checkbox-card">
          <input type="checkbox" name="${escapeHtml(name)}" value="${escapeHtml(option)}">
          <span>${escapeHtml(option)}</span>
        </label>
      `
    )
    .join("");
}

function renderAdminScholarshipDynamicFields(category) {
  const { dynamicFieldsMount } = getAdminScholarshipFormElements();
  if (!dynamicFieldsMount) {
    return;
  }

  let markup = '<p class="admin-dynamic-empty">Select a category to load category-specific fields.</p>';

  if (category === "Scholarship") {
    markup = `
      <div class="admin-dynamic-grid">
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-funding-type">Funding Type</label>
          <select id="admin-scholarship-funding-type" class="form-select">
            ${buildAdminSelectOptions(["Fully Funded", "Partially Funded", "Tuition Only", "Stipend"], "Select")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-amount">Amount</label>
          <input id="admin-scholarship-amount" type="number" min="0" step="1" class="form-input" placeholder="50000">
        </div>
      </div>
    `;
  } else if (category === "Internship") {
    markup = `
      <div class="admin-dynamic-grid">
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-stipend-type">Stipend Type</label>
          <select id="admin-scholarship-stipend-type" class="form-select">
            ${buildAdminSelectOptions(["Paid", "Unpaid", "Performance Based"], "Select")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-stipend-amount">Stipend Amount</label>
          <input id="admin-scholarship-stipend-amount" type="number" min="0" step="1" class="form-input" placeholder="15000">
        </div>
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-duration">Duration</label>
          <input id="admin-scholarship-duration" type="text" class="form-input" placeholder="3 months">
        </div>
      </div>
    `;
  } else if (category === "Hackathon" || category === "Competition") {
    markup = `
      <div class="admin-dynamic-grid">
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-prize-pool">Prize Pool</label>
          <input id="admin-scholarship-prize-pool" type="text" class="form-input" placeholder="Prize details">
        </div>
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-participation-type">Participation Type</label>
          <select id="admin-scholarship-participation-type" class="form-select">
            ${buildAdminSelectOptions(["Individual", "Team"], "Select")}
          </select>
        </div>
        <div id="admin-scholarship-team-size-wrap" class="form-group" style="display:none;">
          <label class="form-label" for="admin-scholarship-team-size">Team Size</label>
          <input id="admin-scholarship-team-size" type="number" min="1" step="1" class="form-input" placeholder="4">
        </div>
      </div>
    `;
  } else if (category === "Fellowship") {
    markup = `
      <div class="admin-dynamic-grid">
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-funding-type">Funding Type</label>
          <select id="admin-scholarship-funding-type" class="form-select">
            ${buildAdminSelectOptions(["Fully Funded", "Partial"], "Select")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="admin-scholarship-duration">Duration</label>
          <input id="admin-scholarship-duration" type="text" class="form-input" placeholder="6 months">
        </div>
      </div>
    `;
  }

  dynamicFieldsMount.innerHTML = markup;
  syncAdminScholarshipConditionalFields();
}

function syncAdminScholarshipConditionalFields() {
  const { cgpaRequiredInput, minCgpaWrap, minCgpaInput } = getAdminScholarshipFormElements();
  if (minCgpaWrap) {
    const showMinCgpa = Boolean(cgpaRequiredInput?.checked);
    minCgpaWrap.style.display = showMinCgpa ? "block" : "none";
    if (!showMinCgpa && minCgpaInput) {
      minCgpaInput.value = "";
    }
  }

  const participationTypeInput = document.getElementById("admin-scholarship-participation-type");
  const teamSizeWrap = document.getElementById("admin-scholarship-team-size-wrap");
  const teamSizeInput = document.getElementById("admin-scholarship-team-size");
  if (teamSizeWrap) {
    const showTeamSize = participationTypeInput?.value === "Team";
    teamSizeWrap.style.display = showTeamSize ? "block" : "none";
    if (!showTeamSize && teamSizeInput) {
      teamSizeInput.value = "";
    }
  }
}

function getAdminCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function setAdminCheckedValues(name, values) {
  const selectedValues = new Set(Array.isArray(values) ? values : []);
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.checked = selectedValues.has(input.value);
  });
}

function parseAdminBooleanSelect(value) {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return null;
}

function parseAdminNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatAdminFunding(amount) {
  const parsed = parseAdminNumber(amount);
  return parsed === null ? null : `Rs ${parsed.toLocaleString("en-IN")}`;
}

function extractAdminNumericValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "number") {
    return String(value);
  }

  return String(value).replace(/[^0-9.]/g, "");
}

function createEligibilitySummary(eligibility, fallbackText = "") {
  if (fallbackText) {
    return fallbackText;
  }

  if (!eligibility || typeof eligibility !== "object") {
    return "";
  }

  const fragments = [];
  if (Array.isArray(eligibility.branches) && eligibility.branches.length) {
    fragments.push(`Branches: ${eligibility.branches.join(", ")}`);
  }
  if (Array.isArray(eligibility.years) && eligibility.years.length) {
    fragments.push(`Years: ${eligibility.years.join(", ")}`);
  }
  if (eligibility.cgpaRequired) {
    fragments.push(`Minimum CGPA: ${eligibility.minCgpa ?? "Required"}`);
  }
  if (typeof eligibility.backlogsAllowed === "boolean") {
    fragments.push(`Backlogs allowed: ${eligibility.backlogsAllowed ? "Yes" : "No"}`);
  }

  return fragments.join(" | ");
}

function getAdminScholarshipExtraDetails(category) {
  if (category === "Scholarship") {
    return {
      fundingType: document.getElementById("admin-scholarship-funding-type")?.value || null,
      amount: parseAdminNumber(document.getElementById("admin-scholarship-amount")?.value)
    };
  }

  if (category === "Internship") {
    return {
      stipendType: document.getElementById("admin-scholarship-stipend-type")?.value || null,
      stipendAmount: parseAdminNumber(document.getElementById("admin-scholarship-stipend-amount")?.value),
      duration: document.getElementById("admin-scholarship-duration")?.value.trim() || null
    };
  }

  if (category === "Hackathon" || category === "Competition") {
    const participationType = document.getElementById("admin-scholarship-participation-type")?.value || null;
    return {
      prizePool: document.getElementById("admin-scholarship-prize-pool")?.value.trim() || null,
      participationType,
      teamSize: participationType === "Team" ? parseAdminNumber(document.getElementById("admin-scholarship-team-size")?.value) : null
    };
  }

  if (category === "Fellowship") {
    return {
      fundingType: document.getElementById("admin-scholarship-funding-type")?.value || null,
      duration: document.getElementById("admin-scholarship-duration")?.value.trim() || null
    };
  }

  return {};
}

function setAdminScholarshipExtraDetails(category, extraDetails = {}, scholarship = {}) {
  if (category === "Scholarship") {
    const fundingTypeInput = document.getElementById("admin-scholarship-funding-type");
    const amountInput = document.getElementById("admin-scholarship-amount");
    if (fundingTypeInput) {
      fundingTypeInput.value = extraDetails.fundingType || "";
    }
    if (amountInput) {
      amountInput.value = extractAdminNumericValue(extraDetails.amount ?? scholarship.fundingAmount ?? scholarship.funding);
    }
    return;
  }

  if (category === "Internship") {
    const stipendTypeInput = document.getElementById("admin-scholarship-stipend-type");
    const stipendAmountInput = document.getElementById("admin-scholarship-stipend-amount");
    const durationInput = document.getElementById("admin-scholarship-duration");
    if (stipendTypeInput) {
      stipendTypeInput.value = extraDetails.stipendType || "";
    }
    if (stipendAmountInput) {
      stipendAmountInput.value = extractAdminNumericValue(extraDetails.stipendAmount);
    }
    if (durationInput) {
      durationInput.value = extraDetails.duration || "";
    }
    return;
  }

  if (category === "Hackathon" || category === "Competition") {
    const prizePoolInput = document.getElementById("admin-scholarship-prize-pool");
    const participationTypeInput = document.getElementById("admin-scholarship-participation-type");
    const teamSizeInput = document.getElementById("admin-scholarship-team-size");
    if (prizePoolInput) {
      prizePoolInput.value = extraDetails.prizePool || "";
    }
    if (participationTypeInput) {
      participationTypeInput.value = extraDetails.participationType || "";
    }
    syncAdminScholarshipConditionalFields();
    if (teamSizeInput) {
      teamSizeInput.value = extractAdminNumericValue(extraDetails.teamSize);
    }
    return;
  }

  if (category === "Fellowship") {
    const fundingTypeInput = document.getElementById("admin-scholarship-funding-type");
    const durationInput = document.getElementById("admin-scholarship-duration");
    if (fundingTypeInput) {
      fundingTypeInput.value = extraDetails.fundingType || "";
    }
    if (durationInput) {
      durationInput.value = extraDetails.duration || "";
    }
  }
}

function renderAdminScholarshipFormControls() {
  const { categoryInput, modeInput, degreeInput, cgpaRequiredInput } = getAdminScholarshipFormElements();
  const branchMount = document.getElementById("admin-eligibility-branches");
  const yearMount = document.getElementById("admin-eligibility-years");
  const domainTagMount = document.getElementById("admin-domain-tags");
  const additionalTagMount = document.getElementById("admin-additional-tags");

  if (!categoryInput || categoryInput.dataset.ready === "true") {
    return;
  }

  categoryInput.innerHTML = buildAdminSelectOptions(ADMIN_SCHOLARSHIP_FORM_OPTIONS.category);
  modeInput.innerHTML = buildAdminSelectOptions(ADMIN_SCHOLARSHIP_FORM_OPTIONS.mode, "Select");
  degreeInput.innerHTML = buildAdminSelectOptions(ADMIN_SCHOLARSHIP_FORM_OPTIONS.degree);
  branchMount.innerHTML = buildAdminCheckboxGroup("admin-eligibility-branch", ADMIN_SCHOLARSHIP_FORM_OPTIONS.branches);
  yearMount.innerHTML = buildAdminCheckboxGroup("admin-eligibility-year", ADMIN_SCHOLARSHIP_FORM_OPTIONS.years);
  domainTagMount.innerHTML = buildAdminCheckboxGroup("admin-domain-tag", ADMIN_SCHOLARSHIP_FORM_OPTIONS.domainTags);
  additionalTagMount.innerHTML = buildAdminCheckboxGroup("admin-additional-tag", ADMIN_SCHOLARSHIP_FORM_OPTIONS.additionalTags);

  categoryInput.addEventListener("change", () => {
    renderAdminScholarshipDynamicFields(categoryInput.value);
  });

  cgpaRequiredInput?.addEventListener("change", syncAdminScholarshipConditionalFields);

  document.addEventListener("change", (event) => {
    if (event.target?.id === "admin-scholarship-participation-type") {
      syncAdminScholarshipConditionalFields();
    }
  });

  categoryInput.dataset.ready = "true";
  categoryInput.value = "Scholarship";
  renderAdminScholarshipDynamicFields(categoryInput.value);
}

function resetAdminScholarshipForm() {
  renderAdminScholarshipFormControls();

  const {
    idInput,
    titleInput,
    descriptionInput,
    categoryInput,
    providerInput,
    applicationLinkInput,
    officialWebsiteInput,
    deadlineInput,
    modeInput,
    degreeInput,
    eligibilityInput,
    cgpaRequiredInput,
    minCgpaInput,
    backlogsInput,
    feedback,
    formTitle,
    saveButton
  } = getAdminScholarshipFormElements();

  if (idInput) {
    idInput.value = "";
  }
  if (titleInput) {
    titleInput.value = "";
  }
  if (descriptionInput) {
    descriptionInput.value = "";
  }
  if (categoryInput) {
    categoryInput.value = "Scholarship";
  }
  if (providerInput) {
    providerInput.value = "";
  }
  if (applicationLinkInput) {
    applicationLinkInput.value = "";
  }
  if (officialWebsiteInput) {
    officialWebsiteInput.value = "";
  }
  if (deadlineInput) {
    deadlineInput.value = "";
  }
  if (modeInput) {
    modeInput.value = "";
  }
  if (degreeInput) {
    degreeInput.value = "All";
  }
  if (eligibilityInput) {
    eligibilityInput.value = "";
  }
  if (cgpaRequiredInput) {
    cgpaRequiredInput.checked = false;
  }
  if (minCgpaInput) {
    minCgpaInput.value = "";
  }
  if (backlogsInput) {
    backlogsInput.value = "";
  }

  setAdminCheckedValues("admin-eligibility-branch", []);
  setAdminCheckedValues("admin-eligibility-year", []);
  setAdminCheckedValues("admin-domain-tag", []);
  setAdminCheckedValues("admin-additional-tag", []);
  renderAdminScholarshipDynamicFields(categoryInput?.value || "Scholarship");

  if (feedback) {
    feedback.textContent = "";
    feedback.style.color = "var(--text)";
  }
  if (formTitle) {
    formTitle.textContent = "Add New Opportunity";
  }
  if (saveButton) {
    saveButton.textContent = "Save Opportunity";
  }
}

function populateAdminScholarshipForm(scholarship) {
  renderAdminScholarshipFormControls();

  const {
    idInput,
    titleInput,
    descriptionInput,
    categoryInput,
    providerInput,
    applicationLinkInput,
    officialWebsiteInput,
    deadlineInput,
    modeInput,
    degreeInput,
    eligibilityInput,
    cgpaRequiredInput,
    minCgpaInput,
    backlogsInput,
    formTitle,
    saveButton
  } = getAdminScholarshipFormElements();

  const eligibilityValue = scholarship.eligibility && typeof scholarship.eligibility === "object" && !Array.isArray(scholarship.eligibility)
    ? scholarship.eligibility
    : {};
  const tagValue = scholarship.tags && typeof scholarship.tags === "object" ? scholarship.tags : {};
  const category = scholarship.category || "Scholarship";

  if (idInput) {
    idInput.value = scholarship.id;
  }
  if (titleInput) {
    titleInput.value = scholarship.title || "";
  }
  if (descriptionInput) {
    descriptionInput.value = scholarship.description || "";
  }
  if (categoryInput) {
    categoryInput.value = category;
  }
  if (providerInput) {
    providerInput.value = scholarship.provider || scholarship.region || "";
  }
  if (applicationLinkInput) {
    applicationLinkInput.value = scholarship.applicationLink || scholarship.link || scholarship.url || scholarship.website || "";
  }
  if (officialWebsiteInput) {
    officialWebsiteInput.value = scholarship.officialWebsite || scholarship.website || "";
  }
  if (deadlineInput) {
    deadlineInput.value = scholarship.deadline ? new Date(scholarship.deadline).toISOString().split("T")[0] : "";
  }
  if (modeInput) {
    modeInput.value = scholarship.mode || "";
  }
  if (degreeInput) {
    degreeInput.value = scholarship.degree || "All";
  }
  if (eligibilityInput) {
    eligibilityInput.value = createEligibilitySummary(
      eligibilityValue,
      typeof scholarship.eligibility === "string" ? scholarship.eligibility : scholarship.eligibilitySummary || ""
    );
  }
  if (cgpaRequiredInput) {
    cgpaRequiredInput.checked = Boolean(eligibilityValue.cgpaRequired);
  }
  if (minCgpaInput) {
    minCgpaInput.value = eligibilityValue.minCgpa ?? "";
  }
  if (backlogsInput) {
    backlogsInput.value = typeof eligibilityValue.backlogsAllowed === "boolean" ? String(eligibilityValue.backlogsAllowed) : "";
  }

  setAdminCheckedValues("admin-eligibility-branch", eligibilityValue.branches || []);
  setAdminCheckedValues("admin-eligibility-year", eligibilityValue.years || []);
  setAdminCheckedValues("admin-domain-tag", tagValue.domain || []);
  setAdminCheckedValues("admin-additional-tag", tagValue.additional || []);

  renderAdminScholarshipDynamicFields(category);
  setAdminScholarshipExtraDetails(category, scholarship.extraDetails || {}, scholarship);
  syncAdminScholarshipConditionalFields();

  if (formTitle) {
    formTitle.textContent = "Edit Opportunity";
  }
  if (saveButton) {
    saveButton.textContent = "Update Opportunity";
  }
}

function openAdminScholarshipForm() {
  const form = document.getElementById("admin-add-form");
  if (!form) {
    return;
  }
  form.style.display = "block";
}

function closeAdminScholarshipForm() {
  const form = document.getElementById("admin-add-form");
  if (!form) {
    return;
  }
  form.style.display = "none";
  resetAdminScholarshipForm();
}

function toggleAdminForm() {
  const form = document.getElementById("admin-add-form");
  if (form) {
    const isHidden = form.style.display === "none" || !form.style.display;
    form.style.display = isHidden ? "block" : "none";
    if (!isHidden) {
      resetAdminScholarshipForm();
    } else {
      renderAdminScholarshipFormControls();
    }
  }
}

async function handleAdminScholarshipEdit(id) {
  const api = getApi();
  if (!api) {
    return;
  }

  let scholarship = (window.adminScholarships || []).find((item) => item.id === id);
  if (!scholarship) {
    try {
      const response = await api.fetchScholarshipById(id);
      scholarship = response.data;
    } catch (error) {
      alert(error.message || "Unable to load opportunity for editing.");
      return;
    }
  }

  populateAdminScholarshipForm(scholarship);
  openAdminScholarshipForm();
}

async function handleAdminScholarshipDelete(id) {
  const api = getApi();
  if (!api) {
    return;
  }

  const confirmed = window.confirm("Are you sure you want to delete this scholarship?");
  if (!confirmed) {
    return;
  }

  try {
    await api.deleteScholarship(id);
    await renderAdminScholarshipsPage();
  } catch (error) {
    alert(error.message || "Failed to delete scholarship.");
  }
}

async function renderAdminScholarshipsPage() {
  const api = getApi();
  if (!api || !window.location.pathname.endsWith("admin-scholarships.html")) {
    return;
  }

  renderAdminScholarshipFormControls();

  const tbody = document.getElementById("admin-scholarship-list");
  const feedback = document.getElementById("admin-scholarship-feedback");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = '<tr><td colspan="5" style="padding:1rem;">Loading scholarships...</td></tr>';
  if (feedback) {
    feedback.textContent = "";
    feedback.style.color = "var(--text)";
  }

  try {
    const response = await api.fetchScholarships();
    const scholarships = response.data || [];
    window.adminScholarships = scholarships;

    tbody.innerHTML = scholarships.length
      ? scholarships.map(createAdminScholarshipRow).join("")
      : '<tr><td colspan="5" style="padding:1rem;">No scholarships found. Add one to get started.</td></tr>';
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="5" style="padding:1rem; color:var(--red);">${escapeHtml(error.message || "Failed to load scholarships.")}</td></tr>`;
  }
}

async function handleAdminScholarshipSave() {
  const api = getApi();
  if (!api) {
    return;
  }

  const {
    idInput,
    titleInput,
    descriptionInput,
    categoryInput,
    providerInput,
    applicationLinkInput,
    officialWebsiteInput,
    deadlineInput,
    modeInput,
    degreeInput,
    eligibilityInput,
    cgpaRequiredInput,
    minCgpaInput,
    backlogsInput,
    feedback,
    saveButton
  } = getAdminScholarshipFormElements();

  if (!titleInput || !descriptionInput || !deadlineInput || !applicationLinkInput || !saveButton) {
    return;
  }

  const scholarshipId = idInput?.value || null;
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const category = categoryInput?.value || "Scholarship";
  const provider = providerInput?.value.trim() || null;
  const applicationLink = applicationLinkInput.value.trim();
  const officialWebsite = officialWebsiteInput?.value.trim() || null;
  const deadline = deadlineInput.value;
  const mode = modeInput?.value || null;
  const degree = degreeInput?.value || null;
  const eligibility = {
    branches: getAdminCheckedValues("admin-eligibility-branch"),
    years: getAdminCheckedValues("admin-eligibility-year"),
    cgpaRequired: Boolean(cgpaRequiredInput?.checked),
    minCgpa: cgpaRequiredInput?.checked ? parseAdminNumber(minCgpaInput?.value) : null,
    backlogsAllowed: parseAdminBooleanSelect(backlogsInput?.value)
  };
  const tags = {
    domain: getAdminCheckedValues("admin-domain-tag"),
    additional: getAdminCheckedValues("admin-additional-tag")
  };
  const eligibilitySummary = eligibilityInput?.value.trim() || createEligibilitySummary(eligibility);
  const extraDetails = getAdminScholarshipExtraDetails(category);
  const funding = category === "Scholarship" ? formatAdminFunding(extraDetails.amount) : null;
  const eligibleSkills = Array.from(
    new Set([
      ...tags.domain,
      ...tags.additional,
      ...eligibility.branches,
      ...eligibility.years
    ])
  );

  if (!title || !description || !applicationLink || !deadline) {
    if (feedback) {
      feedback.textContent = "Title, description, application link, and deadline are required.";
      feedback.style.color = "var(--red)";
    }
    return;
  }

  const payload = {
    title,
    description,
    category,
    provider,
    applicationLink,
    officialWebsite,
    deadline,
    mode,
    degree,
    eligibility,
    eligibilitySummary,
    tags,
    extraDetails,
    funding,
    eligibleSkills
  };

  saveButton.disabled = true;
  saveButton.textContent = scholarshipId ? "Updating..." : "Saving...";

  try {
    if (scholarshipId) {
      await api.updateScholarship(scholarshipId, payload);
      if (feedback) {
        feedback.textContent = "Opportunity updated successfully.";
      }
    } else {
      await api.createScholarship(payload);
      if (feedback) {
        feedback.textContent = "Opportunity saved successfully.";
      }
    }

    if (feedback) {
      feedback.style.color = "var(--teal)";
    }

    resetAdminScholarshipForm();
    closeAdminScholarshipForm();
    await renderAdminScholarshipsPage();
  } catch (error) {
    if (feedback) {
      feedback.textContent = error.message || (scholarshipId ? "Failed to update opportunity." : "Failed to save opportunity.");
      feedback.style.color = "var(--red)";
    }
  } finally {
    saveButton.disabled = false;
    if (saveButton) {
      saveButton.textContent = scholarshipId ? "Update Opportunity" : "Save Opportunity";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("admin-scholarships.html")) {
    renderAdminScholarshipFormControls();
    syncAdminScholarshipConditionalFields();
  }
});