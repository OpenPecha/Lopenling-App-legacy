import React from "react";
import { connect } from "react-redux";
import * as reducers from "reducers";
import * as actions from "actions";
import SelectedText from "./SelectedText";

let user;

const mapStateToProps = state => {

    if(!state.user.userId===-1){
        user=state.user
    }
    return {
        title: reducers.getTranslation(state, "header.title"),
        Textdata: reducers.getTextTitle(state)
    };
};

const matchDispatchToProps = dispatch => {
    return {
        onChangedTextWidth: (width: number) => {
            dispatch(actions.changedTextListWidth(width));
        },
        onChangedTextTitle:(title:string | null)=>{
          dispatch(actions.selectTextTitle(title))
        },
        onChangeLanguage: (selectedLanguage :string)=>{
            dispatch(actions.changeLanguage(selectedLanguage));
        },
        dispatch
    };
};

const SelectedTextContainer = connect(mapStateToProps, matchDispatchToProps)(SelectedText);

     

export default SelectedTextContainer;