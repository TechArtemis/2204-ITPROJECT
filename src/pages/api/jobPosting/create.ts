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
            const { companyName, companyContact, companyLocation, companyAbout, jobDescription, jobTitle, employment, requiredDocuments, optionalDocuments, datePosted, approvalState } = req.body;
            if (!isValidStr(companyName)) {
                throw {
                    code: 400,
                    message: "Invalid Company Name"
                };
            }
            if (!EMAIL_REGEX.test(companyContact)) {
                throw {
                    code: 400,
                    message: "Invalid Contact"
                };
            }
            if (!isValidStr(companyAbout)) {
                throw {
                    code: 400,
                    message: "Invalid Company About"
                };
            }
            if (!isValidStr(jobDescription)) {
                throw {
                    code: 400,
                    message: "Invalid Job Description"
                };
            }
            if (!jobTitleArr.includes(jobTitle)) {
                throw {
                    code: 400,
                    message: "Invalid Job Title"
                };
            }
            if (!employmentArr.includes(employment)) {
                throw {
                    code: 400,
                    message: "Invalid Employment Type"
                };
            }
            const jobPost : JobPosting = {
                companyName: companyName,
                companyContact: companyContact,
                companyLocation: companyLocation,
                companyAbout: companyAbout,
                jobDescription: jobDescription,
                jobTitle: jobTitle,
                employment: employment,
                requiredDocuments: requiredDocuments,
                optionalDocuments: optionalDocuments,
                datePosted: datePosted,
                approvalState: approvalState
            };
            const response = await createJobPosting(jobPost);
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