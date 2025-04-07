import { cn } from '@/lib/utils';

export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={cn(
        `bg-background-secondary placeholder:text-content-placeholder xl hover:border-border-secondary hover:text-content-body active:border-border-tertiary w-full rounded border border-transparent p-3 text-white`,
        props.className,
      )}
    />
  );
}
