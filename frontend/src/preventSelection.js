// Prevent text selection and drag events
export const initializeSelectionPrevention = () => {
  // Prevent text selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent drag start
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent context menu (right click)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Prevent mouse selection
  document.addEventListener('mousedown', (e) => {
    // Allow interaction with input fields, buttons, and links
    const allowedElements = ['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'SELECT'];
    if (!allowedElements.includes(e.target.tagName)) {
      e.preventDefault();
    }
  });

  // Prevent double click selection
  document.addEventListener('dblclick', (e) => {
    e.preventDefault();
    return false;
  });
};