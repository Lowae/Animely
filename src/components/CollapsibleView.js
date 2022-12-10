import {useEffect, useState} from 'react';
import CollapsibleComponent from 'react-native-collapsible';

export function CollapsibleView({collapsed, children}) {
  const [renderChildrenCollapsed, setRenderChildrenCollapsed] =
    useState(collapsed);

  useEffect(() => {
    if (!collapsed && renderChildrenCollapsed === false) {
      setRenderChildrenCollapsed(true);
    }
  }, [collapsed, renderChildrenCollapsed]);

  return (
    <CollapsibleComponent
      collapsed={collapsed}
      renderChildrenCollapsed={renderChildrenCollapsed}>
      {children}
    </CollapsibleComponent>
  );
}
