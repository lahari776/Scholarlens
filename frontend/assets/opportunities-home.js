const homeOpportunities = {
  "hackathons-row": [
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
  "govt-row": [
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
  "internships-row": [
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
  "fellowships-row": [
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
  "workshops-row": [
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
  "international-row": [
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

function createOpportunityCard(opportunity) {
  return `
    <article class="scholarship-card portal-card">
      <div class="card-topline">
        <span class="tag tag-teal">Opportunity</span>
      </div>
      <h3 class="sc-title">${opportunity.title}</h3>
      <p class="portal-copy">${opportunity.description}</p>
      <div class="portal-meta">
        <span><i class="fa-regular fa-calendar"></i> ${opportunity.deadline}</span>
        <span><i class="fa-solid fa-building"></i> ${opportunity.organizer}</span>
        <span><i class="fa-solid fa-gift"></i> ${opportunity.benefit}</span>
      </div>
      <div class="sc-actions">
        <a class="btn btn-gradient btn-sm" href="detail.html">View Details</a>
      </div>
    </article>
  `;
}

function renderHomeOpportunityRows() {
  if (document.body?.dataset?.page === "dashboard") {
    return;
  }
  Object.entries(homeOpportunities).forEach(([rowId, items]) => {
    const row = document.getElementById(rowId);
    if (!row) {
      return;
    }

    row.innerHTML = items.map(createOpportunityCard).join("");
  });
}

document.addEventListener("DOMContentLoaded", renderHomeOpportunityRows);
