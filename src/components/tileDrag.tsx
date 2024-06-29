import { createSignal, onCleanup, onMount } from 'solid-js';
import { convertIndexToString, convertStringToIndex, getTableCellIndex, isMouseEvent, isTouchEvent } from '../common/dragUtils';

export function useTableDragSelect(initialTable?: boolean[][]) {
  let startIndex: string = '';
  let currentIndex: string = '';
  let startTable: boolean[][] = [];
  let mode: boolean = false;

  const [tableRef, setTableRef] = createSignal<HTMLTableElement | null>(null);
  const [tableValue, setTableValue] = createSignal<boolean[][]>(initialTable ?? []);

  function handlePointerStart(e: Event) {
    const index = getTableCellIndex(e);
    if (index === null) {
      return;
    }
    if (isTouchEvent(e) && e.cancelable) {
      e.preventDefault();
    }
    const { rowIndex, colIndex } = index;

    startTable = [...tableValue()];
    startIndex = convertIndexToString(rowIndex, colIndex);

    const newTableValues = [...tableValue()];
    mode = !newTableValues[rowIndex][colIndex];
    newTableValues[rowIndex][colIndex] = mode;

    setTableValue(newTableValues);
  }

  function handlePointerMove(e: Event) {
    if (startIndex === '') return;
    if (isMouseEvent(e) && e.buttons !== 1) return;
    const index = getTableCellIndex(e);
    if (index === null) return;
    const { rowIndex, colIndex } = index;
    const indexString = convertIndexToString(rowIndex, colIndex);
    const isSameAsPrevIndex = indexString === currentIndex;

    if (isSameAsPrevIndex) return;

    currentIndex = indexString;
    const [startRowIndex, startColIndex] = convertStringToIndex(startIndex);
    const [minRow, maxRow] = [startRowIndex, rowIndex].sort((a, b) => a - b);
    const [minCol, maxCol] = [startColIndex, colIndex].sort((a, b) => a - b);

    const newTableValues = tableValue().map(row => row.slice());
    newTableValues.forEach((r, i) => {
      r.forEach((_, j) => {
        if (i < minRow || i > maxRow || j < minCol || j > maxCol) {
          newTableValues[i][j] = startTable[i][j];
        } else {
          newTableValues[i][j] = mode;
        }
      });
    });
    setTableValue(newTableValues);
  }

  function handlePointerEnd(e: Event) {
    startIndex = '';
    if (e.cancelable) {
      e.preventDefault();
    };
  }

  onMount(() => {
    const node = tableRef().querySelector('tbody') ?? tableRef();
    if (!initialTable && node) {
      const trs = node.querySelectorAll('tr');
      const newTableValues: boolean[][] = [];
      trs.forEach(tr => {
        const tds = tr.querySelectorAll('td');
        const row: boolean[] = [];
        tds.forEach(() => {
          row.push(false);
        });
        if (tds.length > 0) {
          newTableValues.push(row);
        }
      });
      setTableValue(newTableValues);
    }
  });

  onMount(() => {
    const node = tableRef().querySelector('tbody') ?? tableRef();
    if (!node) {
      return;
    }
    node.addEventListener('touchstart', handlePointerStart);
    node.addEventListener('mousedown', handlePointerStart);
    node.addEventListener('touchmove', handlePointerMove);
    node.addEventListener('mouseover', handlePointerMove);
    node.addEventListener('touchend', handlePointerEnd);
    node.addEventListener('mouseup', handlePointerEnd);
    onCleanup(() => {
      node.removeEventListener('touchstart', handlePointerStart);
      node.removeEventListener('mousedown', handlePointerStart);
      node.removeEventListener('touchmove', handlePointerMove);
      node.removeEventListener('mouseover', handlePointerMove);
      node.removeEventListener('touchend', handlePointerEnd);
      node.addEventListener('mouseup', handlePointerEnd);
    });
  });

  return [setTableRef, tableValue];
}