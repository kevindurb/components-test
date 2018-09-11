export const test = (description, cb) => {
  console.group(description);
  try {
    cb();
  } catch (e) {
    console.log(`%c${e.message}`, 'color: red;');
  }
  console.groupEnd();
};

export const assert = (x, description = 'assertion was truthy') => {
  if (!x) {
    throw new Error(description);
  } else {
    console.log(`%c${description}`, 'color: green;');
  }
};

export function spy (implementation = () => undefined) {
  const returnSpy = function(...args) {
    returnSpy.calls.push(args);
    return implementation(...args);
  };
  returnSpy.calls = [];
  return returnSpy;
};
