// Third-party import
import { Types } from "mongoose";

// Local Import
import Database from "@/backend/database";
import { JobPosting } from "@/interface/JobPosting";
import { Model as jobPostingModel } from "@/backend/database/ODM/JobPosting";

/**
 * A function that creates a new JobPosting in the database
 * @param jobPosting The new JobPosting object
 * @returns a code and a message
 */
export async function createJobPosting(jobPosting: JobPosting) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPost = new jobPostingModel(
            {
                companyName: jobPosting.companyName,

                companyImage: jobPosting.companyImage,
                companyContact: jobPosting.companyContact,
                companyLocation: jobPosting.companyLocation,
                companyAbout: jobPosting.companyAbout,
                jobDescription: jobPosting.jobDescription,
                jobType: jobPosting.jobType,
                jobTitle: jobPosting.jobTitle,
                employment: jobPosting.employment,
                datePosted: jobPosting.datePosted,
                tags: jobPosting.tags
            }
        );
        await jobPost.save();


        return { code: 200, message: jobPosting }; // use data from jobPosting to fill up info for email to admin
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * gets the job posting from the database
 * @param _id used to identify which job posting to get
 * @returns the job posting that matches the ID
 */
export async function getJobPosting(_id: String | Types.ObjectId) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist: JobPosting | null = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Invalid Job Posting" };
        }


        return { code: 200, message: jobPostingExist };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

// /**
//  * A function that changes the approval state of a job posting in the database
//  * @param _id the ID of the job posting to be changed
//  * @returns a code and a message
//  */
// export async function approveJobPosting(_id: String | Types.ObjectId) {
//     try {
//         await Database.setup(process.env.MONGODB_URI);
//         const jobPostingExist = await jobPostingModel.findOne({ _id });
//         if (!jobPostingExist) {
//             return { code: 400, message: "Invalid Job Posting" };
//         }
//         await jobPostingModel.findOneAndUpdate({ _id }, { approvalState: JobPosting.ProjectApproval.Approved }, { new: true });
//         return { code: 200, message: "Success" };
//     } catch (error: any) {
//         return { code: 500, message: error.message };
//     }
// }

// /**
//  * A function that changes the approval state to rejected
//  * @param _id used to identify which job posting to get
//  * @returns a code and message
//  */
// export async function rejectJobPosting(_id: String | Types.ObjectId) {
//     try {
//         await Database.setup(process.env.MONGODB_URI);
//         const jobPostingExist = await jobPostingModel.findOne({ _id });
//         if (!jobPostingExist) {
//             return { code: 400, message: "Invalid Job Posting" };
//         }
//         await jobPostingModel.findOneAndUpdate({ _id }, { approvalState: JobPosting.ProjectApproval.Rejected }, { new: true });
//         return { code: 200, message: "Success" };
//     } catch (error: any) {
//         return { code: 500, message: error.message };
//     }
// }

/**
 * A function that updates an existing job posting
 * @param _id used to identify which job posting to get
 * @param jobPosting has the new details to update the old jobPost
 * @returns the new job posting
 */
export async function updateJobPosting(_id: String | Types.ObjectId, jobPosting: JobPosting) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist: JobPosting | null = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Invalid Job Posting" };
        }
        const newJobPosting = await jobPostingModel.findOneAndUpdate({ _id },
            {

                companyImage: jobPosting.companyImage,
                companyName: jobPosting.companyName,
                companyContact: jobPosting.companyContact,
                companyLocation: jobPosting.companyLocation,
                companyAbout: jobPosting.companyAbout,
                jobDescription: jobPosting.jobDescription,
                jobType: jobPosting.jobType,
                jobTitle: jobPosting.jobTitle,
                employment: jobPosting.employment,
                datePosted: jobPosting.datePosted,
                tags: jobPosting.tags
            },
            { new: true });


        return { code: 200, message: newJobPosting };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that deletes a Job Posting in the database.
 * @param _id used to get a specific Job Posting in the database
 * @returns a code and a message
 */
export async function deletePosting(_id: String | Types.ObjectId) {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const jobPostingExist: JobPosting | null = await jobPostingModel.findOne({ _id });
        if (!jobPostingExist) {
            return { code: 400, message: "Job does not exist" };
        }
        await jobPostingModel.findOneAndDelete({ _id });


        return { code: 200, message: "Success" };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that returns all job posts
 * @returns all job posts
 */
export async function getAllPosting() {
    try {
        await Database.setup(process.env.MONGODB_URI);
        const allPost: JobPosting[] = await jobPostingModel.find({});
        
        return { code: 200, message: allPost };
    } catch (error: any) {
        return { code: 500, message: error.message };
    }
}

/**
 * A function that deletes all Job Posting that is more than 30 days old
 * @returns a code and a message
 */
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
