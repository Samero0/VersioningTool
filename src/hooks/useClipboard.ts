export const copyToClipboard = (text: string) => {
    if (text.trim() !== "") {
      navigator.clipboard.writeText(text)
        .then(() => alert("Copied to clipboard!"))
        .catch(err => console.error("Error copying:", err));
    }
  };
  