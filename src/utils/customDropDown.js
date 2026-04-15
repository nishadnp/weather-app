export function createDropdown(root) {
  const toggle = root.querySelector(".dropdown-toggle");
  const menu = root.querySelector(".dropdown-menu");
  const options = root.querySelectorAll("[role=option]");

  let open = false;

  function setOpen(state) {
    open = state;
    menu.style.display = open ? "block" : "none";
    toggle.setAttribute("aria-expanded", open);
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!open);
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      toggle.firstChild.textContent = option.textContent;
      root.dataset.value = option.dataset.value;

      options.forEach((o) => o.setAttribute("aria-selected", "false"));
      option.setAttribute("aria-selected", "true");

      setOpen(false);
    });
  });

  return {
    close: () => setOpen(false),
  };
}
