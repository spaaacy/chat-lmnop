export const getChatResponse = async (conversation) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        // TODO: use env here
        // "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: conversation,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
