import React from "react";
import { Route, Switch, Redirect} from "react-router"; 
import { BrowserRouter } from "react-router-dom";

import UserPage from "../../pages/user";
import HomePage from "../../pages/home";
import StudentPage from "../../pages/student";
import CompanyPage from "../../pages/company";
import SearchPage from "../../pages/search";

export default function SiteRoute(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/home">
            <HomePage />
            </Route>
            <Route path="/user">
            <UserPage />
            </Route>
            <Route path="/student">
            <StudentPage />
            </Route>
            <Route path="/company">
            <CompanyPage />
            </Route>
            <Route path="/search">
            <SearchPage />
            </Route>
            <Redirect to="/home"/>
        </Switch>
        </BrowserRouter>
    );
}