import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Confirm, Icon, TransitionablePortal } from "semantic-ui-react";

function DeleteButton(params) {
  const { id, callback, user} = params;
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteRestaurant = () => {
    setConfirmOpen(false);
    if (callback) callback(id);
  };

  return (
    <>
      <Button
        color="red"
        onClick={user ? () => setConfirmOpen(true) : () => params.history.push("/login")}
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

export default withRouter(DeleteButton);