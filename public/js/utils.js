'use strict';

// Global utility functions that can be used
// accross the application.
//
// These should be generic, and not specific to any
// part of our application.
//

// copies properties from source onto target object
function merge(source, target) {
  if (!source) return;
  Object.keys(source).forEach(function (key) {
    target[key] = source[key];
  });
  return target;
};

// Only add item to list, if not already in list
function addUnique(list, item) {
  if (list.indexOf(item) === -1)
    list.push(item);
};

// Remove the given item from the list
function remove(list, item) {
  var index = list.indexOf(item);
  return list.splice(index, 1)[0];
};
