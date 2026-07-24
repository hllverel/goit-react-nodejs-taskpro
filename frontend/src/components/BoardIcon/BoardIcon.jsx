import './BoardIcon.css';

function BoardIcon({ iconId = 'grid', size = 18 }) {
  const symbolIds = {
    grid: 'icon-board-grid',
    sparkle: 'icon-board-sparkle',
    swirl: 'icon-board-swirl',
    puzzle: 'icon-board-puzzle',
    cube: 'icon-board-cube',
    bolt: 'icon-board-bolt',
    circles: 'icon-board-circles',
    hexagon: 'icon-board-hexagon',
  };

  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className="board-icon"
    >
      <use href={`/icons.svg#${symbolIds[iconId] || symbolIds.grid}`} />
    </svg>
  );
}

export default BoardIcon;
