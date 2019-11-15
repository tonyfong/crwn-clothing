import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spiner.styles";

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherprops }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherprops} />
    );
  };
  return Spinner;
};

export default WithSpinner;
