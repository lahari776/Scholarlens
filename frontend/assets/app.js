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

  element.classList.toggle("saved");
  const wasSaved = element.classList.contains("saved");
  trackScholarshipInteraction(wasSaved ? "save" : "view", scholarshipId, source, {
    toggleSaved: wasSaved
  });
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
  const response = await fetch(`http://localhost:5000/api/scholarships/${encodeURIComponent(scholarshipId)}`, {
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
  const sideCards = document.querySelectorAll(".two-column-page > div:last-child .card, .two-column-page > div:last-child .stat-card");
  const backLink = document.querySelector('.container.section-sm > a.btn');
  const applyLink = document.querySelector('.two-column-page > div:last-child a.btn.btn-gold');
  const saveButton = document.querySelector('.two-column-page > div:last-child button.btn');

  if (!card || !sideCards.length) {
    return;
  }

  try {
    const recommendationPromise = session.userId && getApi()
      ? getApi().fetchRecommendations(session.userId).catch(() => ({ data: [] }))
      : Promise.resolve({ data: [] });

    const [scholarshipResponse, recommendationResponse] = await Promise.all([
      fetchScholarshipDetail(scholarshipId),
      recommendationPromise
    ]);

    const scholarship = scholarshipResponse.data;
    const recommended = (recommendationResponse.data || []).find((item) => item.id === scholarship.id) || null;
    const daysLeft = getDaysLeft(scholarship.deadline);

    document.title = `${scholarship.title} - ScholarLens`;

    const headerTag = card.querySelector(".tag");
    if (headerTag) {
      headerTag.textContent = scholarship.category || scholarship.degree || "Scholarship";
    }

    const title = card.querySelector("h2");
    if (title) {
      title.textContent = scholarship.title;
    }

    const provider = card.querySelector("p.text-muted");
    if (provider) {
      provider.textContent = `Offered by - ${scholarship.provider || scholarship.region || "ScholarLens Partner"}`;
    }

    const aboutHeading = Array.from(card.querySelectorAll("h3")).find((node) => node.textContent.includes("About"));
    if (aboutHeading?.nextElementSibling) {
      aboutHeading.nextElementSibling.textContent = scholarship.description || "No detailed description available.";
    }

    const eligibilityHeading = Array.from(card.querySelectorAll("h3")).find((node) => node.textContent.includes("Eligibility"));
    if (eligibilityHeading?.nextElementSibling) {
      const items = buildDetailEligibility(scholarship);
      eligibilityHeading.nextElementSibling.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }

    const lastHeading = card.querySelectorAll("h3")[2];
    if (lastHeading) {
      lastHeading.textContent = "Recommendation Signals";
    }

    if (lastHeading?.nextElementSibling) {
      const reasons = recommended?.reasons?.length ? recommended.reasons : ["Profile and scholarship signals"];
      lastHeading.nextElementSibling.innerHTML = reasons.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }

    const amountCard = sideCards[0];
    const amountValue = amountCard?.querySelector(".stat-num");
    if (amountValue) {
      amountValue.textContent = scholarship.fundingAmount || "Funding available";
    }

    const deadlineCard = sideCards[1];
    const deadlineValue = deadlineCard?.querySelector("p:not(.label)");
    const deadlineAlert = deadlineCard?.querySelector(".alert");
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

    const matchCard = sideCards[2];
    const matchBar = matchCard?.querySelector(".progress-fill");
    const matchText = matchCard?.querySelector("p:not(.label)");
    const matchScore = recommended?.matchScore ?? 0;
    if (matchBar) {
      matchBar.style.width = `${Math.max(0, Math.min(matchScore, 100))}%`;
    }
    if (matchText) {
      matchText.textContent = recommended ? `${Math.round(matchScore)}% match` : "Refresh recommendations to see your match";
    }

    if (applyLink) {
      applyLink.href = `apply.html?id=${encodeURIComponent(scholarship.id)}`;
      applyLink.onclick = () => trackApplyIntent(scholarship.id, "detail_page");
    }

    if (backLink) {
      backLink.href = "scholarships.html";
    }

    if (saveButton) {
      saveButton.onclick = () => handleSaveToggle(saveButton, scholarship.id, "detail_page");
    }

    await trackScholarshipInteraction("view", scholarship.id, "detail_page", {
      from: document.referrer || null
    });
  } catch (error) {
    const title = card.querySelector("h2");
    if (title) {
      title.textContent = error.message || "Failed to load scholarship";
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

  const api = getApi();
  const session = getSession();
  const backLink = document.querySelector('.container.section-sm > a.btn');
  const cancelLink = document.querySelector('#apply-cancel-link') || document.querySelector('.card a.btn.btn-outline');
  const title = document.querySelector('.container.section-sm h2');
  const successAlert = document.querySelector('.card .alert.alert-success');
  const textInputs = document.querySelectorAll('.card input.form-input');
  const statementField = document.getElementById('application-statement');

  if (backLink) {
    backLink.href = `detail.html?id=${encodeURIComponent(scholarshipId)}`;
  }
  if (cancelLink) {
    cancelLink.href = `detail.html?id=${encodeURIComponent(scholarshipId)}`;
  }

  try {
    const scholarshipPromise = fetchScholarshipDetail(scholarshipId);
    const profilePromise = api?.fetchProfile ? api.fetchProfile().catch(() => null) : Promise.resolve(null);
    const [response, profileResponse] = await Promise.all([scholarshipPromise, profilePromise]);
    const scholarship = response.data;
    const profile = profileResponse?.data || session.user || null;

    if (title) {
      title.textContent = `Apply for ${scholarship.title}`;
    }
    document.title = `Apply - ${scholarship.title}`;

    if (textInputs[0]) {
      textInputs[0].value = profile?.fullName || profile?.name || textInputs[0].value;
    }

    if (textInputs[1]) {
      textInputs[1].value = profile?.email || textInputs[1].value;
    }

    if (textInputs[2] && !textInputs[2].value.trim()) {
      textInputs[2].value = profile?.phone || "";
    }

    if (textInputs[3]) {
      const institutionBits = [profile?.degree, profile?.specialisation].filter(Boolean);
      if (institutionBits.length) {
        textInputs[3].value = institutionBits.join(" - ");
      }
    }

    if (statementField && !statementField.dataset.prefilled) {
      const statementParts = [
        scholarship.title ? `I am applying for ${scholarship.title}` : null,
        profile?.degree ? `as a ${profile.degree} student` : null,
        profile?.specialisation ? `specializing in ${profile.specialisation}` : null,
        Array.isArray(profile?.skills) && profile.skills.length ? `with skills in ${profile.skills.slice(0, 4).join(", ")}` : null,
        "This scholarship would help me continue building my academic and career goals."
      ].filter(Boolean);
      statementField.value = `${statementParts.join(" ")} `;
      statementField.dataset.prefilled = "true";
    }

    if (successAlert) {
      const summaryBits = [
        profile?.fullName ? `Signed in as ${profile.fullName}` : null,
        scholarship.fundingAmount ? `Award: ${scholarship.fundingAmount}` : null,
        scholarship.deadline ? `Deadline: ${formatDate(scholarship.deadline)}` : null
      ].filter(Boolean);
      successAlert.textContent = summaryBits.length
        ? `${summaryBits.join(" · ")}. Review the details before submitting.`
        : "Your profile has been pre-filled. Please review before submitting.";
    }
  } catch {
    // Keep the existing apply page content if lookup fails.
  }
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

function renderScholarshipCardFromApi(scholarship, session, matchScore = null) {
  const daysLeft = getDaysLeft(scholarship.deadline);
  const score = typeof matchScore === "number" ? matchScore : null;

  return `
    <div class="scholarship-card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">
          ${(scholarship.eligibleSkills || []).slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          ${!(scholarship.eligibleSkills || []).length && scholarship.category ? `<span class="tag">${escapeHtml(scholarship.category)}</span>` : ""}
        </div>
        <span class="sc-saved" onclick="handleSaveToggle(this, '${escapeHtml(scholarship.id)}', 'scholarship_grid')" title="Save">&#11088;</span>
      </div>
      <div class="sc-title">${escapeHtml(scholarship.title)}</div>
      <div style="font-size:0.82rem; color:#7a7060;">${escapeHtml(scholarship.provider || scholarship.region || "ScholarLens Partner")}</div>
      <div class="sc-amount">${escapeHtml(scholarship.fundingAmount || "Funding available")}</div>
      <div class="sc-meta">
        <span>&#128197; ${escapeHtml(formatDate(scholarship.deadline))}</span>
        ${typeof daysLeft === "number" && daysLeft <= 7 ? `<span class="tag tag-red">${daysLeft}d left</span>` : ""}
        ${session.loggedIn && session.role === "student" && score !== null ? `<span class="tag tag-teal">${score}% match</span>` : ""}
      </div>
      ${session.loggedIn && session.role === "student" && score !== null ? `<div class="progress-bar" style="margin-top:0.25rem;"><div class="progress-fill" style="width:${score}%"></div></div>` : ""}
      <div class="sc-actions">
        <a class="btn btn-gold btn-sm" href="apply.html?id=${encodeURIComponent(scholarship.id)}" onclick="trackApplyIntent('${escapeHtml(scholarship.id)}', 'scholarship_grid')" style="flex:1;">Apply Now</a>
        <a class="btn btn-outline btn-sm" href="detail.html?id=${encodeURIComponent(scholarship.id)}" onclick="trackDetailIntent('${escapeHtml(scholarship.id)}', 'scholarship_grid')">Details</a>
      </div>
    </div>
  `;
}

async function renderScholarships() {
  const grid = document.getElementById("scholarship-grid");
  if (!grid) {
    return;
  }

  const session = getSession();

  try {
    const api = getApi();
    if (api) {
      const response = await api.fetchScholarships();
      grid.innerHTML = response.data.map((item) => renderScholarshipCardFromApi(item, session)).join("");
      return;
    }
  } catch (error) {
    alert(error.message || "Failed to load scholarships.");
  }

  grid.innerHTML = scholarships
    .map(
      (scholarship) => `
        <div class="scholarship-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">
              ${scholarship.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <span class="sc-saved" onclick="handleSaveToggle(this, '${scholarship.id}', 'fallback_grid')" title="Save">&#11088;</span>
          </div>
          <div class="sc-title">${scholarship.title}</div>
          <div style="font-size:0.82rem; color:#7a7060;">${scholarship.org}</div>
          <div class="sc-amount">${scholarship.amount}</div>
          <div class="sc-meta">
            <span>&#128197; ${scholarship.deadline}</span>
            ${scholarship.days <= 7 ? `<span class="tag tag-red">${scholarship.days}d left</span>` : ""}
            ${session.loggedIn && session.role === "student" ? `<span class="tag tag-teal">${scholarship.match}% match</span>` : ""}
          </div>
          ${
            session.loggedIn && session.role === "student"
              ? `<div class="progress-bar" style="margin-top:0.25rem;"><div class="progress-fill" style="width:${scholarship.match}%"></div></div>`
              : ""
          }
          <div class="sc-actions">
            <a class="btn btn-gold btn-sm" href="apply.html?id=${scholarship.id}" onclick="trackApplyIntent('${scholarship.id}', 'fallback_grid')" style="flex:1;">Apply Now</a>
            <a class="btn btn-outline btn-sm" href="detail.html?id=${scholarship.id}" onclick="trackDetailIntent('${scholarship.id}', 'fallback_grid')">Details</a>
          </div>
        </div>
      `
    )
    .join("");
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
          ? `Matched based on your profile: ${profileBits.join(" · ")}`
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
                    <a class="btn btn-gold btn-sm" href="apply.html?id=${encodeURIComponent(scholarship.id)}" onclick="trackRecommendationIntent('${escapeHtml(scholarship.id)}', 'recommendations_page')">Apply</a>
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
            <a class="btn btn-gold btn-sm" href="apply.html?id=${scholarship.id}" onclick="trackRecommendationIntent('${scholarship.id}', 'recommendations_fallback')">Apply</a>
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

function renderLandingShowcase() {
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
      totalScholarships.textContent = String((scholarshipResponse.data || []).length);
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
                    <p style="color:#7a7060; font-size:0.78rem;">${escapeHtml(user.degree || "Degree not set")} · ${escapeHtml(user.region || "Region not set")} · Joined ${escapeHtml(formatDate(user.createdAt))}</p>
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
