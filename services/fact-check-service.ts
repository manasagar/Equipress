// This is a mock service for fact-checking
// In a real app, this would call a Flask API

interface FactCheckResult {
  score: number
  confidence: number
  sources: string[]
  explanation: string
}

export async function checkFactsInArticle(articleText: string): Promise<FactCheckResult> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock response
  return {
    score: Math.random() * 100,
    confidence: 75 + Math.random() * 20,
    sources: ["https://example.com/source1", "https://example.com/source2", "https://example.com/source3"],
    explanation: "This article contains statements that can be verified with reliable sources.",
  }
}

export async function checkClaim(claim: string): Promise<FactCheckResult> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock response
  return {
    score: Math.random() * 100,
    confidence: 70 + Math.random() * 25,
    sources: ["https://example.com/source1", "https://example.com/source2"],
    explanation: "This claim has been analyzed based on available evidence.",
  }
}

export async function getSimilarArticles(articleText: string): Promise<string[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response
  return ["Similar Article 1", "Similar Article 2", "Similar Article 3"]
}
