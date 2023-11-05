async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: "Bearer ",
        },
        method: "POST",
        body: JSON.stringify({ inputs: data }),
      }
    );

    // Convert the response to blob
    const blob = await response.blob();

    // Create a URL for the blob
    const blobURL = URL.createObjectURL(blob);

    // Set the URL in the state
    setForm({ ...form, photo: blobURL });
  }