export const wordDivider = {
  // Japanese and Chinese usually don't use a word devider.
  '': [
    /^ja/,
    /^ojp$/,
    /^cn-/,
  ],

  // Other languages use a space as a word devider.
  '\u0020': [
    /.*/,
  ],
};

export const verticalRLLangs = [
  /^ja/,
  /^ojp$/,
  /^cn-/,
];
