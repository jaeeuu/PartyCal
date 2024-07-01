function isMouseEvent(event: Event): event is MouseEvent {
  return event instanceof MouseEvent;
}

function isTouchEvent(event: Event): event is TouchEvent {
  return 'ontouchstart' in window && event.type.startsWith('touch');
}

function getTileIndex(e: Event) {
  let target = null;
  if (isTouchEvent(e) && e.touches) {
    const { clientX, clientY } = e.touches[0];
    target = document.elementFromPoint(clientX, clientY);
  } else if (isMouseEvent(e)) {
    target = e.target;
  } else {
    return [-1, -1];
  }
  const x = parseInt(target.dataset.row, 10);
  const y = parseInt(target.dataset.col, 10);
  if (isNaN(x) || isNaN(y)) return [-1, -1];
  return [x, y];
}

export function handlePointerStart(e: Event, vars, setTile) {
  const [x, y] = getTileIndex(e);
  if (x === -1) return;
  if (isTouchEvent(e) && e.cancelable) e.preventDefault();
  if (isMouseEvent(e) && e.buttons !== 1) return;
  setTile((prev) => {
    vars.startTile = [x, y, !prev[x][y]];
    const newTableValues = prev.map(row => [...row]);
    newTableValues[x][y] = vars.startTile[2];
    vars.memTile = [...newTableValues];
    return newTableValues;
  });
}

export function handlePointerMove(e: Event, vars, setTile) {
  const [x, y] = getTileIndex(e);
  if (vars.startTile[0] === -1 || x === -1) return;
  if (x === vars.currentTile[0] && y === vars.currentTile[1]) {
    return;
  } else {
    vars.currentTile = [x, y];
  }
  if (isMouseEvent(e) && e.buttons !== 1) return;
  if (vars.startTile[0] === x && vars.startTile[1] === y) {
    setTile([...vars.memTile]);
    return;
  }

  const minX = Math.min(vars.startTile[0], x);
  const maxX = Math.max(vars.startTile[0], x);
  const minY = Math.min(vars.startTile[1], y);
  const maxY = Math.max(vars.startTile[1], y);

  setTile((prev) => {
    const newTableValues = prev.map(row => [...row]);
    newTableValues.forEach((r: boolean[], i: number) => {
      r.forEach((_: boolean, j: number) => {
      if (i < minX || i > maxX || j < minY || j > maxY) {
        newTableValues[i][j] = vars.memTile[i][j];
      } else {
        newTableValues[i][j] = vars.startTile[2];
      }
      });
    });
    return newTableValues;
  });
}

export function handlePointerEnd(e: Event, vars) {
  if (e.cancelable) e.preventDefault();
  vars.startTile = [-1, -1, false];
}
