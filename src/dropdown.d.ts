type DropdownOverlay =
  | React.ReactNode
  | ((collapsed: boolean, toggleCollapsed: (val: boolean) => void) => React.ReactNode);

interface DropdownProps {
  children: React.ReactNode | string;
  overlay: DropdownOverlay;
}
