/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges 
 * @param {number} threshold
 * @returns {Array<[number, number]>}
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Step 1: Sort ranges by start time
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);

  // Step 2: Initialize merged result
  const merged = [];
  let [currentStart, currentEnd] = sorted[0];

  // Step 3: Iterate and merge
  for (let i = 1; i < sorted.length; i++) {
    const [nextStart, nextEnd] = sorted[i];

    // If overlap or gap ≤ threshold, merge
    if (nextStart <= currentEnd + threshold) {
      currentEnd = Math.max(currentEnd, nextEnd);
    } else {
      merged.push([currentStart, currentEnd]);
      [currentStart, currentEnd] = [nextStart, nextEnd];
    }
  }

  // Step 4: Push the final range
  merged.push([currentStart, currentEnd]);

  return merged;
};

module.exports = {
  mergeTimeRanges
};
