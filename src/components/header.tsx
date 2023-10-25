
interface HeaderProps {
  heading: string;
  description?: string;
}

export function Header({ heading }: HeaderProps) {
  return (
    <header className="flex">
      <div className="grid gap-1 p-2 md:p-4">
        <h1 className="font-heading text-xl md:text-2xl">{heading}</h1>
      </div>
    </header>
  );
}
