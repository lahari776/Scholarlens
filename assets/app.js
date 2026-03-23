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
  try {
    return JSON.parse(localStorage.getItem(APP_STORAGE_KEY)) || { loggedIn: false, role: null };
  } catch {
    return { loggedIn: false, role: null };
  }
}

function setSession(session) {
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(session));
}

function logout() {
  localStorage.removeItem(APP_STORAGE_KEY);
  window.location.href = "index.html";
}

function requireRole() {
  const session = getSession();
  const required = document.body.dataset.auth;

  if (!required) {
    return;
  }

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

  if (page === "landing") {
    mount.innerHTML = `
      <nav class="landing-nav">
        <a class="nav-brand landing-brand" href="index.html"><i class="fa-solid fa-graduation-cap"></i> ScholarLens</a>
        <div class="nav-links landing-links">
          <a class="nav-link ${page === "landing" ? "active" : ""}" href="index.html">Home</a>
          <a class="nav-link" href="#scholarships-section">Scholarships</a>
          <a class="nav-link" href="#opportunity-categories">Programs</a>
          ${
            session.loggedIn
              ? '<button class="btn btn-soft btn-sm" type="button" onclick="logout()">Logout</button>'
              : '<a class="btn btn-gradient btn-sm" href="login.html">Login</a>'
          }
        </div>
      </nav>
    `;
    return;
  }

  const links = [
    { href: "index.html", label: "Home", key: "landing", public: true },
    { href: "dashboard.html", label: "Dashboard", key: "dashboard", role: "student" },
    { href: "scholarships.html", label: "Scholarships", key: "scholarships", role: "student" },
    { href: "recommendations.html", label: "AI Match", key: "recommendations", role: "student" },
    { href: "notifications.html", label: 'Alerts <span class="nav-badge">3</span>', key: "notifications", role: "student" },
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
      <a class="nav-brand" href="index.html">ScholarLens</a>
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
    mount.className = "sidebar";
    mount.innerHTML = `
      <div class="sidebar-section">
        <div style="padding: 0 0.75rem; margin-bottom: 1.5rem;">
          <p style="font-family:'DM Mono',monospace; font-size:0.65rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(201,168,76,0.5);">Logged in as</p>
          <p style="color:var(--cream); font-size:0.9rem; margin-top:0.25rem;">Arjun Sharma</p>
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

function handleLogin() {
  const email = document.getElementById("login-email")?.value || "";
  const role = email.toLowerCase().includes("admin") ? "admin" : "student";
  setSession({ loggedIn: true, role });
  window.location.href = role === "admin" ? "admin.html" : "dashboard.html";
}

function handleSignup() {
  const role = document.querySelector('input[name="role"]:checked')?.value || "student";
  setSession({ loggedIn: true, role });
  window.location.href = role === "admin" ? "admin.html" : "dashboard.html";
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

function renderScholarships() {
  const grid = document.getElementById("scholarship-grid");
  if (!grid) {
    return;
  }

  const session = getSession();

  grid.innerHTML = scholarships
    .map(
      (scholarship) => `
        <div class="scholarship-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div style="display:flex; flex-wrap:wrap; gap:0.35rem;">
              ${scholarship.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <span class="sc-saved" onclick="this.classList.toggle('saved')" title="Save">&#11088;</span>
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
            <a class="btn btn-gold btn-sm" href="apply.html" style="flex:1;">Apply Now</a>
            <a class="btn btn-outline btn-sm" href="detail.html">Details</a>
          </div>
        </div>
      `
    )
    .join("");
}

function renderAI() {
  const container = document.getElementById("ai-results");
  if (!container) {
    return;
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
          </div>
          <div>
            <a class="btn btn-gold btn-sm" href="apply.html">Apply</a>
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

function runAI(button) {
  if (!button) {
    return;
  }

  button.textContent = "Matching...";
  button.disabled = true;

  setTimeout(() => {
    renderAI();
    button.textContent = "Refresh Recommendations";
    button.disabled = false;
  }, 900);
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

function submitApp(button) {
  if (!button) {
    return;
  }

  button.textContent = "Submitting...";
  button.disabled = true;

  setTimeout(() => {
    alert("Application submitted successfully. You can track it in My Applications.");
    window.location.href = "applications.html";
  }, 800);
}

document.addEventListener("DOMContentLoaded", () => {
  requireRole();
  renderNav();
  renderSidebar();
  renderScholarships();
  renderAI();
  renderLandingShowcase();
  bindChatWidget();
  bindUploadZone();
});
