import React, {Component} from 'react';

export function unwrap(element) {
  return addKeys(element.props.children);
};

export function addKeys(arr) {
  return arr.map((obj, idx) => {
    if (obj instanceof Object && obj.hasOwnProperty('key') && obj.key === null) {
      return React.cloneElement(obj, {key: idx});
    }
    return obj;
  });
};