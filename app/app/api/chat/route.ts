import { NextRequest, NextResponse } from 'next/server'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  message: string
  history: ChatMessage[]
}

// Configuration for your local Llama 3.2 instance
const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://localhost:11434/api/generate'
const LLAMA_MODEL = process.env.LLAMA_MODEL || 'llama3.2'

// System prompt for Montreal restaurant guide
const SYSTEM_PROMPT = `You are a helpful AI assistant specializing in Montreal restaurant recommendations. You have extensive knowledge of Montreal's dining scene and can provide personalized recommendations based on:

- Cuisine type (Italian, French, Asian, etc.)
- Price range (budget-friendly under $30, mid-range $30-60, high-end $60+)
- Location/neighborhood (Old Montreal, Plateau, Mile End, etc.)
- Dietary restrictions (vegetarian, vegan, gluten-free, etc.)
- Occasion (romantic dinner, casual lunch, business meeting, etc.)

When recommending restaurants, provide:
1. Restaurant name and location
2. Cuisine type and price range
3. What makes it special
4. Best dishes to try
5. Reservation tips if applicable

Keep responses conversational, helpful, and focused on Montreal dining. If you don't know specific details about a restaurant, be honest about it and suggest alternatives.`

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, history } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Build conversation context
    const conversation = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message }
    ]

    // Prepare the request for Llama 3.2
    const llamaRequest = {
      model: LLAMA_MODEL,
      prompt: conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n') + '\nassistant:',
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000,
        stop: ['user:', 'system:']
      }
    }

    // Call your local Llama 3.2 instance
    const response = await fetch(LLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(llamaRequest),
    })

    if (!response.ok) {
      throw new Error(`Llama API error: ${response.status}`)
    }

    const llamaResponse = await response.json()
    
    // Extract the response text from Llama
    const assistantResponse = llamaResponse.response || 'I apologize, but I am unable to provide a response at the moment.'

    return NextResponse.json({
      response: assistantResponse,
      model: LLAMA_MODEL
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 