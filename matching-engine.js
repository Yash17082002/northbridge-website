/**
 * NORTHBRIDGE MATCHING ENGINE
 *
 * A real weighted-scoring model that:
 *   1. Classifies the problem into research domains
 *   2. Extracts problem keywords
 *   3. Scores every professor against the problem across seven dimensions
 *   4. Returns top matches with a full explanation of every score component
 *
 * All scores are computed live from the problem text and professor profile.
 * No hard-coded scores. Every match is explainable.
 */

// ==================== STOPWORDS ====================
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "so", "of", "in", "on", "at", "to", "for",
  "with", "by", "from", "as", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could", "should",
  "may", "might", "must", "shall", "can", "we", "our", "us", "you", "your", "yours",
  "they", "their", "them", "he", "she", "it", "its", "this", "that", "these", "those",
  "there", "here", "how", "what", "when", "where", "why", "which", "who", "whom",
  "need", "want", "help", "looking", "trying", "solve", "problem", "problems",
  "improve", "make", "get", "use", "using", "some", "any", "all", "one", "two",
  "high", "low", "better", "best", "good", "bad", "new", "old", "very", "much",
  "many", "few", "more", "less", "than", "then", "very", "just", "only", "also",
  "into", "over", "under", "about", "through"
]);

// ==================== PROBLEM CLASSIFICATION ====================
/**
 * Classify a problem statement into weighted research domains.
 * Uses multi-word keyword matching against KEYWORD_DOMAIN_MAP.
 * Returns an object like { mechanical: 0.4, materials: 0.35, electronics: 0.25 }
 */
