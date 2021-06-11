module.exports = {
  process(sourceText, sourcePath, transformOptions) {
    return `module.exports.plainText = ${JSON.stringify(sourceText)};`;
  },
};
