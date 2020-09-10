import React from "react";

const Main = ({ match }) => {
  const { id } = match.params;
  console.log(id);
  return (
    <div>
      <h1>Main</h1>
    </div>
  );
};

export default Main;
