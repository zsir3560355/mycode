/*
       Promise必须为以下三种状态的一种：pengding ， Fulfilled , Rejected
       一旦promise被resolve或reject，状态不可逆 immutable
       真正的链式Promise是指在当前promise达到fulfilled状态后，即开始进行下一个promise
      */
new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve({ test: 1 })
    // resolve({ test: 2 })
    reject({ test: 3 });
  }, 1000);
})
  .then(
    (data) => {
      console.log("result1", data);
    },
    (data2) => {
      // return false
      console.log("result2", data2);
    }
  )
  .then(
    (data3) => {
      console.log("result3", data3);
    },
    (data4) => {
      console.log("result4", data4);
    }
  );

function Promise(fn) {
  let state = "pending";
  let value = null;
  const callbacks = [];
  this.then = function (onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      handle({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
    });
  };
  this.catch = function (onError) {
    this.then(null, onError);
  };

  this.finally = function (onDone) {
    this.then(onDone, onDone);
  };
  this.resolve = function (value) {
    if (value && value instanceof Promise) {
      return value;
    } else if (
      value &&
      typeof value === "object" &&
      typeof value.then === "function"
    ) {
      let { then } = value;
      return new Promise((resolve) => {
        then(resolve);
      });
    } else if (value) {
      return new Promise((resolve) => resolve(value));
    } else {
      return new Promise((resolve) => resolve());
    }
  };

  this.reject = function (value) {
    return new Promise((resolve, reject) => {
      reject(value);
    });
  };

  this.race = function (values) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < values.length; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  function handle(callback) {
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }

    const cb =
      state === "fulfilled" ? callback.onFulfilled : callback.onRejected;
    const next = state === "fulfilled" ? callback.resolve : callback.reject;
    if (!cb) {
      next(value);
      return;
    }
    try {
      const ret = cb(value);
      next(ret);
    } catch (error) {
      callback.reject(err);
    }
  }

  function resolve(newValue) {
    const fn = () => {
      if (state !== "pending") return;
      if (
        newValue &&
        (typeof newValue === "object" || typeof newValue === "function")
      ) {
        const { then } = newValue;
        if (typeof then === "function") {
          then.call(newValue, resolve, reject);
          return;
        }
      }
      state = "fulfilled";
      value = newValue;
      handleCb();
    };
    setTimeout(fn, 0);
  }

  function reject(error) {
    const fn = () => {
      if (state !== "pending") return;
      if (error && (typeof error === "object" || typeof error === "function")) {
        const { then } = error;
        if (typeof then === "function") {
          then.call(error, resolve, reject);
        }
      }
      state = "rejected";
      value = error;
      handleCb();
    };
    setTimeout(fn, 0);
  }

  function handleCb() {
    while (callbacks.length) {
      const fulfiledFn = callbacks.shift();
      handle(fulfiledFn);
    }
  }
  fn(resolve, reject);
}
