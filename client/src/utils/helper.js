const getInitialChars = (name) => {
  if (!name) {
    return "";
  }

  const words = name.split(" ");
  let initialChars = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initialChars += words[i][0];
  }

  return initialChars.toUpperCase();
};

export { getInitialChars };
