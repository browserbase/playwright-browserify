// custom-fs.js

const bfs = require("browserify-fs"); // The browserify version of 'fs'

const originalPromises = bfs.promises || {}; // Preserve original promises if they exist

// Extend or add the promises object
bfs.promises = {
  ...originalPromises, // Spread existing promise-based methods
  mkdtemp: async (prefix) => {
    // Custom implementation for mkdtemp
    return `${prefix}${Date.now()}`; // Mock implementation
  },
  mkdir: async (path) => {
    // Custom implementation for mkdir
    return `${path} created`; // Mock implementation
  },
  writeFile: async (path, data) => {
    // Custom implementation for writeFile
    return `${path} written with ${data}`; // Mock implementation
  },
  rmdir: async (path) => {
    // Custom implementation for rmdir
    return `${path} removed`; // Mock implementation
  },
  rm: async (path) => {
    // Custom implementation for rm
    return `${path} removed`; // Mock implementation
  },
  // Add other promise-based methods if necessary
};

module.exports = bfs; // Export the extended version
