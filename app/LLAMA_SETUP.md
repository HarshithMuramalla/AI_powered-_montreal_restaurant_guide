# Local Llama 3.2 Integration Setup

This guide will help you replace the Abacus AI chatbot with your local Llama 3.2 model.

## Prerequisites

1. **Local Llama 3.2 Installation**: Make sure you have Llama 3.2 running locally (via Ollama, llama.cpp, or similar)
2. **API Endpoint**: Your local Llama should expose an API endpoint (typically `http://localhost:11434/api/generate` for Ollama)

## Setup Steps

### 1. Environment Configuration

Create a `.env.local` file in the `app` directory with the following content:

```env
# Local Llama 3.2 Configuration
LLAMA_API_URL=http://localhost:11434/api/generate
LLAMA_MODEL=llama3.2
```

### 2. Verify Your Local Llama Setup

If using Ollama:
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# List available models
ollama list

# Test the API endpoint
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.2",
    "prompt": "Hello, how are you?",
    "stream": false
  }'
```

### 3. Install Dependencies

```bash
cd app
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Compatibility

The current implementation expects the Llama API to follow this format:

**Request:**
```json
{
  "model": "llama3.2",
  "prompt": "system: You are a helpful assistant...\nuser: Hello\nassistant:",
  "stream": false,
  "options": {
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 1000,
    "stop": ["user:", "system:"]
  }
}
```

**Response:**
```json
{
  "response": "Hello! How can I help you today?",
  "model": "llama3.2"
}
```

## Customization

### Modifying the System Prompt

Edit the `SYSTEM_PROMPT` in `app/app/api/chat/route.ts` to customize the AI's behavior for Montreal restaurant recommendations.

### Adjusting Model Parameters

You can modify the generation parameters in the API route:
- `temperature`: Controls randomness (0.0 = deterministic, 1.0 = very random)
- `top_p`: Nucleus sampling parameter
- `max_tokens`: Maximum response length
- `stop`: Stop sequences

## Troubleshooting

### Common Issues

1. **Connection Refused**: Make sure your local Llama API is running
2. **Model Not Found**: Verify the model name matches your installation
3. **CORS Issues**: The API route handles this automatically
4. **Slow Responses**: Consider adjusting model parameters or using a smaller model

### Testing the Integration

1. Start your local Llama server
2. Start the Next.js development server
3. Navigate to the chatbot section
4. Try asking: "Show me Italian restaurants in Old Montreal"

## Performance Tips

- Use a quantized model for faster inference
- Consider streaming responses for better UX
- Implement response caching for common queries
- Monitor memory usage with larger models

## Security Notes

- The local API is only accessible from your machine
- No data is sent to external services
- Consider implementing rate limiting for production use 