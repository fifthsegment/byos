import React from "react";

export const ContextMenu = () => {
  const [anchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  /*
  const _handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  */

  return (
    <>
      <div>
        Context Menu
      </div>
    </>)
}
