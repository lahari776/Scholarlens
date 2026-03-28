function toLowerList(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim().toLowerCase()).filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function serializeScholarship(scholarship) {
  const source = typeof scholarship.toObject === "function" ? scholarship.toObject() : scholarship;

  return {
    id: String(source._id || source.id),
    title: source.title,
    description: source.description,
    deadline: source.deadline,
    region: source.region || null,
    fundingAmount: source.funding || source.fundingAmount || null,
    degree: source.degree || null,
    category: source.category || null,
    provider: source.provider || null,
    eligibleSkills: source.eligibleSkills || [],
    createdBy: source.createdBy ? String(source.createdBy._id || source.createdBy) : null,
    createdAt: source.createdAt,
    updatedAt: source.updatedAt
  };
}

function generateRecommendations(user, scholarships) {
  const userSkills = toLowerList(user.skills);
  const userRegion = (user.region || "").trim().toLowerCase();

  return scholarships
    .map((scholarship) => {
      let score = 0;
      const reasons = [];
      const scholarshipSkills = toLowerList(scholarship.eligibleSkills);
      const scholarshipRegion = (scholarship.region || "").trim().toLowerCase();

      if (userRegion && scholarshipRegion && scholarshipRegion.includes(userRegion)) {
        score += 40;
        reasons.push("region match");
      }

      const skillMatches = scholarshipSkills.filter((skill) => userSkills.includes(skill));
      if (skillMatches.length) {
        score += Math.min(skillMatches.length * 20, 60);
        reasons.push(`skills match: ${skillMatches.join(", ")}`);
      }

      return {
        ...serializeScholarship(scholarship),
        matchScore: Math.min(score, 100),
        reasons
      };
    })
    .filter((item) => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = {
  generateRecommendations
};
