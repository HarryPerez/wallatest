export const setStyleProperty = (property, value) => document.documentElement.style.setProperty(property, value);

export const getStyleProperty = (property) => getComputedStyle(document.documentElement).getPropertyValue(property);
