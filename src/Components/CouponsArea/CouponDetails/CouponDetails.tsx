import { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import "./CouponDetails.css";
import CouponModel from "../../../Models/CouponModel";
import LogoImage from "../../../Assests/Images/Coupons_logo.png"
import store, { getCategory } from "../../../Redux/Stores";
import Button from '@material-ui/core/Button';
import notify from "../../../Services/Notification";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Purchase from "../../CustomerArea/Purchase/Purchase";
import axios from "axios";
import globals from "../../../Services/Globals";
import jwtAxios from "../../../Services/jwtAxios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
interface RouteParam{
   id: string;
   category: string;
}
interface CouponDetailsProps extends RouteComponentProps<RouteParam>{
	
}

interface imagesSrc{
    src: string
}

interface CouponDetailsState {
	coupon: CouponModel;
    images: string[];
}

class CouponDetails extends Component<CouponDetailsProps, CouponDetailsState> {

    public constructor(props: CouponDetailsProps) {
        super(props);
        this.state = {
            coupon: null,
            images: []
        }; 
    }

    public componentDidMount() {
        try {
            const id = +this.props.match.params.id;//the + is for converting string to number 
            const category = this.props.match.params.category;
            let coupon = getCategory("").find(c => c.id === id);
            if(coupon == undefined){
                coupon = getCategory(category).find(c => c.id === id);
            }
            
            this.setState({
                coupon: coupon,
                images: coupon.images
            });
        }
        catch (err) {
            notify.error(err);
        }
    }
    
    public handlePurchase = () => {
        this.purchaseCoupon();
    }

    private async purchaseCoupon() {
        try {
          const headers = {
            'token': store.getState().AuthState.user.token,
            'couponId': this.state.coupon.id,
            'email': store.getState().AuthState.user.email
          }
          await jwtAxios.put(globals.urls.customer.coupons, null, {headers});
          notify.success("You have been successfully purchasing the coupon.");
        }
        catch(err) {
          notify.error(err);
        }
    }

    public render(): JSX.Element {

        return (
            <div className="CouponDetails">
                {this.state.coupon && 
                    <>
                        <h2>Coupon Details</h2>
                        <h3>Title: {this.state.coupon.title}</h3>
                        <h3>Price: {this.state.coupon.price}</h3>
                        <h3>Amount: {this.state.coupon.amount}</h3>
                        <h3>Description: {this.state.coupon.description}</h3>
                        <Carousel>
                                {this.state.images.map(src => 
                                    <div>
                                        <img src={src}/>
                                    </div>
                                )}
                        </Carousel>
                        {/* <img src={globals.urls.couponImages + this.state.coupon.imageName}/> */}
                        {store.getState().AuthState.user != null && 
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<ShoppingCartOutlinedIcon />}
                                onClick={this.handlePurchase}
                            >
                                Buy Now
                            </Button> 
                        }
                        <br /> <br />
                        <NavLink to ="/coupons">Back</NavLink>
                    </>
                }
            </div>
        );
    }
}

export default CouponDetails;
