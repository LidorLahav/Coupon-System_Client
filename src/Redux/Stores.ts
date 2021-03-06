import { combineReducers, createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";
import CouponModel from "../Models/CouponModel";
import CustomerModel from "../Models/CustomerModel";
import { AdminReducer } from "./AdminState";
import { AuthReducer } from "./AuthState";
import { CouponSet, couponsReducer } from "./CouponsState";
import { SharedReducer } from "./SharedState";

const reducers = combineReducers({ CouponsState: couponsReducer, AuthState: AuthReducer, SharedState: SharedReducer, AdminState: AdminReducer });
const store = createStore(reducers);

export function getCategory(category: string): CouponSet {
    switch (category) {
        case "Electricity":
            return store.getState()?.CouponsState.category.Electricity;
        case "Spa":
            return store.getState()?.CouponsState.category.Spa;
        case "Restaurant":
            return store.getState()?.CouponsState.category.Restaurant;
        case "Vacation":
            return store.getState()?.CouponsState.category.Vacation;
        case "Attractions":
            return store.getState()?.CouponsState.category.Attractions;
        case "Furniture":
            return store.getState()?.CouponsState.category.Furniture;
        case "Sport":
            return store.getState()?.CouponsState.category.Sport;
        case "All":
            return store.getState()?.CouponsState.category.All;
    }
}

export function getUserCategory(category: string, clientType: CustomerModel | CompanyModel): CouponModel[] {
    switch (category) {
        case "Electricity":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.Electricity;
        case "Spa":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.Spa;
        case "Restaurant":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.Restaurant;
        case "Vacation":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.Vacation;
        case "Attractions":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.Attractions;
        case "Furniture":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.Furniture;
        case "Sport":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.Sport;
        case "All":
            return (store.getState()?.AuthState.user as typeof clientType).coupons.All;
    }
}

export default store;
