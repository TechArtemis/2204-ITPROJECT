// third-party imports
import { NextApiRequest, NextApiResponse } from "next";

// local import
import { createJobPosting } from "@/backend/actions/jobPosting";
import { JobPosting } from "@/interface/JobPosting";
import { EMAIL_REGEX } from "@/shared/regex";
import { isValidStr } from "@/shared/stringCheck";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {

			/**
             * Declares and initialize the jobtitleArr to get the enums for JobTtitleType
             * Declares and initialize the employmentArr to get the enums for EmployeeType
             */

			// Gets the request from the body
			const employmentArr = Object.values(JobPosting.EmploymentType);
			const jobTitleArr = Object.values(JobPosting.JobTitleType);
			const { jobPosting } = req.body;

			/**
             * The following if conditions validates the inputs
             */
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
			if (!jobTitleArr.includes(jobPosting.jobType)) {
				throw {
					code: 400,
					message: "Invalid Job Type"
				};
			}
			if (!isValidStr(jobPosting.jobTitle)) {
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
			for(let i = 0; i < jobPosting.tags.length; i++) {
				if (!isValidStr(jobPosting.tags[i])) {
					throw {
						code: 400,
						message: "Invalid Tag"
					};
				}
			}

			// Creates a JobPosting object to be created
			const jobPost: JobPosting = {

				companyImage: jobPosting.companyImage,
				companyName: jobPosting.companyName,
				companyContact: jobPosting.companyContact,
				companyLocation: jobPosting.companyLocation,
				companyAbout: jobPosting.companyAbout,
				jobDescription: jobPosting.jobDescription,
				jobTitle: jobPosting.jobTitle,
				jobType: jobPosting.jobType,
				employment: jobPosting.employment,
				datePosted: jobPosting.datePosted,
				tags: jobPosting.tags
			};

			// Creates the job posting in the database and stores the response
			const response = await createJobPosting(jobPost);

			// Checks if the response is not code 200
			if (response.code !== 200) {
				throw {
					code: response.code,
					message: response.message
				};
			}

			// Sends a response code and message
			res.status(response.code).json(
				{
					message: response.message
				}
			);

			// Catch an error and sends a response code and message
		} catch (error: any) {
			const { code = 500, message } = error;
			res.status(code).json(
				{
					message
				}
			);
		}
	}
	else {

		// Sends a response code of 405 and a message
		res.status(405).json(
			{
				message: "Invalid Method"
			}
		);
	}
}