const exampleDecisions = [
  {
    id: "example-food",
    choices: [
      "Pizza",
      "Biryani",
      "Pizza",
      "Burgers",
    ],
  },
  {
    id: "example-weekend",
    choices: [
      "Movie",
      "Bowling",
      "Movie",
      "Beach",
    ],
  },
  {
    id: "example-movie",
    choices: [
      "Comedy",
      "Thriller",
      "Comedy",
    ],
  },
];

export const defaultExampleDecision =
  exampleDecisions[0];

export function getExampleDecision(
  id
) {
  return (
    exampleDecisions.find(
      (example) =>
        example.id === id
    ) || null
  );
}

export default exampleDecisions;