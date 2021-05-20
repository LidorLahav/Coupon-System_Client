import CompanyModel from "./CompanyModel";
import CustomerModel from "./CustomerModel";

class CouponModel {
    public id: number;
    public company: CompanyModel;
    public category: string;//enum
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public image: FileList;
    public images: string[];
    public customers: CustomerModel[];

}

export default CouponModel;