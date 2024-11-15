import React  from "react";
import { GoogleLogout } from "@react-oauth/google";
const clientId = "226964234531-b8fnlu7fh96jlikvns9fmd745m6crclh.apps.googleusercontent.com";

function Logout(){
    const onSuccess = (res) => {
        console.log("Inicio de sesión exitoso", res.profileObj);
    }
    return(
        <div id="singOutButton">
            <GoogleLogout
                clientId = {clientId}
                buttonText="Sal"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default Logout;