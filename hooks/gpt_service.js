export const getChatResponse = async (query) => {
  try {
    const messageBody = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: query },
      ],
    });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        // "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json"
      },
      body: messageBody,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }

};
