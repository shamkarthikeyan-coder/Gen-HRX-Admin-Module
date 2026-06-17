import { createContext, useContext } from "react";

/** Shared hover state for the collapsing sidebar. The rail is in-flow, so when it expands the
 *  main content reflows automatically; fixed elements (the detail-page action bars) read this to
 *  shift their left edge in sync with the rail's width. */
interface SidebarState {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}

export const SidebarContext = createContext<SidebarState>({
  expanded: false,
  setExpanded: () => {},
});

export const useSidebar = () => useContext(SidebarContext);
