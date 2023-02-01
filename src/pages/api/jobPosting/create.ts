// Third-party import
import { NextApiRequest, NextApiResponse } from "next";
// Local import
import { createJobPosting } from "@/backend/actions/jobPosting";
import { JobPosting } from "@/interface/JobPosting";
import { EMAIL_REGEX } from "@/shared/regex";
import { isValidStr } from "@/shared/stringCheck";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const jobTitleArr = Object.values(JobPosting.JobTitleType);
            const employmentArr = Object.values(JobPosting.EmploymentType);
            const { jobPosting } = req.body;
            if (!isValidStr(jobPosting.companyName)) {
                throw {
                    code: 400,
                    message: "Invalid Company Name"
                };
            }
            if (!EMAIL_REGEX.test(jobPosting.companyContact)) {
                throw {
                    code: 400,
                    message: "Invalid Contact"
                };
            }
            if (!isValidStr(jobPosting.companyAbout)) {
                throw {
                    code: 400,
                    message: "Invalid Company About"
                };
            }
            if (!isValidStr(jobPosting.jobDescription)) {
                throw {
                    code: 400,
                    message: "Invalid Job Description"
                };
            }
            if (!jobTitleArr.includes(jobPosting.jobTitle)) {
                throw {
                    code: 400,
                    message: "Invalid Job Title"
                };
            }
            if (!employmentArr.includes(jobPosting.employment)) {
                throw {
                    code: 400,
                    message: "Invalid Employment Type"
                };
            }
            const jobPost : JobPosting = {
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
                approvalState: jobPosting.approvalState
            };
            const response = await createJobPosting(jobPost);
            if (response.code !== 200) {
                throw {
                    code: response.code,
                    message: response.message
                };
            }
            res.status(response.code).json(
                {
                    message: response.message
                }
            );
        } catch (error: any) {
            const { code = 500, message } = error;
            res.status(code).json(
                {
                    message
                }
            );
        }
    }
}