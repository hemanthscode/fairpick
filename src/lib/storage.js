const STORAGE_PREFIX = "fairpick:";

function getKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

function canUseStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !==
      "undefined"
  );
}

export function getStorage(
  key,
  fallback = null
) {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const value =
      window.localStorage.getItem(
        getKey(key)
      );

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(
      "FairPick storage read failed:",
      error
    );

    return fallback;
  }
}

export function setStorage(
  key,
  value
) {
  if (!canUseStorage()) {
    return false;
  }

  try {
    window.localStorage.setItem(
      getKey(key),
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(
      "FairPick storage write failed:",
      error
    );

    return false;
  }
}

export function removeStorage(key) {
  if (!canUseStorage()) {
    return false;
  }

  try {
    window.localStorage.removeItem(
      getKey(key)
    );

    return true;
  } catch (error) {
    console.error(
      "FairPick storage removal failed:",
      error
    );

    return false;
  }
}

export function clearFairPickStorage() {
  if (!canUseStorage()) {
    return false;
  }

  try {
    const keys = [];

    for (
      let index = 0;
      index <
      window.localStorage.length;
      index += 1
    ) {
      const key =
        window.localStorage.key(
          index
        );

      if (
        key?.startsWith(
          STORAGE_PREFIX
        )
      ) {
        keys.push(key);
      }
    }

    keys.forEach((key) => {
      window.localStorage.removeItem(
        key
      );
    });

    return true;
  } catch (error) {
    console.error(
      "FairPick storage clear failed:",
      error
    );

    return false;
  }
}