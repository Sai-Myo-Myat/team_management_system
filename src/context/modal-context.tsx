// let implement a context for managing modal state in a React application with useReducer. Open a modal with a specific type and close it.

import { Team } from "@/types";
import React, { createContext, useReducer, ReactNode } from "react";

// Define the types of modals
type ModalType = "TEAM_MODAL";

// Define the state structure for the modal
interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  data?: Team; // Optional data to pass to the modal
}
// Define the actions for the reducer
interface OpenModalAction {
  type: "OPEN_MODAL";
  payload: {
    modalType: ModalType;
    data?: Team; // Optional data to pass to the modal
  };
}
interface CloseModalAction {
  type: "CLOSE_MODAL";
}

type Action = OpenModalAction | CloseModalAction;
// Initial state for the modal
const initialState: ModalState = {
  isOpen: false,
  type: null,
  data: undefined,
};
// Create the reducer function
const modalReducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isOpen: true,
        type: action.payload.modalType,
        data: action.payload.data,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isOpen: false,
        type: null,
        data: undefined,
      };
    default:
      return state;
  }
};
// Create the context
interface ModalContextProps {
  state: ModalState;
  openModal: (modalType: ModalType, data?: Team) => void;
  closeModal: () => void;
}
export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

// Create the provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (modalType: ModalType, data?: Team) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { modalType, data },
    });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <ModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
// Custom hook to use the ModalContext
export const useModal = (): ModalContextProps => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
