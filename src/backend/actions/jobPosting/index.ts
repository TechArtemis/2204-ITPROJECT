// Third-party import
import { Types } from "mongoose";
// Local Import
import Database from "@/backend/database";
import { JobPosting } from "@/interface/JobPosting";
import { Model as jobPostingModel } from "@/backend/database/ODM/JobPosting";

export async function createJobPosting(jobPosting: JobPosting) {
    await Database.setup(process.env.MONGODB_URI);
    const jobPost = new jobPostingModel(
        {
            company: jobPosting.company,
            jobEmail: jobPosting.jobEmail,
            jobDescription: jobPosting.jobDescription,
            jobTitle: jobPosting.jobTitle,
            employmentType: jobPosting.employmentType,
            documentType: jobPosting.documentType,
            datePosted: jobPosting.datePosted,
            approvalState: jobPosting.approvalState,
            jobApplication: jobPosting.jobApplication
        }
    );
    await jobPost.save();
    return { code: 200, jobPosting }; // use data from jobPosting to fill up info for email to admin
}

export async function approveJobPosting(_id: String | Types.ObjectId) {
    await Database.setup(process.env.MONGODB_URI);
    const jobPostingExist = jobPostingModel.findOne({ _id });
    if (!jobPostingExist) {
        return { code: 400, message: "Job does not exist" };
    }
    await jobPostingModel.findOneAndUpdate({ _id }, { approvalState: JobPosting.ProjectApproval.Approved }, { new: true });
    return { code: 200, message: "Success" };
}

export async function rejectJobPosting(_id: String | Types.ObjectId) {
    await Database.setup(process.env.MONGODB_URI);
    const jobPostingExist = jobPostingModel.findOne({ _id });
    if (!jobPostingExist) {
        return { code: 400, message: "Job does not exist" };
    }
    await jobPostingModel.findOneAndUpdate({ _id }, { approvalState: JobPosting.ProjectApproval.Rejected }, { new: true });
    return { code: 200, message: "Success" };
}

export async function updateJobPosting(_id: String | Types.ObjectId, jobPosting: JobPosting) {
    await Database.setup(process.env.MONGODB_URI);
    const jobPostingExist = jobPostingModel.findOne({ _id });
    if (!jobPostingExist) {
        return { code: 400, message: "Job does not exist" };
    }
    const newJobPosting = await jobPostingModel.findOneAndUpdate({ _id },
        {
            company: jobPosting.company,
            jobEmail: jobPosting.jobEmail,
            jobDescription: jobPosting.jobDescription,
            jobTitle: jobPosting.jobTitle,
            employmentType: jobPosting.employmentType,
            documentType: jobPosting.documentType,
            datePosted: jobPosting.datePosted,
            approvalState: JobPosting.ProjectApproval.Pending,
            jobApplication: jobPosting.jobApplication
        },
        { new: true });
    return { code: 200, newJobPosting };
}

export async function deletePosting(_id: String | Types.ObjectId) {
    await Database.setup(process.env.MONGODB_URI);
    const jobPostingExist = jobPostingModel.findOne({ _id });
    if (!jobPostingExist) {
        return { code: 400, message: "Job does not exist" };
    }
    await jobPostingModel.findOneAndDelete({ _id });
    return { code: 200, message: "Success" };
}

export async function getAllPosting() {
    await Database.setup(process.env.MONGODB_URI);
    const allPost = await jobPostingModel.find();
    return { code: 200, allPost };
}

export async function deleteExpired() {
    const today = new Date();
    const date = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    await jobPostingModel.deleteMany({ datePosted: { $gt: date } }); // if this does not work, try LESS THAN (>)
}


// todays date < expiry
// expiry < today
// 01/30/2023 < 01/25/2023
// 01/28/2023 > 12/27/2022
