import './BoardIcon.css';

function BoardIcon({ iconId = 'grid', size = 18 }) {
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    className: 'board-icon',
  };

  const paths = {
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="2" />
        <rect x="14" y="4" width="6" height="6" rx="2" />
        <rect x="4" y="14" width="6" height="6" rx="2" />
        <rect x="14" y="14" width="6" height="6" rx="2" />
      </>
    ),
    sparkle: <path d="M12 3l2.2 6.1L20 12l-5.8 2.9L12 21l-2.2-6.1L4 12l5.8-2.9L12 3z" />,
    swirl: (
      <>
        <path d="M12 4a8 8 0 1 1-7.4 5" />
        <path d="M12 4a8 8 0 0 0-7.4 5" />
        <path d="M12 20a8 8 0 0 0 7.4-5" />
        <path d="M12 20a8 8 0 0 1 7.4-5" />
      </>
    ),
    puzzle: (
      <path d="M8 3h5v4h2a2 2 0 1 1 0 4h-2v3h-3v2a2 2 0 1 1-4 0v-2H3V9h5V7a2 2 0 1 0 0-4z" />
    ),
    cube: (
      <>
        <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />
        <path d="M3.3 7.7L12 13l8.7-5.3" />
        <path d="M12 21V13" />
      </>
    ),
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
    circles: (
      <>
        <circle cx="8" cy="8" r="4" />
        <circle cx="16" cy="8" r="4" />
        <circle cx="12" cy="16" r="4" />
      </>
    ),
    hexagon: <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" />,
  };

  return <svg {...iconProps}>{paths[iconId] || paths.grid}</svg>;
}

export default BoardIcon;
