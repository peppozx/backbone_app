(function() {
  const inputs = ["input-name", "input-post"];
  const addClassToLabel = (labelId, className) => {
    let labelEl = document.getElementById(labelId);
    labelEl.classList.add(className);
    return labelEl;
  };
  const removeClassFromLabel = (labelId, className) => {
    let labelEl = document.getElementById(labelId);
    labelEl.classList.remove(className);
    return labelEl;
  };
  const addFocusListenersToInputs = inputs => {
    inputs.forEach(input => {
      let inputEl = document.getElementsByClassName(input)[0];
      if (inputEl) {
        inputEl.addEventListener("focus", e => {
          const targetId = e.target.id;
          switch (targetId) {
            case "input-name":
              removeClassFromLabel("label-nome", "label-normal");
              addClassToLabel("label-nome", "label-focus");
              break;
            case "input-post":
              removeClassFromLabel("label-post", "label-normal");
              addClassToLabel("label-post", "label-focus");
              break;
          }
        });
      }
    });
  };
  const preventDefaultSubmit = () => {
    let el = document.getElementById("post-form");
    el.addEventListener("submit", e => {
      e.preventDefault();
    });
  };
  const addBlurListenersToInputs = inputs => {
    inputs.forEach(input => {
      let inputEl = document.getElementsByClassName(input)[0];
      if (inputEl) {
        inputEl.addEventListener("blur", e => {
          const targetId = e.target.id;
          switch (targetId) {
            case "input-name":
              if (!e.target.value) {
                removeClassFromLabel("label-nome", "label-focus");
                addClassToLabel("label-nome", "label-normal");
              }
              break;
            case "input-post":
              if (!e.target.value) {
                removeClassFromLabel("label-post", "label-focus");
                addClassToLabel("label-post", "label-normal");
              }
              break;
          }
        });
      }
    });
  };
  addFocusListenersToInputs(inputs);
  addBlurListenersToInputs(inputs);
  preventDefaultSubmit();
})();
