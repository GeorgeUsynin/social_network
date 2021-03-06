import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}


export function withAuthRedirect(Component: ComponentType) {

    const RedirectComponent = (props: MapStateToPropsType) => {

        const {isAuth, ...restProps} = props


        if (!isAuth) return <Redirect to={'/login'}/>

        return <Component {...restProps}/>
    }

    return connect(mapStateToProps)(RedirectComponent)

}