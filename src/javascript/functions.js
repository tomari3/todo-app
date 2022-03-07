export let elFactory = (type, attributes, ...children) => {
  const el = document.createElement(type);

  for (key in attributes) {
    el.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
};
