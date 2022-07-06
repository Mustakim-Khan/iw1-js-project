
const droppables = document.querySelectorAll('.droppable');
const draggables = document.querySelectorAll('.draggable');
const transitionTime = 500;
let dragging;
let cloned;

document.body.style.setProperty('--transitionTime', transitionTime + 'ms');

function cleanClass(className) {
  const elements = document.querySelectorAll(`.${className}`);
  for (const el of elements) {
    el.classList.remove(className);
  }
}

// drag start
document.addEventListener('dragstart', e => {
  if (e.target.classList.contains('draggable')) {
    dragging = e.target;
    dragging.classList.add('dragging');
    cloned = dragging.cloneNode(true);
  }
});

function handleDragEnd() {
  if (!dragging) return;
  dragging.classList.add('will-remove');
  setTimeout(() => {
    dragging.remove();
    cleanClass('dragging');
  }, [transitionTime]);
}

// drag end
document.addEventListener('dragend', e => {
  cleanClass('dragging');
  cleanClass('new-added');
});

// drag over
droppables.forEach(droppable => {
  droppable.addEventListener('dragover', e => {
    e.preventDefault();
    
    const frontSib = getClosestFrontSibling(droppable, e.clientY);

    const previousSib = dragging.previousElementSibling;
    if (frontSib) {
      if (
        frontSib.nextElementSibling === cloned ||
        frontSib === cloned ||
        frontSib === previousSib
      ) {
        return;
      }
      cloned.classList.add('new-added');
      frontSib.insertAdjacentElement('afterend', cloned);
      handleDragEnd(dragging);
    } else {
      if (
        droppable.firstChild === cloned ||
        droppable.firstChild === dragging
      ) {
        return;
      }
      if (dragging.parentNode === droppable && !previousSib) {
        return;
      }
      
      cloned.classList.add('new-added');
      droppable.prepend(cloned);
      handleDragEnd(dragging);
    }
  });
});

function getClosestFrontSibling(droppable, draggingY) {
  const siblings = droppable.querySelectorAll('.draggable:not(.dragging)');
  let result;

  for (const sibling of siblings) {
    const box = sibling.getBoundingClientRect();
    
    const boxCenterY = box.y + box.height / 2;
    if (draggingY >= boxCenterY) {
      result = sibling;
    } else {
      
      return result;
    }
  }

  return result;
}

