#!/usr/bin/env node

/**
 * Test script to verify local Llama 3.2 API connection
 * Run this before starting the Next.js app
 */

const fetch = require('node-fetch');

const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://localhost:11434/api/generate';
const LLAMA_MODEL = process.env.LLAMA_MODEL || 'llama3.2';

async function testLlamaConnection() {
  console.log('🧪 Testing Local Llama 3.2 Connection...\n');
  
  try {
    // Test 1: Check if API is reachable
    console.log('1. Testing API endpoint availability...');
    const healthCheck = await fetch(`${LLAMA_API_URL.replace('/api/generate', '/api/tags')}`);
    
    if (!healthCheck.ok) {
      throw new Error(`API not reachable: ${healthCheck.status}`);
    }
    
    console.log('✅ API endpoint is reachable');
    
    // Test 2: Test basic generation
    console.log('\n2. Testing basic text generation...');
    const testRequest = {
      model: LLAMA_MODEL,
      prompt: 'Hello, can you tell me about restaurants in Montreal?',
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 100
      }
    };
    
    const response = await fetch(LLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRequest),
    });
    
    if (!response.ok) {
      throw new Error(`Generation failed: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.response) {
      throw new Error('No response received from model');
    }
    
    console.log('✅ Text generation working');
    console.log(`📝 Sample response: "${result.response.substring(0, 100)}..."`);
    
    // Test 3: Test Montreal-specific prompt
    console.log('\n3. Testing Montreal restaurant knowledge...');
    const montrealRequest = {
      model: LLAMA_MODEL,
      prompt: 'system: You are a Montreal restaurant guide. user: What are some good Italian restaurants in Old Montreal? assistant:',
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 200,
        stop: ['user:', 'system:']
      }
    };
    
    const montrealResponse = await fetch(LLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(montrealRequest),
    });
    
    if (montrealResponse.ok) {
      const montrealResult = await montrealResponse.json();
      console.log('✅ Montreal restaurant knowledge test passed');
      console.log(`📝 Response: "${montrealResult.response.substring(0, 150)}..."`);
    }
    
    console.log('\n🎉 All tests passed! Your local Llama 3.2 is ready to use.');
    console.log('\nNext steps:');
    console.log('1. Create a .env.local file with your configuration');
    console.log('2. Run: npm run dev');
    console.log('3. Visit http://localhost:3000');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure your local Llama server is running');
    console.log('2. Check if the API URL is correct');
    console.log('3. Verify the model name matches your installation');
    console.log('4. If using Ollama, try: ollama serve');
    
    process.exit(1);
  }
}

// Run the test
testLlamaConnection(); 