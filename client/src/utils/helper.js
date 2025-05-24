const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

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

// Sort note in local without waiting api response
// if 2 notes have same pin or unpin, then sort them by createdAt
// else sort them by pin
// if note b is pinned (true - 1), note a is unpinned (false - 0), then 1 - 0 = 1 => true => move b before a
// else keep them in their original position
const sortNotes = (notes) => {
  return [...notes].sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return b.isPinned - a.isPinned;
  });
};

export { isValidEmail, getInitialChars, sortNotes };
