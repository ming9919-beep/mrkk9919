export default function RiaLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 760 255"
      className={className}
      role="img"
      aria-label="Ria Money Transfer"
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="#FF5B00">
        <path d="M0 250v-84c0-41 34-74 76-74h32v54H76c-12 0-20 8-20 20v84H0Z" />
        <circle cx="166" cy="36" r="34" />
        <path d="M140 92h56v158h-56z" />
        <path
          fillRule="evenodd"
          d="M299 89a82 82 0 1 0 0 164 82 82 0 0 0 0-164Zm0 52a30 30 0 1 1 0 60 30 30 0 0 1 0-60Z"
        />
      </g>
      <g fill="#001333" fontFamily="Arial, Helvetica, sans-serif" fontSize="86" fontWeight="300">
        <text x="425" y="156">Money</text>
        <text x="425" y="254">Transfer</text>
      </g>
    </svg>
  );
}
