export const readFileData = (file, handleLoad) => {
  const reader = new FileReader();
  reader.onload = handleLoad;
  reader.readAsDataURL(file);
};

export const parseXMLNodeValue = (xml, node) => {
  const parsedResponse = new DOMParser().parseFromString(xml, 'application/xml');

  return parsedResponse?.getElementsByTagName(node)?.[0]?.childNodes?.[0]?.nodeValue;
};

export const blobToFile = (theBlob, fileName) => {
  const file = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  file.lastModifiedDate = new Date();
  file.name = fileName;

  // Cast to a File() type
  return file;
};

export const downloadFile = (data, fileName) => {
  const blob = new Blob([data]);
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = fileName;
  a.href = blobUrl;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.parentNode.removeChild(a);
};
