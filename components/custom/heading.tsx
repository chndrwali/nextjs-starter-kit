interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};
