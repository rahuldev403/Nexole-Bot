import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDmwZALtKyh4O_OdrTbb2Y98PTbCPhZkzk";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", 
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
  return result.response.text(); 
}

export default run;

/*import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt, imageBase64) {  // Add imageBase64 parameter
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  // Construct the prompt with the image data
  const fullPrompt = imageBase64 
    ? `${prompt}\n\n[Image: ${imageBase64}]` // Include the image data
    : prompt; // Or just the regular prompt if no image

  const result = await chatSession.sendMessage(fullPrompt);
  console.log(result.response.text());
  return result.response.text();
}

// Function to handle image selection and conversion to base64
async function handleImageUpload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result); // This will be the base64 string
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file); // Crucial: reads as data URL (base64)
  });
}


// Example usage (in your UI or wherever you call the function):
const imageInput = document.getElementById('imageInput'); // Your file input element
imageInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const base64Image = await handleImageUpload(file);
      const userPrompt = document.getElementById('promptInput').value; // Get prompt from input
      const response = await run(userPrompt, base64Image);  // Pass both to run
      // ... process the response ...
    } catch (error) {
      console.error("Error processing image:", error);
      // Handle the error (e.g., display a message to the user)
    }
  }
});

export default run;*/