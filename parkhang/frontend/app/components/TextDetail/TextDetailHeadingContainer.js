// @flow
import React from "react";
import { connect } from "react-redux";
import TextDetailHeading from "./TextDetailHeading";
import * as actions from "actions";
import * as reducers from "reducers";
import type { AppState } from "reducers";
import { getTextListVisible, getAccountOverlayVisible, getMenuListVisible } from "reducers";



const mapStateToProps = (state: AppState): {} => {
    const selectedText = reducers.getSelectedText(state);
    let witnesses = [];
    let exportingWitness = false;
    let selectedWitness;
    if (selectedText) {
        witnesses = reducers.getTextWitnesses(state, selectedText.id);
        const selectedWitnessId = reducers.getSelectedTextWitnessId(
            state,
            selectedText.id
        );
        if (selectedWitnessId) {
            selectedWitness = reducers.getWitness(state, selectedWitnessId);
            exportingWitness = reducers.getExportingWitness(
                state,
                selectedWitnessId
            );
        } else {
            selectedWitness = reducers.getWorkingWitness(
                state,
                selectedText.id
            );
        }
    }
    let textFontSize = reducers.getTextFontSize(state);


    return {
        witnesses,
        selectedText,   
        selectedWitness,
        textListIsVisible: getTextListVisible(state),
        menuListIsVisible: getMenuListVisible(state),
        accountOverlayVisible: getAccountOverlayVisible(state),
        textFontSize,
        isSecondWindowOpen:reducers.isSecondWindowOpen(state)

    };
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const navigationButtonClicked= () => {
     dispatchProps.dispatch(
        actions.changedTextListVisible(!stateProps.textListIsVisible)
    ); 
} 
const menuButtonClicked= () => {
    dispatchProps.dispatch(
        actions.changedMenuListVisible(!stateProps.menuListIsVisible)
    );
   
};
const { dispatch } = dispatchProps;
const { selectedText } = stateProps;

return {
    ...ownProps,
    ...stateProps,
    navigationButtonClicked,
    menuButtonClicked,
    onSelectedWitness: (witness: Witness) => {
        dispatch(actions.selectedTextWitness(selectedText.id, witness.id));
    },
    onChangedFontSize: (fontSize: number) => {
        dispatch(actions.changedTextFontSize(fontSize));
    },
    onChangeWindowOpen: (data: boolean) => {
        dispatch(actions.toggleSecondWindow(data));
    }
};
}

const TextDetailHeadingContainer = connect(mapStateToProps, null,mergeProps)(
    TextDetailHeading
);

export default TextDetailHeadingContainer;