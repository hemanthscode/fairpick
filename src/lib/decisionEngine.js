export const MIN_CHOICES = 2;
export const MAX_CHOICES = 50;

export function cleanChoices(choices) {
  if (!Array.isArray(choices)) {
    return [];
  }

  return choices
    .map((choice) =>
      typeof choice === "string"
        ? choice.trim()
        : ""
    )
    .filter(Boolean);
}

export function validateChoices(choices) {
  if (!Array.isArray(choices)) {
    return {
      valid: false,
      choices: [],
      error:
        "Choices must be provided as an array.",
    };
  }

  const cleanedChoices =
    cleanChoices(choices);

  if (
    cleanedChoices.length <
    MIN_CHOICES
  ) {
    return {
      valid: false,
      choices: cleanedChoices,
      error:
        "Add at least 2 choices.",
    };
  }

  if (
    cleanedChoices.length >
    MAX_CHOICES
  ) {
    return {
      valid: false,
      choices: cleanedChoices,
      error: `You can add up to ${MAX_CHOICES} choices.`,
    };
  }

  return {
    valid: true,
    choices: cleanedChoices,
    error: "",
  };
}

function secureRandom() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues ===
      "function"
  ) {
    const randomValues =
      new Uint32Array(1);

    crypto.getRandomValues(
      randomValues
    );

    return (
      randomValues[0] / 4294967296
    );
  }

  return Math.random();
}

/**
 * Every entry has equal probability.
 *
 * Example:
 *
 * ["Pizza", "Pizza", "Biryani"]
 *
 * Pizza   = 2/3
 * Biryani = 1/3
 *
 * Duplicate choices are therefore
 * intentionally meaningful.
 */
export function fairSelect(items) {
  if (!Array.isArray(items)) {
    throw new Error(
      "fairSelect expects an array."
    );
  }

  if (items.length === 0) {
    throw new Error(
      "Cannot select from an empty array."
    );
  }

  const index = Math.floor(
    secureRandom() * items.length
  );

  return items[index];
}

export function makeDecision(choices) {
  const validation =
    validateChoices(choices);

  if (!validation.valid) {
    throw new Error(
      validation.error
    );
  }

  const winner = fairSelect(
    validation.choices
  );

  return {
    winner,
    choices:
      validation.choices,
    choiceCount:
      validation.choices.length,
  };
}