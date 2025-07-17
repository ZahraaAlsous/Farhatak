import fetch from 'node-fetch';

export async function generateTags(imageUrl) {
  const response = await fetch('https://api.clarifai.com/v2/models/general-image-recognition/outputs', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${process.env.CLARIFAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Clarifai API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.outputs[0].data.concepts.map(concept => concept.name);
}
