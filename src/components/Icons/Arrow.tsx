export default function Arrow({
  className,
}: {
  className?: string;
}) {
  return (
    <svg className={className || ""} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99999 8.78129L11.3 5.48129L12.2427 6.42396L7.99999 10.6666L3.75732 6.42396L4.69999 5.48129L7.99999 8.78129Z" fill="currentColor" />
    </svg>
  );
}
