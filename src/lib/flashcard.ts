export const removeTags = (text: string) => {
  return text.replace(/(<([^>]+)>)/gi, "");
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
