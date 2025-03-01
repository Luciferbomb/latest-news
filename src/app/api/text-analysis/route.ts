import { NextResponse } from 'next/server';

// In a production environment, we would use actual API calls to Hugging Face
// For this demo, we'll simulate the API responses

interface AnalysisRequest {
  items: {
    id: string;
    text: string;
  }[];
}

interface AnalysisResult {
  id: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
}

export async function POST(request: Request) {
  try {
    const body: AnalysisRequest = await request.json();
    
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request format. Expected array of items with id and text.' },
        { status: 400 }
      );
    }
    
    // Process each text item for summarization and sentiment analysis
    const results: AnalysisResult[] = await Promise.all(
      body.items.map(async (item) => {
        // In a real implementation, we would call Hugging Face APIs here
        // For now, we'll simulate the responses
        
        return {
          id: item.id,
          summary: await simulateSummarization(item.text),
          ...simulateSentimentAnalysis(item.text)
        };
      })
    );
    
    return NextResponse.json({ results }, { status: 200 });
  } catch (error: any) {
    console.error('Error in text analysis:', error);
    return NextResponse.json(
      { error: 'Failed to process text analysis' },
      { status: 500 }
    );
  }
}

// Simulate BART text summarization
async function simulateSummarization(text: string): Promise<string> {
  // In a real implementation, we would call the Hugging Face API:
  // const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
  //   method: 'POST',
  //   headers: { 
  //     'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ inputs: text })
  // });
  // const result = await response.json();
  // return result[0].summary_text;
  
  // For demo purposes, we'll create a simple summary
  if (!text || text.length < 50) return text;
  
  // Extract the first 2-3 sentences for a simple summary
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const summaryLength = Math.min(sentences.length, text.length > 200 ? 3 : 2);
  
  return sentences.slice(0, summaryLength).join(' ').trim();
}

// Simulate DistilBERT sentiment analysis
function simulateSentimentAnalysis(text: string): { sentiment: 'positive' | 'negative' | 'neutral', sentimentScore: number } {
  // In a real implementation, we would call the Hugging Face API:
  // const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english', {
  //   method: 'POST',
  //   headers: { 
  //     'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ inputs: text })
  // });
  // const result = await response.json();
  // Map the result to our format
  
  // For demo purposes, we'll create a simple sentiment analysis
  // based on positive and negative word counts
  const positiveWords = ['advance', 'breakthrough', 'innovation', 'success', 'revolutionary', 'impressive', 'exciting', 'remarkable', 'achievement', 'progress'];
  const negativeWords = ['concern', 'risk', 'problem', 'issue', 'challenge', 'controversy', 'danger', 'threat', 'failure', 'trouble'];
  
  const lowerText = text.toLowerCase();
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) positiveCount += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) negativeCount += matches.length;
  });
  
  // Calculate sentiment score (-1 to 1)
  const total = positiveCount + negativeCount;
  let sentimentScore = 0;
  
  if (total > 0) {
    sentimentScore = (positiveCount - negativeCount) / total;
  }
  
  // Determine sentiment category
  let sentiment: 'positive' | 'negative' | 'neutral';
  
  if (sentimentScore > 0.2) {
    sentiment = 'positive';
  } else if (sentimentScore < -0.2) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  
  return { sentiment, sentimentScore };
}