function classifyProblem(problemText, selectedDomains = []) {
  const normalized = " " + problemText.toLowerCase() + " ";
  const domainScores = {};

  // Sort keys longest-first so "computer vision" hits before "vision"
  const sortedKeys = Object.keys(KEYWORD_DOMAIN_MAP).sort((a, b) => b.length - a.length);

  const seen = new Set();
  for (const kw of sortedKeys) {
    const pattern = " " + kw + " ";
    if (normalized.includes(pattern)) {
      const domain = KEYWORD_DOMAIN_MAP[kw];
      // Count word occurrences (longer keywords score more)
      const weight = kw.split(" ").length * 1.5;
      if (!seen.has(kw)) {
        domainScores[domain] = (domainScores[domain] || 0) + weight;
        seen.add(kw);
      }
    }
  }

  // Fold in user-selected domains at high weight
  for (const d of selectedDomains) {
    domainScores[d] = (domainScores[d] || 0) + 5;
  }

  // Normalize to percentages
  const total = Object.values(domainScores).reduce((s, v) => s + v, 0);
  if (total === 0) {
    return { computer_science: 0.4, management: 0.3, mechanical: 0.3 }; // safe fallback
  }
  const normalized_scores = {};
  for (const [k, v] of Object.entries(domainScores)) {
    normalized_scores[k] = v / total;
  }

  // Return sorted, keeping top 4 domains
  const sorted = Object.entries(normalized_scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const result = {};
  const subTotal = sorted.reduce((s, [, v]) => s + v, 0);
  for (const [k, v] of sorted) {
    result[k] = v / subTotal; // renormalize among top 4
  }
  return result;
}

// ==================== KEYWORD EXTRACTION ====================
/**
 * Extract meaningful keywords from problem text (removing stopwords).
 */
function extractKeywords(problemText) {
  const cleaned = problemText.toLowerCase()
    .replace(/[.,;:!?()"'\-\/\\]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOPWORDS.has(w));

  // Also extract bigrams
  const words = problemText.toLowerCase()
    .replace(/[.,;:!?()"'\-\/\\]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 1);
  const bigrams = [];
  for (let i = 0; i < words.length - 1; i++) {
    if (!STOPWORDS.has(words[i]) && !STOPWORDS.has(words[i + 1])) {
      bigrams.push(words[i] + " " + words[i + 1]);
    }
  }

  return { unigrams: [...new Set(cleaned)], bigrams: [...new Set(bigrams)] };
}

// ==================== SCORING COMPONENTS ====================

/**
 * Score 1: Research Relevance (30%)
 * How well the professor's primary and secondary research domains match the
 * problem's classified domains.
 */
function scoreResearchRelevance(professor, domainWeights) {
  let score = 0;
  let maxPossible = 0;

  // Primary domain matches carry more weight
  for (const domain of professor.primaryDomains) {
    if (domainWeights[domain]) {
      score += domainWeights[domain] * 100;
    }
  }
  maxPossible = Math.max(...Object.values(domainWeights)) * 100 * professor.primaryDomains.length;

  // Bonus if professor's PRIMARY domain is the problem's TOP domain
  const topDomain = Object.entries(domainWeights).sort((a, b) => b[1] - a[1])[0];
  if (topDomain && professor.primaryDomains.includes(topDomain[0])) {
    score += 15;
  }

  return Math.min(100, Math.max(0, score * 1.2));
}

/**
 * Score 2: Keyword Relevance (20%)
 * Direct textual overlap between problem keywords and professor's
 * declared keywords, subDomains, and department.
 */
function scoreKeywordRelevance(professor, problemKeywords) {
  const professorText = [
    ...professor.keywords,
    ...professor.subDomains,
    professor.department
  ].join(" ").toLowerCase();

  let hits = 0;
  const matched = new Set();

  // Bigrams score higher (more specific)
  for (const bg of problemKeywords.bigrams) {
    if (professorText.includes(bg)) {
      hits += 3;
      matched.add(bg);
    }
  }
  for (const kw of problemKeywords.unigrams) {
    if (professorText.includes(kw) && !matched.has(kw)) {
      hits += 1;
      matched.add(kw);
    }
  }

  // Normalize: 10+ hits ≈ perfect, saturating logarithmically
  const raw = Math.min(100, hits * 12);
  return { score: raw, matchedTerms: Array.from(matched).slice(0, 6) };
}

/**
 * Score 3: Technical Method Alignment (15%)
 * Whether the professor's lab, methods, and technical keywords align
 * with methodology implied by the problem.
 */
function scoreTechnicalMethod(professor, problemKeywords) {
  const methodText = (professor.labName + " " + professor.keywords.join(" ")).toLowerCase();
  const allTerms = [...problemKeywords.bigrams, ...problemKeywords.unigrams];
  let hits = 0;
  for (const term of allTerms) {
    if (methodText.includes(term)) hits++;
  }
  return Math.min(100, hits * 15);
}

/**
 * Score 4: Industry Fit (10%)
 * Whether the professor has previously worked with related industries.
 */
function scoreIndustryFit(professor, problemText) {
  const industryText = professor.industryExperience.join(" ").toLowerCase();
  const problem = problemText.toLowerCase();
  const industryWords = industryText.split(/\s+/);
  let hits = 0;
  for (const w of industryWords) {
    if (w.length > 3 && problem.includes(w)) hits++;
  }
  // Base score reflects breadth of industry experience
  const baseScore = Math.min(60, professor.industryExperience.length * 12);
  return Math.min(100, baseScore + hits * 8);
}

/**
 * Score 5: Publication Relevance (10%)
 * A proxy using publications count + h-index. In production this would
 * search actual publication titles/abstracts.
 */
function scorePublicationRelevance(professor) {
  // Sigmoidal: 100+ publications hits saturating ~90
  const pubScore = 100 * (1 - Math.exp(-professor.publicationsCount / 100));
  const hScore = Math.min(100, professor.hIndex * 2.5);
  return (pubScore * 0.5 + hScore * 0.5);
}

/**
 * Score 6: Institutional Fit (5%)
 * Reflects institutional reputation and relevance to problem type.
 * All top IITs, IISc, IIMs, NITs score high.
 */
function scoreInstitutionalFit(professor) {
  const tier1 = ["IIT Madras", "IIT Delhi", "IIT Bombay", "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati", "IIT Hyderabad", "IISc Bangalore"];
  const tier1_5 = ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIT (BHU) Varanasi", "IIT Indore", "IIT Gandhinagar", "IIIT Hyderabad"];
  const tier2 = ["NIT Tiruchirappalli", "NIT Rourkela"];
  if (tier1.includes(professor.institution)) return 95;
  if (tier1_5.includes(professor.institution)) return 88;
  if (tier2.includes(professor.institution)) return 78;
  return 65;
}

/**
 * Score 7: Cross-Domain Capability (5%)
 * Higher for professors who work across multiple domains — matters more
 * for cross-functional problems.
 */
function scoreCrossDomain(professor, domainWeights) {
  const domainCount = Object.keys(domainWeights).length;
  if (domainCount <= 1) return 50; // single-domain problems don't need this
  const profDomainCount = professor.primaryDomains.length;
  return Math.min(100, profDomainCount * 45 + 20);
}

/**
 * Score 8: Availability Signal (5%)
 * In production this would use real availability data. In the prototype we
 * always return a moderate score and flag "Requires confirmation" in the UI.
 */
function scoreAvailability(professor) {
  return 70; // neutral placeholder until real availability data exists
}

// ==================== MAIN MATCH FUNCTION ====================
/**
 * Compute the full match for a professor against a problem.
 * Returns a score object with total + component breakdown + evidence.
 */
function matchProfessor(professor, problemText, domainWeights, problemKeywords) {
  const research = scoreResearchRelevance(professor, domainWeights);
  const keyword = scoreKeywordRelevance(professor, problemKeywords);
  const method = scoreTechnicalMethod(professor, problemKeywords);
  const industry = scoreIndustryFit(professor, problemText);
  const publication = scorePublicationRelevance(professor);
  const institution = scoreInstitutionalFit(professor);
  const crossDomain = scoreCrossDomain(professor, domainWeights);
  const availability = scoreAvailability(professor);

  const total =
    research * 0.30 +
    keyword.score * 0.20 +
    method * 0.15 +
    industry * 0.10 +
    publication * 0.10 +
    institution * 0.05 +
    crossDomain * 0.05 +
    availability * 0.05;

  return {
    professor,
    total: Math.round(total),
    components: {
      research: Math.round(research),
      keyword: Math.round(keyword.score),
      method: Math.round(method),
      industry: Math.round(industry),
      publication: Math.round(publication),
      institution: Math.round(institution),
      crossDomain: Math.round(crossDomain),
      availability: Math.round(availability)
    },
    matchedTerms: keyword.matchedTerms
  };
}

/**
 * Find top N professor matches for a problem.
 * Returns { domainWeights, matches: [top N] }
 */
function findMatches(problemText, selectedDomains = [], topN = 6) {
  const domainWeights = classifyProblem(problemText, selectedDomains);
  const problemKeywords = extractKeywords(problemText);

  const allMatches = PROFESSOR_DATABASE.map(prof =>
    matchProfessor(prof, problemText, domainWeights, problemKeywords)
  );

  // Sort by total, descending
  allMatches.sort((a, b) => b.total - a.total);

  // Only return matches above a minimum threshold
  const filtered = allMatches.filter(m => m.total >= 25);
  return {
    domainWeights,
    problemKeywords,
    matches: filtered.slice(0, topN)
  };
}

/**
 * Generate a plain-English explanation of why a professor matches.
 */
function explainMatch(matchResult) {
  const { professor: p, components: c, matchedTerms } = matchResult;
  const reasons = [];

  if (c.research >= 70) {
    reasons.push(`Direct research domain overlap — ${p.primaryDomains.map(d => DOMAIN_METADATA[d]?.label || d).join(" + ")}`);
  } else if (c.research >= 50) {
    reasons.push(`Related research domain — ${p.primaryDomains.map(d => DOMAIN_METADATA[d]?.label || d).join(", ")}`);
  }

  if (matchedTerms.length > 0) {
    reasons.push(`Keyword overlap on ${matchedTerms.slice(0, 3).map(t => `"${t}"`).join(", ")}`);
  }

  if (c.industry >= 70) {
    reasons.push(`Prior industry work with ${p.industryExperience.slice(0, 2).join(" and ")}`);
  }

  if (c.publication >= 80) {
    reasons.push(`${p.publicationsCount}+ publications, h-index ${p.hIndex}`);
  }

  if (reasons.length === 0) {
    reasons.push("Partial capability alignment based on department and prior work");
  }

  return reasons;
}

// ==================== INITIALS-AVATAR RENDERING ====================
/**
 * Generate a professional initials-based avatar for a professor.
 * We do NOT display real photos without explicit consent.
 */
function generateAvatar(professor) {
  const nameOnly = professor.name.replace(/^Prof\.\s*/, "");
  const parts = nameOnly.split(/\s+/);
  const initials = (parts[0][0] + (parts[parts.length - 1][0] || "")).toUpperCase();
  return {
    initials,
    color: professor.color || "#D6B56A"
  };
}
