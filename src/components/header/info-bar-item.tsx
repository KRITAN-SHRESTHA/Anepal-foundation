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
    <div className="flex items-center gap-2">
      {icon}
      <div className="flex flex-col">
        <span className="text-sm">{title}:</span>
        {href ? (
          <a
            href={href}
            className="text-muted-foreground hover:text-primary text-sm leading-[100%] font-semibold"
            aria-label={arialabel}
          >
            {value}
          </a>
        ) : (
          <p className="text-muted-foreground text-sm leading-[100%] font-semibold">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
