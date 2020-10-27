import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";

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
          paddingRight: "6px",
          padding: "11px 4px 11px 10px",
        }}
      >
        Delete   
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteRestaurant}
      />
    </>
  );
}
