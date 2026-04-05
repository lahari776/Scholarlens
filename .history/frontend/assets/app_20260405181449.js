const APP_STORAGE_KEY = "scholarlens-session";

const scholarships = [
  {
    id: 1,
    title: "STEM Excellence Award 2025",
    org: "National Science Foundation",
    amount: "&#8377;50,000",
    deadline: "15 Mar 2026",
    tags: ["Engineering", "B.Tech"],
    match: 92,
    days: 7
  },
  {
    id: 2,
    title: "National Merit Scholarship",
    org: "Ministry of Education",
    amount: "&#8377;1,00,000",
    deadline: "30 Apr 2026",
    tags: ["All Degrees", "Merit"],
    match: 88,
    days: 38
  },
  {
    id: 3,
    title: "AI Innovation Grant",
    org: "TechCorp Foundation",
    amount: "&#8377;75,000",
    deadline: "01 Jun 2026",
    tags: ["CSE", "AI/ML"],
    match: 85,
    days: 70
  },
  {
    id: 4,
    title: "Women in Tech Grant",
    org: "WiT India",
    amount: "&#8377;30,000",
    deadline: "20 Mar 2026",
    tags: ["Engineering", "Women"],
    match: 79,
    days: 4
  },
  {
    id: 5,
    title: "Rural Talent Scholarship",
    org: "State Government",
    amount: "&#8377;20,000",
    deadline: "31 May 2026",
    tags: ["All", "Income-based"],
    match: 71,
    days: 69
  },
  {
    id: 6,
    title: "Research Excellence Award",
    org: "IIT Alumni Network",
    amount: "&#8377;80,000",
    deadline: "10 Apr 2026",
    tags: ["M.Tech", "Research"],
    match: 66,
    days: 18
  }
];

const landingScholarships = [
  {
    badge: "New",
    title: "Future Leaders Global Scholarship",
    description: "For students with strong academics, leadership work, and a clear plan for social or career impact.",
    deadline: "12 Apr 2026",
    region: "India / Global",
    funding: "Up to Rs 2,00,000",
    type: "latest"
  },
  {
    badge: "New",
    title: "Women in STEM Impact Fund",
    description: "Supports women pursuing engineering, computing, data, and research-focused degree pathways.",
    deadline: "28 Apr 2026",
    region: "South Asia",
    funding: "Rs 1,20,000 + Mentorship",
    type: "latest"
  },
  {
    badge: "New",
    title: "National Research Access Scholarship",
    description: "Funding support for undergraduate and postgraduate learners entering research projects and lab programs.",
    deadline: "08 May 2026",
    region: "India",
    funding: "Rs 80,000",
    type: "latest"
  },
  {
    badge: "Deadline Soon",
    title: "Merit Excellence Tuition Grant",
    description: "Recognizes outstanding performance and supports tuition for students with high academic consistency.",
    deadline: "26 Mar 2026",
    region: "Pan India",
    funding: "Rs 60,000",
    type: "deadline"
  },
  {
    badge: "Deadline Soon",
    title: "Rural Talent Advancement Scholarship",
    description: "Designed for students from rural communities pursuing college and professional education pathways.",
    deadline: "29 Mar 2026",
    region: "Tier 2 / Tier 3",
    funding: "Rs 45,000",
    type: "deadline"
  },
  {
    badge: "Deadline Soon",
    title: "Tech Access Need-Based Award",
    description: "Helps students with financial need continue in technology and engineering-focused education programs.",
    deadline: "31 Mar 2026",
    region: "India",
    funding: "Rs 75,000",
    type: "deadline"
  }
];

const opportunities = {
  hackathons: [
    {
      title: "Build for Bharat Hackathon",
      description: "Solve civic-tech and public-service challenges with product, engineering, and AI teams.",
      deadline: "05 Apr 2026",
      organizer: "Unstop Campus Labs",
      benefit: "Prize pool Rs 3,00,000"
    },
    {
      title: "AI Sprint Challenge",
      description: "Prototype practical AI tools that improve education, health, or productivity outcomes.",
      deadline: "11 Apr 2026",
      organizer: "DevLaunch",
      benefit: "Cash + Internship Interviews"
    },
    {
      title: "FinTech Buildathon",
      description: "Create payment, lending, and financial access solutions with mentors from industry teams.",
      deadline: "17 Apr 2026",
      organizer: "RazorSpark",
      benefit: "Prize pool Rs 1,50,000"
    }
  ],
  governmentSchemes: [
    {
      title: "Digital Skills for Youth Scheme",
      description: "Government-backed digital training and certification support for college students and early graduates.",
      deadline: "30 Apr 2026",
      organizer: "Ministry of Skill Development",
      benefit: "Free training + Certificate"
    },
    {
      title: "Startup Seed Support Scheme",
      description: "Early-stage innovation support for student founders building ideas with social or economic impact.",
      deadline: "15 May 2026",
      organizer: "Innovation Mission",
      benefit: "Seed funding up to Rs 5,00,000"
    },
    {
      title: "Higher Education Mobility Program",
      description: "Travel and participation support for students attending approved national academic events.",
      deadline: "08 Apr 2026",
      organizer: "Department of Education",
      benefit: "Travel grant + Fee support"
    }
  ],
  internships: [
    {
      title: "Product Design Internship",
      description: "Work on live student-facing products and build portfolio-ready experience with design mentors.",
      deadline: "09 Apr 2026",
      organizer: "LearnGrid",
      benefit: "Stipend Rs 18,000/month"
    },
    {
      title: "Software Engineering Intern",
      description: "Hands-on engineering internship focused on frontend systems, APIs, and feature delivery.",
      deadline: "14 Apr 2026",
      organizer: "NovaStack",
      benefit: "Stipend Rs 30,000/month"
    },
    {
      title: "Research and Policy Intern",
      description: "Support policy analysis, public data reviews, and student opportunity research projects.",
      deadline: "20 Apr 2026",
      organizer: "Civic Futures Lab",
      benefit: "Certificate + Stipend"
    }
  ],
  fellowshipsPrograms: [
    {
      title: "Youth Policy Fellowship",
      description: "A cohort-based leadership and public problem-solving experience for emerging changemakers.",
      deadline: "22 Apr 2026",
      organizer: "Policy Studio India",
      benefit: "Mentorship + Research Grant"
    },
    {
      title: "Campus Innovation Fellows",
      description: "Build projects, receive founder mentorship, and access a structured learning community.",
      deadline: "01 May 2026",
      organizer: "NextGen Fellows",
      benefit: "Funding + Community Access"
    },
    {
      title: "Women in Leadership Program",
      description: "A guided program to strengthen communication, strategy, and career confidence for women students.",
      deadline: "18 Apr 2026",
      organizer: "LeadHer Collective",
      benefit: "Training + Career Coaching"
    }
  ],
  workshopsBootcamps: [
    {
      title: "Data Analytics Bootcamp",
      description: "A fast-paced bootcamp covering Excel, SQL, dashboards, and practical analytics projects.",
      deadline: "07 Apr 2026",
      organizer: "SkillForge",
      benefit: "Certificate + Portfolio Project"
    },
    {
      title: "UI/UX Design Workshop Series",
      description: "Learn visual hierarchy, wireframing, and portfolio storytelling from working designers.",
      deadline: "10 Apr 2026",
      organizer: "Design Deck",
      benefit: "Live workshop + Resources"
    },
    {
      title: "AI Career Starter Camp",
      description: "A beginner-friendly intro to prompts, automation, and practical AI tools for students.",
      deadline: "25 Apr 2026",
      organizer: "Future Ready Labs",
      benefit: "Hands-on training"
    }
  ],
  internationalOpportunities: [
    {
      title: "Global Exchange Semester Support",
      description: "Financial and advising support for students pursuing short-term study abroad experiences.",
      deadline: "30 Apr 2026",
      organizer: "StudyBridge Global",
      benefit: "Partial funding + Visa guidance"
    },
    {
      title: "International Summer Research Program",
      description: "Join faculty-led research placements in data science, sustainability, and public health.",
      deadline: "12 May 2026",
      organizer: "Global Labs Network",
      benefit: "Travel support + Research stipend"
    },
    {
      title: "UN Youth Delegate Opportunity",
      description: "Represent youth voices, attend policy sessions, and collaborate on global development themes.",
      deadline: "16 Apr 2026",
      organizer: "International Youth Forum",
      benefit: "Delegation access + Training"
    }
  ]
};

function getSession() {
  if (window.ScholarLensAuth) {
    return window.ScholarLensAuth.getSession();
  }

  try {
    return JSON.parse(localStorage.getItem(APP_STORAGE_KEY)) || { loggedIn: false, role: null };
  } catch {
    return { loggedIn: false, role: null };
  }
}

function setSession(session) {
  if (window.ScholarLensAuth) {
    window.ScholarLensAuth.setSession(session);
    return;
  }

  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(session));
}

function getApi() {
  return window.ScholarLensAPI || null;
}

function getApiBaseUrl() {
  return getApi()?.API_BASE_URL || "http://localhost:5000/api";
}

