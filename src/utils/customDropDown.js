/**
 * Creates an accessible custom dropdown component with ARIA attributes.
 * Manages open/close state, option selection, and click-outside dismissal.
 * Returns a public interface with a close() method.
 *
 * @param {HTMLElement} root - Container element with .dropdown-toggle and .dropdown-menu
 * @returns {Object} Public API with close() method to close the dropdown
 */
export function createDropdown(root) {
  const toggle = root.querySelector(".dropdown-toggle");
  const menu = root.querySelector(".dropdown-menu");
  const options = root.querySelectorAll("[role=option]");

  let open = false;

  /**
   * Updates dropdown visibility state and ARIA attributes.
   * @param {boolean} state - True to open, false to close
   */
  function setOpen(state) {
    open = state;
    menu.style.display = open ? "block" : "none";
    toggle.setAttribute("aria-expanded", open);
  }

  // Toggle dropdown when clicking the button
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!open);
  });

  // Handle individual option clicks
  options.forEach((option) => {
    option.addEventListener("click", () => {
      // Update toggle button text to reflect selection
      toggle.firstChild.textContent = option.textContent;
      // Store selected value in data attribute for external access
      root.dataset.value = option.dataset.value;

      // Update ARIA selected state for accessibility
      options.forEach((o) => o.setAttribute("aria-selected", "false"));
      option.setAttribute("aria-selected", "true");

      setOpen(false);
    });
  });

  return {
    close: () => setOpen(false),
  };
}
