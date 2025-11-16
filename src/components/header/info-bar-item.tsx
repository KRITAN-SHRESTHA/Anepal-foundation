export function ContactItem({
  title,
  href,
  value,
  arialabel,
  icon
}: {
  title: string;
  href?: string;
  value: string;
  arialabel?: string;
  icon: React.ReactElement;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="bg-accent-foreground/10 flex size-8 items-center justify-center rounded-full">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium text-gray-600">{title}</span>
        {href ? (
          <a
            href={href}
            className="hover:text-accent-foreground text-sm font-semibold text-gray-900 transition-colors"
            aria-label={arialabel}
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-semibold text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
}
