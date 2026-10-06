import {
  CONTENT,
} from "@/constants/content";

/*
 * messages.js intentionally contains no user-facing copy.
 *
 * CONTENT is the single source of truth.
 *
 * This file provides semantic application-level access
 * for areas of the application that work with messages.
 */

export const MESSAGES = {
  validation: {
    minimum:
      CONTENT.validation.minimumChoices,

    maximum:
      CONTENT.validation.maximumChoices,
  },

  errors: {
    noDecision:
      CONTENT.errors.noDecision,

    noWinner:
      CONTENT.errors.noWinner,

    storage:
      CONTENT.errors.storage,
  },

  result: {
    copied:
      CONTENT.result.copied,
  },
};