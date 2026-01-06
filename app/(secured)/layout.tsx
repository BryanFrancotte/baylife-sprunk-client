type Props = {
  children: React.ReactNode;
};

export default function SecuredLayout({ children }: Props) {
  return <>{children}</>;
}