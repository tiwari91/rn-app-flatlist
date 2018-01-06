export const getPeople = () => {
  const url = "https://swapi.co/api/people";
  return fetch(url).then(response => response.json());
};