function getCurrentUser() {
  return getSession().user || null;
}

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function getDaysLeft(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const diff = date.getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getStatusClass(status) {
  const map = {
    applied: "status-applied",
    review: "status-review",
    approved: "status-approved",
    rejected: "status-rejected"
  };

  return map[status] || "status-applied";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatCompactNumber(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("en-IN").format(number);
}

function logout() {
  if (window.ScholarLensAuth) {
    window.ScholarLensAuth.logout();
    return;
  }

  localStorage.removeItem(APP_STORAGE_KEY);
  window.location.href = "index.html";
}

async function trackScholarshipInteraction(eventType, scholarshipId, source, metadata = null) {
  const api = getApi();
  const session = getSession();

  if (!api || !session.userId || !scholarshipId) {
    return;
  }

  try {
    await api.trackInteraction({
      userId: session.userId,
      scholarshipId,
      eventType,
      source,
      metadata
    });
  } catch {
    // Tracking should never block the user flow.
  }
}

function handleSaveToggle(element, scholarshipId, source) {
  if (!element) {
    return;
  }

  const wasSaved = toggleSavedScholarship(scholarshipId);
  syncSavedUiState(element, wasSaved);
  trackScholarshipInteraction(wasSaved ? "save" : "view", scholarshipId, source, {
    toggleSaved: wasSaved
  });
}

function getSavedScholarshipIds() {
  try {
    const saved = JSON.parse(localStorage.getItem("scholarlens-saved-items")) || [];
    return Array.isArray(saved) ? saved.map((item) => String(item)) : [];
  } catch {
    return [];
  }
}

function setSavedScholarshipIds(ids) {
  localStorage.setItem("scholarlens-saved-items", JSON.stringify(ids));
}

function isScholarshipSaved(scholarshipId) {
  return getSavedScholarshipIds().includes(String(scholarshipId));
}

function toggleSavedScholarship(scholarshipId) {
  const targetId = String(scholarshipId);
  const savedIds = getSavedScholarshipIds();
  const existingIndex = savedIds.indexOf(targetId);

  if (existingIndex >= 0) {
    savedIds.splice(existingIndex, 1);
    setSavedScholarshipIds(savedIds);
    return false;
  }

  savedIds.push(targetId);
  setSavedScholarshipIds(savedIds);
  return true;
}

function syncSavedUiState(element, isSaved) {
  if (!element) {
    return;
  }

  element.classList.toggle("saved", isSaved);

  if (element.matches("button")) {
    element.textContent = isSaved ? "Saved" : "Save Scholarship";
    element.setAttribute("aria-pressed", isSaved ? "true" : "false");
  }
}
function trackApplyIntent(scholarshipId, source) {
  trackScholarshipInteraction("view", scholarshipId, `${source}_apply_link`);
}

function trackDetailIntent(scholarshipId, source) {
  trackScholarshipInteraction("detail_click", scholarshipId, source);
}

function trackRecommendationIntent(scholarshipId, source) {
  trackScholarshipInteraction("recommendation_click", scholarshipId, source);
}

function formatScoreValue(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "N/A";
  }

  return `${Math.round(value)}%`;
}

function renderReasonTags(reasons) {
  if (!Array.isArray(reasons) || !reasons.length) {
    return '<span class="tag">Profile-aligned</span>';
  }

  return reasons.map((reason) => `<span class="tag">${escapeHtml(reason)}</span>`).join("");
}

function renderEnsembleBreakdown(scholarship) {
  const breakdown = scholarship.ensembleBreakdown;
  if (!breakdown) {
    return `
      <div class="ensemble-panel">
        <div class="ensemble-header">
          <strong>Recommendation Signals</strong>
          <span class="tag">Fallback Mode</span>
        </div>
        <p class="ensemble-copy">This result is using the baseline scorer, so detailed ensemble diagnostics are not available.</p>
      </div>
    `;
  }

  const modelLabel = breakdown.artifactBacked ? "Trained Artifacts" : breakdown.metaModelScore !== null ? "Live Ensemble" : "Hybrid Rules";
  const sklearnLabel = breakdown.sklearnEnabled ? "scikit-learn" : "No sklearn";

  return `
    <div class="ensemble-panel">
      <div class="ensemble-header">
        <strong>Ensemble Breakdown</strong>
        <div class="ensemble-header-tags">
          <span class="tag tag-teal">${modelLabel}</span>
          <span class="tag">${sklearnLabel}</span>
        </div>
      </div>
      <div class="ensemble-grid">
        <div class="ensemble-metric">
          <span class="ensemble-label">Content</span>
          <strong>${formatScoreValue(breakdown.contentScore)}</strong>
        </div>
        <div class="ensemble-metric">
          <span class="ensemble-label">Compatibility</span>
          <strong>${formatScoreValue(breakdown.compatibilityScore)}</strong>
        </div>
        <div class="ensemble-metric">
          <span class="ensemble-label">Meta Model</span>
          <strong>${formatScoreValue(breakdown.metaModelScore)}</strong>
        </div>
        <div class="ensemble-metric">
          <span class="ensemble-label">Classifier</span>
          <strong>${formatScoreValue(breakdown.classifierScore)}</strong>
        </div>
        <div class="ensemble-metric">
          <span class="ensemble-label">Popularity</span>
          <strong>${formatScoreValue(breakdown.popularityScore)}</strong>
        </div>
      </div>
      <div class="ensemble-reasons">
        ${renderReasonTags(scholarship.reasons)}
      </div>
    </div>
  `;
}

async function fetchScholarshipDetail(scholarshipId) {
  const api = getApi();

  if (api?.fetchScholarshipById) {
    return api.fetchScholarshipById(scholarshipId);
  }

  const session = getSession();
  const response = await fetch(`${getApiBaseUrl()}/scholarships/${encodeURIComponent(scholarshipId)}`, {
    headers: session.token
      ? {
          Authorization: `Bearer ${session.token}`
        }
      : {}
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.message || "Failed to load scholarship");
  }

  return payload;
}


async function apiRequestWithSession(path, options = {}) {
  const session = getSession();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (session.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers
  });
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(payload?.message || "Request failed");
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

async function fetchUserApplicationsById(userId) {
  const api = getApi();

  if (api?.fetchUserApplications) {
    return api.fetchUserApplications(userId);
  }

  return apiRequestWithSession(`/applications/user/${encodeURIComponent(userId)}`);
}

async function markOpportunityRegistered({ userId, scholarshipId }) {
  const api = getApi();
  const payload = {
    userId,
    scholarshipId,
    statement: ""
  };

  if (api?.applyForScholarship) {
    return api.applyForScholarship(payload);
  }

  return apiRequestWithSession("/applications/apply", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

function getOpportunityLink(scholarship) {
  return scholarship?.applicationLink || scholarship?.link || scholarship?.url || scholarship?.website || null;
}

function setRegistrationButtonState(button, state, labelOverride = "") {
  if (!button) {
    return;
  }

  const labelMap = {
    idle: "Mark as Registered",
    loading: "Saving...",
    success: "âœ” Registered",
    login: "Log In to Register"
  };

  const label = labelOverride || labelMap[state] || labelMap.idle;
  button.textContent = label;
  button.disabled = state === "loading" || state === "success";
  button.setAttribute("aria-disabled", button.disabled ? "true" : "false");
  button.classList.toggle("btn-outline", state === "success");
  button.classList.toggle("btn-gold", state !== "success");
}

function buildDetailEligibility(scholarship) {
  const items = [];

  if (scholarship.degree) {
    items.push(`Open to ${scholarship.degree} students`);
  }
  if (scholarship.region) {
    items.push(`Preferred region: ${scholarship.region}`);
  }
  if (scholarship.category) {
    items.push(`Category focus: ${scholarship.category}`);
  }
  if (Array.isArray(scholarship.eligibleSkills) && scholarship.eligibleSkills.length) {
    items.push(`Skills valued: ${scholarship.eligibleSkills.join(", ")}`);
  }

  return items.length
    ? items
    : ["See provider guidance and application notes for the full eligibility requirements."];
}

async function renderDetailPage() {
  if (document.body.dataset.page !== "detail") {
    return;
  }

  const scholarshipId = new URLSearchParams(window.location.search).get("id");
  if (!scholarshipId) {
    return;
  }

  const session = getSession();
  const card = document.querySelector(".two-column-page .card");
  const backLink = document.querySelector('.container.section-sm > a.btn');
  const registerButton = document.getElementById("register-button");
  const externalLink = document.getElementById("detail-external-link");
  const saveButton = document.getElementById("detail-save-button");

  if (!card) {
    return;
  }

  try {
    const recommendationPromise = session.userId && getApi()
      ? getApi().fetchRecommendations(session.userId).catch(() => ({ data: [] }))
      : Promise.resolve({ data: [] });
    const applicationsPromise = session.userId
      ? fetchUserApplicationsById(session.userId).catch(() => ({ data: [] }))
      : Promise.resolve({ data: [] });

    const [scholarshipResponse, recommendationResponse, applicationResponse] = await Promise.all([
      fetchScholarshipDetail(scholarshipId),
      recommendationPromise,
      applicationsPromise
    ]);

    const scholarship = scholarshipResponse.data;
    const recommendations = recommendationResponse.data || [];
    const applications = applicationResponse.data || [];
    const recommended = recommendations.find((item) => String(item.id) === String(scholarship.id)) || null;
    const existingApplication = applications.find((item) => String(item.scholarshipId) === String(scholarship.id));
    const daysLeft = getDaysLeft(scholarship.deadline);
    const detailLink = getOpportunityLink(scholarship);

    document.title = `${scholarship.title} - ScholarLens`;

    const headerTag = document.getElementById("detail-type-tag");
    if (headerTag) {
      headerTag.hidden = false;
      headerTag.textContent = scholarship.category || scholarship.degree || "Opportunity";
    }

    const title = document.getElementById("detail-title");
    if (title) {
      title.textContent = scholarship.title || "Untitled Opportunity";
    }

    const provider = document.getElementById("detail-provider");
    if (provider) {
      provider.textContent = scholarship.provider || scholarship.region || "ScholarLens Partner";
    }

    const description = document.getElementById("detail-description");
    if (description) {
      description.textContent = scholarship.description || "No detailed description available.";
    }

    const keyList = document.getElementById("detail-key-list");
    if (keyList) {
      const keyItems = [
        `Deadline: ${formatDate(scholarship.deadline)}`,
        `Provider: ${scholarship.provider || scholarship.region || "ScholarLens Partner"}`,
        `Funding or benefit: ${scholarship.fundingAmount || scholarship.funding || "Funding available"}`,
        scholarship.region ? `Region: ${scholarship.region}` : null,
        scholarship.degree ? `Degree: ${scholarship.degree}` : null,
        detailLink ? `Application link: ${detailLink}` : "Application link not available"
      ].filter(Boolean);
      keyList.innerHTML = keyItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }

    const secondaryHeading = document.getElementById("detail-secondary-heading");
    const secondaryList = document.getElementById("detail-secondary-list");
    if (secondaryHeading) {
      secondaryHeading.textContent = "Eligibility and Notes";
    }
    if (secondaryList) {
      const items = buildDetailEligibility(scholarship);
      const reasons = recommended?.reasons?.length ? recommended.reasons : ["Review the provider notes and deadline before registering."];
      secondaryList.innerHTML = [...items, ...reasons].map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }

    const benefitLabel = document.getElementById("detail-benefit-label");
    const benefitValue = document.getElementById("detail-benefit-value");
    const benefitSubtitle = document.getElementById("detail-benefit-subtitle");
    if (benefitLabel) {
      benefitLabel.textContent = scholarship.category === "Scholarships" || scholarship.fundingAmount || scholarship.funding ? "Award Amount" : "Opportunity Benefit";
    }
    if (benefitValue) {
      benefitValue.textContent = scholarship.fundingAmount || scholarship.funding || "Funding available";
    }
    if (benefitSubtitle) {
      benefitSubtitle.textContent = scholarship.category || scholarship.degree || "Opportunity";
    }

    const deadlineValue = document.getElementById("detail-deadline-value");
    const deadlineAlert = document.getElementById("detail-deadline-alert");
    if (deadlineValue) {
      deadlineValue.textContent = formatDate(scholarship.deadline);
    }
    if (deadlineAlert) {
      deadlineAlert.textContent = typeof daysLeft === "number"
        ? daysLeft > 0
          ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining`
          : "Deadline has passed"
        : "Deadline unavailable";
    }

    const sideMetaLabel = document.getElementById("detail-side-meta-label");
    const sideMetaProgress = document.getElementById("detail-side-meta-progress");
    const sideMetaFill = document.getElementById("detail-side-meta-fill");
    const sideMetaText = document.getElementById("detail-side-meta-text");
    if (recommended) {
      if (sideMetaLabel) {
        sideMetaLabel.textContent = "Your Match";
      }
      if (sideMetaProgress) {
        sideMetaProgress.style.display = "block";
      }
      if (sideMetaFill) {
        sideMetaFill.style.width = `${Math.max(0, Math.min(recommended.matchScore ?? 0, 100))}%`;
      }
      if (sideMetaText) {
        sideMetaText.textContent = `${Math.round(recommended.matchScore ?? 0)}% match`;
      }
    } else {
      if (sideMetaLabel) {
        sideMetaLabel.textContent = "Registration Status";
      }
      if (sideMetaProgress) {
        sideMetaProgress.style.display = "none";
      }
      if (sideMetaText) {
        sideMetaText.textContent = existingApplication ? "Already registered" : "Not registered yet";
      }
    }

    if (externalLink) {
      if (detailLink) {
        externalLink.href = detailLink;
        externalLink.style.display = "inline-flex";
        externalLink.removeAttribute("aria-disabled");
        externalLink.onclick = () => trackApplyIntent(scholarship.id, "detail_page");
      } else {
        externalLink.href = "#";
        externalLink.setAttribute("aria-disabled", "true");
        externalLink.onclick = (event) => event.preventDefault();
      }
    }

    if (backLink) {
      backLink.href = "scholarships.html";
    }

    if (saveButton) {
      syncSavedUiState(saveButton, isScholarshipSaved(scholarship.id));
      saveButton.onclick = () => handleSaveToggle(saveButton, scholarship.id, "detail_page");
    }

    if (registerButton) {
      if (existingApplication) {
        setRegistrationButtonState(registerButton, "success", "âœ” Registered");
      } else {
        setRegistrationButtonState(registerButton, "idle");
        registerButton.onclick = async () => {
          setRegistrationButtonState(registerButton, "loading");

          try {
            await markOpportunityRegistered({
              userId: session.userId,
              scholarshipId: scholarship.id
            });
            setRegistrationButtonState(registerButton, "success", "âœ” Registered");
            if (sideMetaLabel) {
              sideMetaLabel.textContent = "Registration Status";
            }
            if (sideMetaProgress) {
              sideMetaProgress.style.display = "none";
            }
            if (sideMetaText) {
              sideMetaText.textContent = "Already registered";
            }
          } catch (error) {
            if (error.status === 409) {
              setRegistrationButtonState(registerButton, "success", "âœ” Registered");
              if (sideMetaLabel) {
                sideMetaLabel.textContent = "Registration Status";
              }
              if (sideMetaProgress) {
                sideMetaProgress.style.display = "none";
              }
              if (sideMetaText) {
                sideMetaText.textContent = "Already registered";
              }
              return;
            }

            alert(error.message || "Failed to mark as registered.");
            setRegistrationButtonState(registerButton, "idle");
          }
        };
      }
    }

    await trackScholarshipInteraction("view", scholarship.id, "detail_page", {
      from: document.referrer || null
    });
  } catch (error) {
    const title = document.getElementById("detail-title") || card.querySelector("h2");
    const description = document.getElementById("detail-description");
    const deadlineAlert = document.getElementById("detail-deadline-alert");
    if (title) {
      title.textContent = error.message || "Failed to load scholarship";
    }
    if (description) {
      description.textContent = "We could not load the selected item details.";
    }
    if (deadlineAlert) {
      deadlineAlert.textContent = "Unable to load details.";
    }
  }
}
async function renderApplyPage() {
  if (document.body.dataset.page !== "apply") {
    return;
  }

  const scholarshipId = new URLSearchParams(window.location.search).get("id");
  if (!scholarshipId) {
    return;
  }

  window.location.replace(`detail.html?id=${encodeURIComponent(scholarshipId)}`);
}
function requireRole() {
  const required = document.body.dataset.auth;

  if (!required) {
    return;
  }

  if (window.ScholarLensAuth) {
    if (!window.ScholarLensAuth.requireRole(required)) {
      return;
    }
    return;
  }

  const session = getSession();

  if (!session.loggedIn) {
    window.location.href = "login.html";
    return;
  }

  if (required !== session.role) {
    window.location.href = session.role === "admin" ? "admin.html" : "dashboard.html";
  }
}

function renderNav() {
  const mount = document.getElementById("site-nav");
  if (!mount) {
    return;
  }

  const session = getSession();
  const page = document.body.dataset.page;
  const homeHref = session.loggedIn ? "dashboard.html" : "index.html";

  if (page === "landing") {
    mount.innerHTML = `
      <nav class="landing-nav">
        <a class="nav-brand landing-brand" href="${homeHref}"><i class="fa-solid fa-graduation-cap"></i> ScholarLens</a>
        <div class="nav-links landing-links">
          <a class="nav-link ${page === "landing" ? "active" : ""}" href="${homeHref}">Home</a>
          ${
            session.loggedIn
              ? `
                <a class="nav-link" href="dashboard.html">Dashboard</a>
                <a class="nav-link" href="profile.html">Profile</a>
                <button class="btn btn-soft btn-sm" type="button" onclick="logout()">Logout</button>
              `
              : `
                <a class="nav-link" href="login.html">Login</a>
                <a class="btn btn-gradient btn-sm" href="signup.html">Sign Up</a>
              `
          }
        </div>
      </nav>
    `;
    return;
  }

  const links = [
    { href: homeHref, label: "Home", key: "landing", public: true },
    { href: "dashboard.html", label: "Dashboard", key: "dashboard", role: "student" },
    { href: "profile.html", label: "Profile", key: "profile", role: "student" },
    { href: "scholarships.html", label: "Scholarships", key: "scholarships", role: "student" },
    { href: "recommendations.html", label: "AI Match", key: "recommendations", role: "student" },
    { href: "notifications.html", label: "Alerts", key: "notifications", role: "student" },
    { href: "admin.html", label: "Admin Panel", key: "admin", role: "admin" }
  ];

  const visibleLinks = links.filter((link) => {
    if (link.public) {
      return true;
    }

    return session.loggedIn && session.role === link.role;
  });

  mount.innerHTML = `
    <nav>
      <a class="nav-brand" href="${homeHref}">ScholarLens</a>
      <div class="nav-links">
        ${visibleLinks
          .map(
            (link) => `
              <a class="nav-link ${page === link.key ? "active" : ""}" href="${link.href}">${link.label}</a>
            `
          )
          .join("")}
        ${
          session.loggedIn
            ? '<button class="btn btn-outline btn-sm" type="button" onclick="logout()">Logout</button>'
            : `
              <a class="nav-link ${page === "login" ? "active" : ""}" href="login.html">Login</a>
              <a class="btn btn-gold btn-sm" href="signup.html">Sign Up</a>
            `
        }
      </div>
    </nav>
  `;
}

function renderSidebar() {
  const mount = document.querySelector("[data-sidebar]");
  if (!mount) {
    return;
  }

  const kind = mount.dataset.sidebar;
  const active = mount.dataset.active;

  if (kind === "student") {
    const user = getCurrentUser();
    const displayName = user?.fullName || "Student User";

    mount.className = "sidebar";
    mount.innerHTML = `
      <div class="sidebar-section">
        <div style="padding: 0 0.75rem; margin-bottom: 1.5rem;">
          <p style="font-family:'DM Mono',monospace; font-size:0.65rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(201,168,76,0.5);">Logged in as</p>
          <p style="color:var(--cream); font-size:0.9rem; margin-top:0.25rem;">${escapeHtml(displayName)}</p>
          <span class="tag" style="margin-top:0.3rem;">Student</span>
        </div>
      </div>
      <div class="sidebar-section">
        <p class="sidebar-label">Main</p>
        ${renderSidebarLink("dashboard", "dashboard.html", "&#127968;", "Dashboard", active)}
        ${renderSidebarLink("profile", "profile.html", "&#128100;", "My Profile", active)}
        ${renderSidebarLink("scholarships", "scholarships.html", "&#128269;", "Browse", active)}
        ${renderSidebarLink("recommendations", "recommendations.html", "&#129302;", "AI Match", active)}
        ${renderSidebarLink("applications", "applications.html", "&#128221;", "Applications", active)}
        ${renderSidebarLink("notifications", "notifications.html", "&#128276;", "Notifications", active)}
      </div>
    `;
  }

  if (kind === "admin") {
    mount.className = "sidebar admin-sidebar";
    mount.innerHTML = `
      <div class="sidebar-section">
        <div style="padding: 0 0.75rem; margin-bottom: 1.5rem;">
          <span class="tag" style="background:rgba(42,107,107,0.25); color:var(--teal-light);">Admin Panel</span>
          <p style="color:var(--cream); font-size:0.9rem; margin-top:0.5rem;">Admin User</p>
        </div>
      </div>
      <div class="sidebar-section">
        <p class="sidebar-label">Administration</p>
        ${renderSidebarLink("admin", "admin.html", "&#127968;", "Dashboard", active)}
        ${renderSidebarLink("admin-scholarships", "admin-scholarships.html", "&#128218;", "Manage Scholarships", active)}
        ${renderSidebarLink("admin-applications", "admin-applications.html", "&#128203;", "Applications", active)}
        ${renderSidebarLink("admin-users", "admin-users.html", "&#128101;", "Users", active)}
        <button class="sidebar-link" type="button" onclick="logout()"><span class="icon">&#128682;</span> Logout</button>
      </div>
    `;
  }
}

function renderSidebarLink(key, href, icon, label, active) {
  return `<a class="sidebar-link ${key === active ? "active" : ""}" href="${href}"><span class="icon">${icon}</span> ${label}</a>`;
}

async function handleLogin() {
  const api = getApi();
  const email = document.getElementById("login-email")?.value.trim() || "";
  const password = document.getElementById("login-pass")?.value || "";

  if (!api) {
    alert("API helper is not loaded.");
    return;
  }

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    const response = await api.loginUser({ email, password });
    const session = {
      loggedIn: true,
      role: response.user.role,
      token: response.token,
      userId: response.user.id,
      user: response.user
    };

    setSession(session);
    window.location.href = response.user.role === "admin" ? "admin.html" : "dashboard.html";
  } catch (error) {
    alert(error.message || "Login failed.");
  }
}

async function handleSignup() {
  const api = getApi();
  const firstName = document.getElementById("signup-first-name")?.value.trim() || "";
  const lastName = document.getElementById("signup-last-name")?.value.trim() || "";
  const email = document.getElementById("signup-email")?.value.trim() || "";
  const password = document.getElementById("signup-password")?.value || "";
  const role = document.querySelector('input[name="role"]:checked')?.value || "student";

  if (!api) {
    alert("API helper is not loaded.");
    return;
  }

  if (!firstName || !lastName || !email || !password) {
    alert("Please complete all signup fields.");
    return;
  }

  try {
    const response = await api.signupUser({
      fullName: `${firstName} ${lastName}`.trim(),
      email,
      password,
      role
    });

    const session = {
      loggedIn: true,
      role: response.user.role,
      token: response.token,
      userId: response.user.id,
      user: response.user
    };

    setSession(session);
    window.location.href = response.user.role === "admin" ? "admin.html" : "dashboard.html";
  } catch (error) {
    alert(error.message || "Signup failed.");
  }
}

function selectRole(role) {
  const student = document.getElementById("role-student");
  const admin = document.getElementById("role-admin");

  if (student) {
    student.style.borderColor = role === "student" ? "var(--gold)" : "#ccc2af";
  }

  if (admin) {
    admin.style.borderColor = role === "admin" ? "var(--gold)" : "#ccc2af";
  }
}

function inferOpportunityType(item) {
  const combined = [item.title, item.description, item.provider, item.category, ...(item.eligibleSkills || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (combined.includes("hackathon") || combined.includes("buildathon")) {
    return "Hackathon";
  }
  if (combined.includes("internship") || combined.includes(" intern ") || combined.includes("intern program")) {
    return "Internship";
  }
  if (combined.includes("fellowship")) {
    return "Fellowship";
  }
  if (combined.includes("workshop") || combined.includes("bootcamp")) {
    return "Workshop/Bootcamp";
  }
  if (combined.includes("competition") || combined.includes("challenge")) {
    return "Competition";
  }
  if (combined.includes("program") || combined.includes("summit") || combined.includes("exchange")) {
    return "Program";
  }
  return "Scholarship";
}

function inferOpportunityLocation(item) {
  const region = String(item.region || "").toLowerCase();
  const combined = [item.title, item.description, item.provider, item.region]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (combined.includes("remote") || combined.includes("virtual") || combined.includes("online")) {
    return "Remote";
  }
  if (combined.includes("abroad") || combined.includes("international") || combined.includes("global") || combined.includes("exchange") || combined.includes("overseas")) {
    return "Abroad";
  }
  if (region.includes("remote")) {
    return "Remote";
  }
  return "India";
}

function inferOpportunityFunding(item, typeLabel) {
  const fundingText = String(item.fundingAmount || item.funding || "").toLowerCase();
  const combined = [item.title, item.description, fundingText]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (combined.includes("fully funded") || combined.includes("full scholarship") || combined.includes("travel support")) {
    return "Fully Funded";
  }
  if (combined.includes("unpaid") || combined.includes("volunteer")) {
    return "Unpaid";
  }
  if (fundingText || combined.includes("stipend") || combined.includes("grant") || combined.includes("award") || typeLabel === "Scholarship") {
    return "Paid";
  }
  return "Unpaid";
}

function inferOpportunityDomain(item) {
  const combined = [item.title, item.description, item.provider, ...(item.eligibleSkills || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (combined.includes("ai") || combined.includes("machine learning") || combined.includes("ml") || combined.includes("nlp") || combined.includes("data science")) {
    return "AI";
  }
  if (combined.includes("cloud") || combined.includes("cyber") || combined.includes("software") || combined.includes("computer") || combined.includes("cse") || combined.includes("javascript") || combined.includes("react") || combined.includes("sql") || combined.includes("python")) {
    return "CSE";
  }
  if (combined.includes("mechanical") || combined.includes("civil") || combined.includes("electrical") || combined.includes("electronics") || combined.includes("manufacturing") || combined.includes("core")) {
    return "Core";
  }
  if (combined.includes("finance") || combined.includes("business") || combined.includes("entrepreneur") || combined.includes("strategy") || combined.includes("product")) {
    return "Business";
  }
  return "Research";
}

function normalizeBrowseOpportunity(item) {
  const normalized = {
    ...normalizeDashboardScholarship(item),
    provider: item.provider || item.org || "ScholarLens Partner",
    funding: item.fundingAmount || item.funding || item.amount || "Funding available",
    eligibleSkills: Array.isArray(item.eligibleSkills) && item.eligibleSkills.length ? item.eligibleSkills : Array.isArray(item.tags) ? item.tags : []
  };
  const typeLabel = inferOpportunityType(normalized);
  const locationLabel = inferOpportunityLocation(normalized);
  const fundingLabel = inferOpportunityFunding(normalized, typeLabel);
  const domainLabel = inferOpportunityDomain(normalized);
  const deadlineDate = parseDashboardDate(normalized.deadline);
  const searchText = [
    normalized.title,
    normalized.description,
    normalized.provider,
    normalized.region,
    typeLabel,
    locationLabel,
    fundingLabel,
    domainLabel,
    ...(normalized.eligibleSkills || [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    ...normalized,
    typeLabel,
    locationLabel,
    fundingLabel,
    domainLabel,
    deadlineDate,
    searchText,
    displayFunding: normalized.funding || normalized.fundingAmount || item.amount || (fundingLabel === "Unpaid" ? "Unpaid" : "Funding available")
  };
}

function createBrowseOpportunityCard(item, session, matchScore = null) {
  const daysLeft = getDaysLeft(item.deadline);
  const score = typeof matchScore === "number" ? matchScore : null;
  const detailHref = `detail.html?id=${encodeURIComponent(item.id)}`;

  return `
    <div class="scholarship-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem; margin-bottom:0.35rem; flex-wrap:wrap;">
        <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">
          <span class="tag tag-teal">${escapeHtml(item.typeLabel)}</span>
          <span class="tag">${escapeHtml(item.domainLabel)}</span>
          <span class="tag">${escapeHtml(item.locationLabel)}</span>
          <span class="tag">${escapeHtml(item.fundingLabel)}</span>
        </div>
      </div>
      <div class="sc-title">${escapeHtml(item.title)}</div>
      <div style="font-size:0.82rem; color:#7a7060;">${escapeHtml(item.provider || item.region || "ScholarLens Partner")}</div>
      <div class="sc-amount">${escapeHtml(item.displayFunding)}</div>
      <div class="sc-meta">
        <span>&#128197; ${escapeHtml(formatDate(item.deadline))}</span>
        ${typeof daysLeft === "number" && daysLeft <= 7 ? `<span class="tag tag-red">${daysLeft}d left</span>` : ""}
        ${session.loggedIn && session.role === "student" && score !== null ? `<span class="tag tag-teal">${score}% match</span>` : ""}
      </div>
      ${session.loggedIn && session.role === "student" && score !== null ? `<div class="progress-bar" style="margin-top:0.25rem;"><div class="progress-fill" style="width:${score}%"></div></div>` : ""}
      <p style="font-size:0.84rem; color:#4a4035; margin-top:0.85rem;">${escapeHtml(item.description)}</p>
      <div class="sc-actions">
        <a class="btn btn-gold btn-sm" href="${detailHref}" style="flex:1;">Apply Now</a>
        <a class="btn btn-outline btn-sm" href="${detailHref}">Details</a>
      </div>
    </div>
  `;
}

function filterBrowseItems(items, filters) {
  const query = filters.query.trim().toLowerCase();

  return items.filter((item) => {
    if (!item.deadlineDate || item.deadlineDate.getTime() < getStartOfToday().getTime()) {
      return false;
    }
    if (query && !item.searchText.includes(query)) {
      return false;
    }
    if (filters.category !== "all" && item.typeLabel !== filters.category) {
      return false;
    }
    if (filters.location !== "all" && item.locationLabel !== filters.location) {
      return false;
    }
    if (filters.funding !== "all" && item.fundingLabel !== filters.funding) {
      return false;
    }
    if (filters.domain !== "all" && item.domainLabel !== filters.domain) {
      return false;
    }
    return true;
  });
}

function sortBrowseItems(items, sortValue) {
  if (sortValue === "latest") {
    return sortByNewest(items);
  }
  return sortByUpcomingDeadline(items);
}

function renderScholarshipCardFromApi(scholarship, session, matchScore = null) {
  return createBrowseOpportunityCard(normalizeBrowseOpportunity(scholarship), session, matchScore);
}

async function renderScholarships() {
  const grid = document.getElementById("scholarship-grid");
  if (!grid) {
    return;
  }

  const summary = document.getElementById("browse-summary");
  const searchInput = document.getElementById("browse-search");
  const categorySelect = document.getElementById("browse-category");
  const locationSelect = document.getElementById("browse-location");
  const fundingSelect = document.getElementById("browse-funding");
  const domainSelect = document.getElementById("browse-domain");
  const deadlineSelect = document.getElementById("browse-deadline");
  const session = getSession();

  function renderFilteredResults(items) {
    const filters = {
      query: searchInput?.value || "",
      category: categorySelect?.value || "all",
      location: locationSelect?.value || "all",
      funding: fundingSelect?.value || "all",
      domain: domainSelect?.value || "all"
    };
    const sortValue = deadlineSelect?.value || "nearest";
    const visibleItems = sortBrowseItems(filterBrowseItems(items, filters), sortValue);

    grid.innerHTML = visibleItems.length
      ? visibleItems.map((item) => createBrowseOpportunityCard(item, session)).join("")
      : '<div class="card browse-empty-state" style="grid-column:1/-1;">No active opportunities match your current filters.</div>';

    if (summary) {
      summary.textContent = visibleItems.length
        ? `${visibleItems.length} active opportunities found.`
        : "No active opportunities match your search right now.";
    }
  }

  function bindFilterEvents(items) {
    [searchInput, categorySelect, locationSelect, fundingSelect, domainSelect, deadlineSelect]
      .filter(Boolean)
      .forEach((element) => {
        const eventName = element.tagName === "INPUT" ? "input" : "change";
        element.addEventListener(eventName, () => renderFilteredResults(items));
      });
  }

  try {
    const api = getApi();
    const sourceItems = api ? (await api.fetchScholarships()).data : scholarships;
    const normalizedItems = sourceItems.map(normalizeBrowseOpportunity).filter(Boolean);
    renderFilteredResults(normalizedItems);
    bindFilterEvents(normalizedItems);
    return;
  } catch (error) {
    alert(error.message || "Failed to load scholarships.");
  }

  const fallbackItems = scholarships.map(normalizeBrowseOpportunity).filter(Boolean);
  renderFilteredResults(fallbackItems);
  bindFilterEvents(fallbackItems);
}

async function renderAI() {
  const container = document.getElementById("ai-results");
  if (!container) {
    return;
  }

  const session = getSession();
  const api = getApi();

  if (api && session.userId) {
    try {
      const [recommendationResponse, notificationResponse] = await Promise.all([
        api.fetchRecommendations(session.userId),
        api.fetchNotifications(session.userId).catch(() => ({ data: [] }))
      ]);
      const summary = document.getElementById("recommendations-summary");
      const user = getCurrentUser();

      if (summary) {
        const profileBits = [
          user?.degree,
          user?.region,
          user?.skills?.length ? `${user.skills.length} skill tags` : null,
          notificationResponse.data?.length ? `${notificationResponse.data.length} new alerts` : null
        ].filter(Boolean);
        summary.textContent = profileBits.length
          ? `Matched based on your profile: ${profileBits.join(" | ")}`
          : "Matched based on your profile.";
      }

      container.innerHTML = recommendationResponse.data.length
        ? recommendationResponse.data
            .map(
              (scholarship, index) => `
                <div class="ai-result-card">
                  <div style="text-align:center; flex-shrink:0;">
                    <div style="font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:900; color:${scholarship.matchScore >= 85 ? "var(--teal)" : scholarship.matchScore >= 75 ? "var(--gold)" : "#999"};">${scholarship.matchScore}%</div>
                    <div style="font-family:'DM Mono',monospace; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; color:#aaa;">match</div>
                  </div>
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
                      <strong style="font-family:'Playfair Display',serif;">${escapeHtml(scholarship.title)}</strong>
                      ${index === 0 ? '<span class="tag tag-green">Top Pick</span>' : ""}
                    </div>
                    <p style="font-size:0.82rem; color:#7a7060; margin-bottom:0.5rem;">${escapeHtml((scholarship.provider || scholarship.region || "ScholarLens Partner"))} &middot; ${escapeHtml(scholarship.fundingAmount || "Funding available")}</p>
                    <div class="progress-bar" style="margin-bottom:0.5rem;"><div class="progress-fill" style="width:${scholarship.matchScore}%"></div></div>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                      ${(scholarship.eligibleSkills || []).slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
                      <span class="tag tag-red">Deadline: ${escapeHtml(formatDate(scholarship.deadline))}</span>
                    </div>
                    ${renderEnsembleBreakdown(scholarship)}
                  </div>
                  <div>
                    <a class="btn btn-gold btn-sm" href="detail.html?id=${encodeURIComponent(scholarship.id)}" onclick="trackRecommendationIntent('${escapeHtml(scholarship.id)}', 'recommendations_page')">Apply</a>
                  </div>
                </div>
              `
            )
            .join("")
        : '<div class="card">No recommendations yet. Complete your profile to improve matching.</div>';
      return;
    } catch (error) {
      alert(error.message || "Failed to load recommendations.");
    }
  }

  const sorted = [...scholarships].sort((a, b) => b.match - a.match);
  container.innerHTML = sorted
    .map(
      (scholarship, index) => `
        <div class="ai-result-card">
          <div style="text-align:center; flex-shrink:0;">
            <div style="font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:900; color:${scholarship.match >= 85 ? "var(--teal)" : scholarship.match >= 75 ? "var(--gold)" : "#999"};">${scholarship.match}%</div>
            <div style="font-family:'DM Mono',monospace; font-size:0.62rem; letter-spacing:0.1em; text-transform:uppercase; color:#aaa;">match</div>
          </div>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
              <strong style="font-family:'Playfair Display',serif;">${scholarship.title}</strong>
              ${index === 0 ? '<span class="tag tag-green">Top Pick</span>' : ""}
            </div>
            <p style="font-size:0.82rem; color:#7a7060; margin-bottom:0.5rem;">${scholarship.org} &middot; ${scholarship.amount}</p>
            <div class="progress-bar" style="margin-bottom:0.5rem;"><div class="progress-fill" style="width:${scholarship.match}%"></div></div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              ${scholarship.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
              <span class="tag tag-red">Deadline: ${scholarship.deadline}</span>
            </div>
            ${renderEnsembleBreakdown(scholarship)}
          </div>
          <div>
            <a class="btn btn-gold btn-sm" href="detail.html?id=${scholarship.id}" onclick="trackRecommendationIntent('${scholarship.id}', 'recommendations_fallback')">Apply</a>
          </div>
        </div>
      `
    )
    .join("");
}

function createScholarshipCard(s) {
  const badgeClass = s.badge === "Deadline Soon" ? "tag tag-red" : "tag tag-green";
  return `
    <article class="scholarship-card portal-card">
      <div class="card-topline">
        <span class="${badgeClass}">${s.badge}</span>
      </div>
      <h3 class="sc-title">${s.title}</h3>
      <p class="portal-copy">${s.description}</p>
      <div class="portal-meta">
        <span><i class="fa-regular fa-calendar"></i> ${s.deadline}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${s.region}</span>
        <span><i class="fa-solid fa-wallet"></i> ${s.funding}</span>
      </div>
      <div class="sc-actions">
        <a class="btn btn-gradient btn-sm" href="detail.html">View Details</a>
      </div>
    </article>
  `;
}

function createOpportunityCard(o) {
  return `
    <article class="scholarship-card portal-card">
      <div class="card-topline">
        <span class="tag tag-teal">Opportunity</span>
      </div>
      <h3 class="sc-title">${o.title}</h3>
      <p class="portal-copy">${o.description}</p>
      <div class="portal-meta">
        <span><i class="fa-regular fa-calendar"></i> ${o.deadline}</span>
        <span><i class="fa-solid fa-building"></i> ${o.organizer}</span>
        <span><i class="fa-solid fa-gift"></i> ${o.benefit}</span>
      </div>
      <div class="sc-actions">
        <a class="btn btn-gradient btn-sm" href="detail.html">View Details</a>
      </div>
    </article>
  `;
}

function wrapScholarshipGridCard(cardMarkup) {
  return `<div class="col-md-6 col-lg-4 d-flex">${cardMarkup}</div>`;
}

function parseDashboardDate(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  const directDate = new Date(value);
  if (!Number.isNaN(directDate.getTime())) {
    return directDate;
  }

  const normalizedValue = String(value).trim();
  const match = normalizedValue.match(/^(\d{1,2})[\s\/-]([A-Za-z]{3,9})[\s\/-](\d{4})$/);
  if (!match) {
    return null;
  }

  const [, dayText, monthText, yearText] = match;
  const monthLookup = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11
  };
  const monthIndex = monthLookup[monthText.toLowerCase()];

  if (typeof monthIndex !== 'number') {
    return null;
  }

  const parsedDate = new Date(Number(yearText), monthIndex, Number(dayText));
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function getDashboardTimestamp(value) {
  return parseDashboardDate(value)?.getTime() ?? Number.NEGATIVE_INFINITY;
}

function getStartOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function isDashboardScholarship(item) {
  if (!item) {
    return false;
  }

  const category = String(item.category || '').trim().toLowerCase();
  const title = String(item.title || '').trim();
  const deadline = parseDashboardDate(item.deadline);

  if (category === 'scholarship' || category === 'scholarships') {
    return true;
  }

  return Boolean(item.id && title && deadline);
}

function normalizeDashboardScholarship(item) {
  if (!item) {
    return null;
  }

  return {
    id: item.id,
    title: item.title || "Scholarship Opportunity",
    description: item.description || "Explore this opportunity to learn more about the eligibility and funding details.",
    deadline: item.deadline,
    region: item.region || "Open region",
    funding: item.fundingAmount || "Funding available",
    provider: item.provider || "ScholarLens Partner",
    category: item.category || "Scholarships",
    createdAt: item.createdAt,
    degree: item.degree || null,
    eligibleSkills: Array.isArray(item.eligibleSkills) ? item.eligibleSkills : []
  };
}

function createDashboardScholarshipCard(item, badgeLabel) {
  const scholarship = normalizeDashboardScholarship(item);
  const badgeClass = badgeLabel === "Deadline Soon" ? "tag tag-red" : "tag tag-green";
  const detailHref = `detail.html?id=${encodeURIComponent(scholarship.id)}`;

  return `
    <article class="scholarship-card portal-card" style="height:100%;">
      <div class="card-topline">
        <span class="${badgeClass}">${escapeHtml(badgeLabel)}</span>
      </div>
      <h3 class="sc-title">${escapeHtml(scholarship.title)}</h3>
      <p class="portal-copy">${escapeHtml(scholarship.description)}</p>
      <div class="portal-meta">
        <span><i class="fa-regular fa-calendar"></i> ${escapeHtml(formatDate(scholarship.deadline))}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(scholarship.region)}</span>
        <span><i class="fa-solid fa-wallet"></i> ${escapeHtml(scholarship.funding)}</span>
      </div>
      <div style="font-size:0.82rem; color:#7a7060; margin-top:0.25rem;">${escapeHtml(scholarship.provider)}</div>
      <div class="sc-actions">
        <a class="btn btn-gradient btn-sm" href="${detailHref}" onclick="trackDetailIntent('${escapeHtml(scholarship.id)}', 'dashboard_${badgeLabel.toLowerCase().replaceAll(" ", "_")}')">View Details</a>
      </div>
    </article>
  `;
}

function createDashboardOpportunityCard(item, rowId) {
  const opportunity = normalizeDashboardScholarship(item);
  const detailHref = `detail.html?id=${encodeURIComponent(opportunity.id)}`;
  const benefit = opportunity.funding || opportunity.category || "Opportunity";
  const organizer = opportunity.provider || opportunity.region || "ScholarLens Partner";

  return `
    <article class="scholarship-card portal-card">
      <div class="card-topline">
        <span class="tag tag-teal">Opportunity</span>
      </div>
      <h3 class="sc-title">${escapeHtml(opportunity.title)}</h3>
      <p class="portal-copy">${escapeHtml(opportunity.description)}</p>
      <div class="portal-meta">
        <span><i class="fa-regular fa-calendar"></i> ${escapeHtml(formatDate(opportunity.deadline))}</span>
        <span><i class="fa-solid fa-building"></i> ${escapeHtml(organizer)}</span>
        <span><i class="fa-solid fa-gift"></i> ${escapeHtml(benefit)}</span>
      </div>
      <div class="sc-actions">
        <a class="btn btn-gradient btn-sm" href="${detailHref}" onclick="trackDetailIntent('${escapeHtml(opportunity.id)}', '${escapeHtml(rowId)}')">View Details</a>
      </div>
    </article>
  `;
}

function sortByNewest(items) {
  return [...items].sort((left, right) => {
    const leftTime = getDashboardTimestamp(left.createdAt) || getDashboardTimestamp(left.deadline);
    const rightTime = getDashboardTimestamp(right.createdAt) || getDashboardTimestamp(right.deadline);
    return rightTime - leftTime;
  });
}

function sortByUpcomingDeadline(items) {
  return [...items].sort((left, right) => {
    const leftTime = getDashboardTimestamp(left.deadline);
    const rightTime = getDashboardTimestamp(right.deadline);
    return leftTime - rightTime;
  });
}

function isFutureDeadline(item) {
  const deadline = parseDashboardDate(item.deadline);
  return Boolean(deadline) && deadline.getTime() >= getStartOfToday().getTime();
}

function classifyOpportunityRow(item) {
  const title = String(item.title || "").toLowerCase();
  const description = String(item.description || "").toLowerCase();
  const provider = String(item.provider || "").toLowerCase();
  const region = String(item.region || "").toLowerCase();
  const category = String(item.category || "").toLowerCase();
  const combined = [title, description, provider, region, category, ...(item.eligibleSkills || [])]
    .join(" ")
    .toLowerCase();

  if (combined.includes("hackathon") || combined.includes("buildathon")) {
    return "hackathons-row";
  }
  if (combined.includes("government") || combined.includes("ministry") || combined.includes("scheme") || combined.includes("department")) {
    return "govt-row";
  }
  if (category.includes("internship") || combined.includes("internship")) {
    return "internships-row";
  }
  if (category.includes("fellowship") || combined.includes("fellowship") || combined.includes("program")) {
    return "fellowships-row";
  }
  if (combined.includes("workshop") || combined.includes("bootcamp") || combined.includes("camp")) {
    return "workshops-row";
  }
  if (combined.includes("international") || combined.includes("global") || combined.includes("exchange") || combined.includes("abroad") || combined.includes("un ")) {
    return "international-row";
  }
  return null;
}

function renderDashboardOpportunitySections(items) {
  const rowIds = [
    "hackathons-row",
    "govt-row",
    "internships-row",
    "fellowships-row",
    "workshops-row",
    "international-row"
  ];
  const grouped = Object.fromEntries(rowIds.map((id) => [id, []]));

  items.forEach((item) => {
    const rowId = classifyOpportunityRow(item);
    if (rowId) {
      grouped[rowId].push(item);
    }
  });

  rowIds.forEach((rowId) => {
    const mount = document.getElementById(rowId);
    if (!mount) {
      return;
    }

    const rowItems = sortByUpcomingDeadline(grouped[rowId]).slice(0, 6);
    mount.innerHTML = rowItems.length
      ? rowItems.map((item) => createDashboardOpportunityCard(item, rowId)).join("")
      : '<div class="card browse-empty-state">No opportunities available in this category yet.</div>';
  });
}

function renderDashboardScholarshipSections(items) {
  const latestMount = document.getElementById("latest-scholarships");
  const deadlineMount = document.getElementById("deadline-scholarships");
  const scholarshipItems = items.filter(isDashboardScholarship);
  const latestItems = sortByNewest(scholarshipItems).slice(0, 6);
  const deadlineItems = sortByUpcomingDeadline(scholarshipItems.filter(isFutureDeadline)).slice(0, 6);

  if (latestMount) {
    latestMount.innerHTML = latestItems.length
      ? latestItems.map((item) => wrapScholarshipGridCard(createDashboardScholarshipCard(item, "Latest"))).join("")
      : '<div class="col-12"><div class="card browse-empty-state">No scholarships available yet.</div></div>';
  }

  if (deadlineMount) {
    deadlineMount.innerHTML = deadlineItems.length
      ? deadlineItems
          .map((item) => wrapScholarshipGridCard(createDashboardScholarshipCard(item, "Deadline Soon")))
          .join("")
      : '<div class="col-12"><div class="card browse-empty-state">No upcoming scholarship deadlines right now.</div></div>';
  }
}
function renderLandingShowcase() {
  if (document.body.dataset.page === "dashboard") {
    return;
  }
  const latestMount = document.getElementById("latest-scholarships");
  const deadlineMount = document.getElementById("deadline-scholarships");

  if (latestMount) {
    latestMount.innerHTML = landingScholarships
      .filter((item) => item.type === "latest")
      .map((item) => wrapScholarshipGridCard(createScholarshipCard(item)))
      .join("");
  }

  if (deadlineMount) {
    deadlineMount.innerHTML = landingScholarships
      .filter((item) => item.type === "deadline")
      .map((item) => wrapScholarshipGridCard(createScholarshipCard(item)))
      .join("");
  }

  const categoryMap = {
    "hackathons-row": opportunities.hackathons,
    "govt-row": opportunities.governmentSchemes,
    "internships-row": opportunities.internships,
    "fellowships-row": opportunities.fellowshipsPrograms,
    "workshops-row": opportunities.workshopsBootcamps,
    "international-row": opportunities.internationalOpportunities
  };

  Object.entries(categoryMap).forEach(([id, items]) => {
    const mount = document.getElementById(id);
    if (!mount) {
      return;
    }

    mount.innerHTML = items.map(createOpportunityCard).join("");
  });
}

function bindChatWidget() {
  const widget = document.getElementById("chat-widget");
  const toggle = document.getElementById("chat-toggle");
  const close = document.getElementById("chat-close");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  if (!widget || !toggle || !close || !form || !input || !messages) {
    return;
  }

  const setOpen = (open) => {
    widget.classList.toggle("open", open);
    widget.setAttribute("aria-hidden", String(!open));
  };

  toggle.addEventListener("click", () => {
    const willOpen = !widget.classList.contains("open");
    setOpen(willOpen);
    if (willOpen) {
      input.focus();
    }
  });

  close.addEventListener("click", () => setOpen(false));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
      return;
    }

    messages.insertAdjacentHTML("beforeend", `<div class="chat-message user">${value}</div>`);
    messages.insertAdjacentHTML(
      "beforeend",
      '<div class="chat-message bot">I can help you explore scholarships, internships, hackathons, and deadlines. Try asking about your field, region, or funding goals.</div>'
    );
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  });
}

async function runAI(button) {
  if (!button) {
    return;
  }

  button.textContent = "Matching...";
  button.disabled = true;

  try {
    await renderAI();
  } finally {
    button.textContent = "Refresh Recommendations";
    button.disabled = false;
  }
}

function toggleAdminForm() {
  const form = document.getElementById("admin-add-form");
  if (form) {
    form.style.display = form.style.display === "none" ? "block" : "none";
  }
}

function handleFiles(input) {
  const list = document.getElementById("file-list");
  if (!list || !input?.files) {
    return;
  }

  Array.from(input.files).forEach((file) => {
    const tag = document.createElement("span");
    tag.className = "tag tag-teal";
    tag.textContent = `Attachment ${file.name}`;
    list.appendChild(tag);
  });
}

function bindUploadZone() {
  const zone = document.getElementById("upload-zone");
  if (!zone) {
    return;
  }

  zone.addEventListener("dragover", (event) => {
    event.preventDefault();
    zone.style.borderColor = "var(--gold)";
  });

  zone.addEventListener("dragleave", () => {
    zone.style.borderColor = "#ccc2af";
  });

  zone.addEventListener("drop", (event) => {
    event.preventDefault();
    zone.style.borderColor = "#ccc2af";
    const list = document.getElementById("file-list");
    if (!list) {
      return;
    }

    Array.from(event.dataTransfer.files).forEach((file) => {
      const tag = document.createElement("span");
      tag.className = "tag tag-teal";
      tag.textContent = `Attachment ${file.name}`;
      list.appendChild(tag);
    });
  });
}

async function submitApp(button) {
  if (!button) {
    return;
  }

  const api = getApi();
  const session = getSession();
  const scholarshipId = new URLSearchParams(window.location.search).get("id");
  const statement = document.getElementById("application-statement")?.value.trim() || "";

  if (!api) {
    alert("API helper is not loaded.");
    return;
  }

  if (!session.userId) {
    alert("Please login before applying.");
    window.location.href = "login.html";
    return;
  }

  if (!scholarshipId) {
    alert("Scholarship ID is missing.");
    return;
  }

  button.textContent = "Submitting...";
  button.disabled = true;

  try {
    await api.applyForScholarship({
      userId: session.userId,
      scholarshipId,
      statement
    });
    alert("Application submitted successfully. You can track it in My Applications.");
    window.location.href = "applications.html";
  } catch (error) {
    alert(error.message || "Failed to submit application.");
    button.textContent = "Submit Application";
    button.disabled = false;
  }
}

async function renderDashboardData() {
  const session = getSession();
  const api = getApi();

  if (!api || !session.userId || document.body.dataset.page !== "dashboard") {
    return;
  }

  try {
    const [scholarshipResponse, applicationResponse, notificationResponse, recommendationResponse] = await Promise.all([
      api.fetchScholarships(),
      api.fetchUserApplications(session.userId),
      api.fetchNotifications(session.userId),
      api.fetchRecommendations(session.userId).catch(() => ({ data: [] }))
    ]);

    const user = getCurrentUser();
    const scholarshipsData = scholarshipResponse.data || [];
    const dashboardItems = scholarshipsData.map(normalizeDashboardScholarship).filter(Boolean);
    const applications = applicationResponse.data || [];
    const notifications = notificationResponse.data || [];
    const recommendations = recommendationResponse.data || [];

    const welcome = document.getElementById("dashboard-welcome");
    const summary = document.getElementById("dashboard-summary");
    const notificationSummary = document.getElementById("dashboard-notification-summary");
    const applicationsMount = document.getElementById("dashboard-applications");

    if (welcome) {
      welcome.textContent = `Welcome back, ${user?.fullName || "Scholar"}`;
    }

    if (summary) {
      summary.textContent = `You have ${applications.length} applications and ${notifications.length} notifications right now.`;
    }

    if (notificationSummary) {
      notificationSummary.innerHTML = notifications.length
        ? `<strong>${notifications[0].title || "Latest update"}</strong> ${escapeHtml(notifications[0].message)}`
        : '<strong>You are all caught up.</strong> New scholarship updates and application alerts will appear here.';
    }

    const totalScholarships = document.getElementById("dashboard-total-scholarships");
    const appliedCount = document.getElementById("dashboard-applied-count");
    const notificationCount = document.getElementById("dashboard-notification-count");
    const topMatch = document.getElementById("dashboard-top-match");

    if (totalScholarships) {
      totalScholarships.textContent = String(scholarshipsData.length);
    }
    if (appliedCount) {
      appliedCount.textContent = String(applications.length);
    }
    if (notificationCount) {
      notificationCount.textContent = String(notifications.length);
    }
    if (topMatch) {
      topMatch.textContent = `${recommendations[0]?.matchScore || 0}%`;
    }

    if (applicationsMount) {
      applicationsMount.innerHTML = applications.length
        ? applications
            .slice(0, 3)
            .map(
              (application) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:#faf7f1; border-radius:4px;">
                  <div>
                    <p style="font-size:0.88rem; font-weight:600;">${escapeHtml(application.scholarshipTitle || "Scholarship Application")}</p>
                    <p style="font-size:0.78rem; color:#7a7060;">Applied on ${escapeHtml(formatDate(application.submittedAt))}</p>
                  </div>
                  <span class="status ${getStatusClass(application.status)} mono" style="font-size:0.75rem;">${escapeHtml(application.status)}</span>
                </div>
              `
            )
            .join("")
        : '<div style="padding:0.75rem; background:#faf7f1; border-radius:4px;">No applications yet. Browse scholarships to get started.</div>';
    }

    renderDashboardScholarshipSections(dashboardItems);
    renderDashboardOpportunitySections(dashboardItems);
  } catch (error) {
    alert(error.message || "Failed to load dashboard data.");
  }
}

async function renderNotificationsPage() {
  const session = getSession();
  const api = getApi();
  const list = document.getElementById("notifications-list");

  if (!api || !session.userId || !list) {
    return;
  }

  try {
    const response = await api.fetchNotifications(session.userId);
    const notifications = response.data || [];

    list.innerHTML = notifications.length
      ? notifications
          .map(
            (notification) => `
              <div class="notif-item ${notification.isRead ? "" : "unread"}">
                <div class="notif-dot ${notification.isRead ? "read" : ""}"></div>
                <div>
                  <p style="font-size:0.9rem; font-weight:${notification.isRead ? "500" : "600"}; color:${notification.isRead ? "#7a7060" : "var(--ink)"};">${escapeHtml(notification.title || "Notification")}</p>
                  <p style="font-size:0.82rem; color:${notification.isRead ? "#aaa" : "#7a7060"}; margin-top:0.2rem;">${escapeHtml(notification.message)}</p>
                  <p class="mono" style="font-size:0.68rem; color:${notification.isRead ? "#ccc" : "#aaa"}; margin-top:0.4rem;">${escapeHtml(formatDate(notification.createdAt))}</p>
                </div>
              </div>
            `
          )
          .join("")
      : '<div class="notif-item"><div class="notif-dot read"></div><div><p style="font-size:0.9rem; font-weight:500; color:#7a7060;">No notifications yet</p></div></div>';
  } catch (error) {
    alert(error.message || "Failed to load notifications.");
  }
}

async function renderApplicationsPage() {
  const session = getSession();
  const api = getApi();
  const tbody = document.getElementById("applications-table-body");

  if (!api || !session.userId || !tbody) {
    return;
  }

  try {
    const response = await api.fetchUserApplications(session.userId);
    const applications = response.data || [];

    tbody.innerHTML = applications.length
      ? applications
          .map(
            (application) => `
              <tr>
                <td><strong>${escapeHtml(application.scholarshipTitle || "Scholarship Application")}</strong><br><span style="font-size:0.78rem;color:#7a7060;">Deadline ${escapeHtml(formatDate(application.deadline))}</span></td>
                <td class="mono">Funding</td>
                <td class="mono" style="font-size:0.82rem;">${escapeHtml(formatDate(application.submittedAt))}</td>
                <td><span class="status ${getStatusClass(application.status)} mono" style="font-size:0.78rem;">${escapeHtml(application.status)}</span></td>
                <td><a class="btn btn-sm btn-outline" href="detail.html">View</a></td>
              </tr>
            `
          )
          .join("")
      : '<tr><td colspan="5" style="padding:1rem;">No applications yet.</td></tr>';
  } catch (error) {
    alert(error.message || "Failed to load applications.");
  }
}

async function renderAdminDashboard() {
  const api = getApi();
  const page = document.body.dataset.page;
  const activityFeed =
    document.getElementById("admin-activity-feed") ||
    document.querySelectorAll("body[data-page='admin'] .card > div[style*='font-size:0.85rem']")[0];
  const statCards = document.querySelectorAll(".stat-card .stat-num");
  const summary = document.querySelector("body[data-page='admin'] .text-muted");

  if (!api || page !== "admin" || window.location.pathname.endsWith("admin-users.html")) {
    return;
  }

  try {
    const [statsResponse, usersResponse] = await Promise.all([
      api.fetchAdminStats(),
      api.fetchAdminUsers()
    ]);

    const stats = statsResponse.data || {};
    const users = usersResponse.data || [];

    if (statCards[0]) {
      statCards[0].textContent = formatCompactNumber(stats.totalScholarships);
    }
    if (statCards[1]) {
      statCards[1].textContent = formatCompactNumber(stats.totalUsers);
    }
    if (statCards[2]) {
      statCards[2].textContent = formatCompactNumber(stats.totalApplications);
    }
    if (statCards[3]) {
      statCards[3].textContent = formatCompactNumber(stats.approvedApplications);
    }
    if (summary) {
      summary.textContent = "Live platform overview from your ScholarLens database.";
    }

    if (activityFeed) {
      const recentUsers = users.slice(0, 3);
      activityFeed.innerHTML = recentUsers.length
        ? recentUsers
            .map(
              (user, index) => `
                <div style="display:flex; gap:0.75rem; align-items:flex-start;">
                  <span style="background:${index === 0 ? "rgba(39,174,96,0.1)" : index === 1 ? "rgba(201,168,76,0.12)" : "rgba(52,152,219,0.1)"}; color:${index === 0 ? "#27ae60" : index === 1 ? "var(--gold)" : "#3498db"}; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:0.8rem;">${index === 0 ? "U" : index === 1 ? "+" : "#"}</span>
                  <div>
                    <p style="font-weight:600;">${escapeHtml(user.fullName || "Student joined")}</p>
                    <p style="color:#7a7060; font-size:0.78rem;">${escapeHtml(user.degree || "Degree not set")} | ${escapeHtml(user.region || "Region not set")} | Joined ${escapeHtml(formatDate(user.createdAt))}</p>
                  </div>
                </div>
              `
            )
            .join("")
        : '<div style="color:#7a7060;">No user activity yet.</div>';
    }
  } catch (error) {
    if (activityFeed) {
      activityFeed.innerHTML = `<div style="color:var(--red);">${escapeHtml(error.message || "Failed to load admin dashboard.")}</div>`;
    }
  }
}

async function renderAdminUsersPage() {
  const api = getApi();
  const table = document.querySelector("body[data-page='admin'] table");
  const heading = document.querySelector("body[data-page='admin'] h2");

  if (!api || !window.location.pathname.endsWith("admin-users.html") || !table) {
    return;
  }

  const tbody = table.querySelector("tbody");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = '<tr><td colspan="6" style="padding:1rem;">Loading users...</td></tr>';

  try {
    const response = await api.fetchAdminUsers();
    const users = response.data || [];

    if (heading) {
      heading.textContent = `Manage Users (${users.length})`;
    }

    tbody.innerHTML = users.length
      ? users
          .map(
            (user) => `
              <tr>
                <td><strong>${escapeHtml(user.fullName || "Student")}</strong></td>
                <td class="mono" style="font-size:0.82rem;">${escapeHtml(user.email)}</td>
                <td>${escapeHtml([user.degree, user.specialisation].filter(Boolean).join(" ") || "Not set")}</td>
                <td>${user.gpa ?? "N/A"}</td>
                <td>${escapeHtml(String(user.applicationCount || 0))}</td>
                <td class="mono" style="font-size:0.82rem;">${escapeHtml(formatDate(user.createdAt))}</td>
              </tr>
            `
          )
          .join("")
      : '<tr><td colspan="6" style="padding:1rem;">No users found.</td></tr>';
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="6" style="padding:1rem; color:var(--red);">${escapeHtml(error.message || "Failed to load users.")}</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  requireRole();
  renderNav();
  renderSidebar();
  renderScholarships();
  renderAI();
  renderDetailPage();
  renderApplyPage();
  renderDashboardData();
  renderAdminDashboard();
  renderAdminUsersPage();
  renderNotificationsPage();
  renderApplicationsPage();
  renderLandingShowcase();
  bindChatWidget();
  bindUploadZone();
});

window.renderNav = renderNav;
window.renderSidebar = renderSidebar;
window.handleSaveToggle = handleSaveToggle;
window.trackApplyIntent = trackApplyIntent;
window.trackDetailIntent = trackDetailIntent;
window.trackRecommendationIntent = trackRecommendationIntent;
