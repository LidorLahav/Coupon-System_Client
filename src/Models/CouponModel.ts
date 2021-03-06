import CompanyModel from "./CompanyModel";
import CustomerModel from "./CustomerModel";

class CouponModel {
    public id: number;
    public company: CompanyModel;
    public companyId: number;
    public category: string;
    public title: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public amount: number;
    public price: number;
    public imagesFiles: FileList;
    public imagesNames: string[];
    public customers: CustomerModel[];

}

export default CouponModel;
