/** True for review builds (`pnpm build:review`). Highlights [CONFIRM] markers and shows the open-question boxes. */
export const IS_REVIEW = process.env.NEXT_PUBLIC_REVIEW === "1";
