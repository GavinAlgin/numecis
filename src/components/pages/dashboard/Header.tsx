import { PanelLeft } from "lucide-react";

type HeaderProps = {
  onOpenSidebar: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 p-3 md:hidden">
      <button onClick={onOpenSidebar}>
        <PanelLeft className="size-5" />
      </button>

      <h1 className="font-semibold">Dashboard</h1>
    </header>
  );
}