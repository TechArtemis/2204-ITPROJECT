// Third-party import
import { Types } from "mongoose";
// Local Import
import Database from "@/backend/database";
import { JobPosting } from "@/interface/JobPosting";
import { Model as jobPostingModel } from "@/backend/database/ODM/JobPosting";

export async function createJobPosting(jobPosting: JobPosting) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPost = new jobPostingModel(
            {
                companyName: jobPosting.companyName,
                companyContact: jobPosting.companyContact,
                companyLocation: jobPosting.companyLocation,
                companyAbout: jobPosting.companyAbout,
                jobDescription: jobPosting.jobDescription,
                jobTitle: jobPosting.jobTitle,
                employment: jobPosting.employment,
                requiredDocuments: jobPosting.requiredDocuments,
                optionalDocuments: jobPosting.optionalDocuments,
                datePosted: jobPosting.datePosted,
                approvalState: jobPosting.approvalState,
            }
        );
        await jobPost.save();
        return { code: 200, message: jobPosting }; // use data from jobPosting to fill up info for email to admin
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function getJobPosting(_id: String | Types.ObjectId) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Invalid Job Posting" };
        }
        return { code: 200, message: jobPostingExist };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function approveJobPosting(_id: String | Types.ObjectId) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Invalid Job Posting" };
        }
        await jobPostingModel.findOneAndUpdate({ _id }, { approvalState: JobPosting.ProjectApproval.Approved }, { new: true });
        return { code: 200, message: "Success" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function rejectJobPosting(_id: String | Types.ObjectId) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Invalid Job Posting" };
        }
        await jobPostingModel.findOneAndUpdate({ _id }, { approvalState: JobPosting.ProjectApproval.Rejected }, { new: true });
        return { code: 200, message: "Success" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function updateJobPosting(_id: String | Types.ObjectId, jobPosting: JobPosting) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Invalid Job Posting" };
        }
        const newJobPosting = await jobPostingModel.findOneAndUpdate({ _id },
            {
                companyName: jobPosting.companyName,
                companyContact: jobPosting.companyContact,
                companyLocation: jobPosting.companyLocation,
                companyAbout: jobPosting.companyAbout,
                jobDescription: jobPosting.jobDescription,
                jobTitle: jobPosting.jobTitle,
                employment: jobPosting.employment,
                requiredDocuments: jobPosting.requiredDocuments,
                optionalDocuments: jobPosting.optionalDocuments,
                datePosted: jobPosting.datePosted,
                approvalState: JobPosting.ProjectApproval.Pending,
            },
            { new: true });
        return { code: 200, newJobPosting };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function deletePosting(_id: String | Types.ObjectId) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Job does not exist" };
        }
        await jobPostingModel.findOneAndDelete({ _id });
        return { code: 200, message: "Success" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function getAllPosting() {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const allPost = await jobPostingModel.find();
        return { code: 200, message: allPost };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

export async function deleteExpired() {
    try {
        const today = new Date();
        const date = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
        await jobPostingModel.deleteMany({ datePosted: { $gt: date } }); // if this does not work, try LESS THAN (>)
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}


// todays date < expiry
// expiry < today
// 01/30/2023 < 01/25/2023
// 01/28/2023 > 12/27/2022
