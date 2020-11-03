import React, { useState } from "react";
import { Button, Confirm, Icon, TransitionablePortal } from "semantic-ui-react";

export default function DeleteButton(params) {
  const { id, callback } = params;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteRestaurant = () => {
    setConfirmOpen(false);
    if (callback) callback(id);
  };

  return (
    <>
      <Button
        color="red"
        onClick={() => setConfirmOpen(true)}
        style={{
          padding: "11px 6px 11px 10px",
        }}
      >
        Delete   
        <Icon name="trash" />
      </Button>
      <TransitionablePortal
        open={confirmOpen}
        transition={{ animation: "fly down", duration: 700 }}
      >
        <Confirm
          open={true}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={deleteRestaurant}
        />
      </TransitionablePortal>
    </>
  );
}
