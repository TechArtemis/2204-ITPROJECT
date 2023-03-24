import { NextApiRequest } from "next";
import handler from "@/pages/api/jobPosting/create";
import { Model as JobModel } from "@/backend/database/ODM/JobPosting";
import Database from "@/backend/database";

describe("createJobPosting API", () => {

	afterAll(async () => {
		await JobModel.findOneAndDelete({
			jobPosting: {
				companyImage: "testImage",
				companyName: "Test Name",
				companyAbout: "Great company",
				companyLocation: [
					{
						companyLocation: {
							address: "123 sesame st",
							city: "Surrey",
							province: "BC",
							postalCode: "V3L 5K7"
						}
					}
				],
				companyContact: "000123123@gmail.com",
				jobTitle: "Senior Dev",
				jobType: "Full-Time",
				employment: "Remote",
				jobDescription: "mama mo hakdog",
				tags: [
					"Python"
				]
			}
		});

		Database.disconnect();
	});


	it("Should return code 400 if companyName is missing or invalid", async () => {

		const req = {

			method: "POST",
			body: {
				jobPosting: {
					companyImage: "testImage",
					companyName: "",
					companyAbout: "Great company",
					companyLocation: [
						{
							companyLocation: {
								address: "123 sesame st",
								city: "Surrey",
								province: "BC",
								postalCode: "V3L 5K7"
							}
						}
					],
					companyContact: "000123123@gmail.com",
					jobTitle: "Senior Dev",
					jobType: "Full-Time",
					employment: "Remote",
					jobDescription: "mama mo hakdog",
					tags: [
						"Python"
					]
				}
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Invalid Company Name",
		});
	});

	it("Should return code 400 if jobTitle is missing or invalid", async () => {

		const req = {

			method: "POST",
			body: {
				jobPosting: {
					companyImage: "testImage",
					companyName: "Test Name",
					companyAbout: "Great company",
					companyLocation: [
						{
							companyLocation: {
								address: "123 sesame st",
								city: "Surrey",
								province: "BC",
								postalCode: "V3L 5K7"
							}
						}
					],
					companyContact: "000123123@gmail.com",
					jobTitle: "",
					jobType: "Full-Time",
					employment: "Remote",
					jobDescription: "mama mo hakdog",
					tags: [
						"Python"
					]
				}
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);

		expect(res.json).toHaveBeenCalledWith({
			message: "Invalid Job Title",
		});

	});



	it("Should return 200 if all fields are filled and passes the requirements", async () => {

		const req = {

			method: "POST",

			body: {
				jobPosting: {
					companyImage: "testImage",
					companyName: "Test Name",
					companyAbout: "Great company",
					companyLocation: [
						{
							companyLocation: {
								address: "123 sesame st",
								city: "Surrey",
								province: "BC",
								postalCode: "V3L 5K7"
							}
						}
					],
					companyContact: "000123123@gmail.com",
					jobTitle: "Senior Dev",
					jobType: "Full-Time",
					employment: "Remote",
					jobDescription: "mama mo hakdog",
					tags: [
						"Python"
					]
				}
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ message: "Job Posting created" });
	});
});


