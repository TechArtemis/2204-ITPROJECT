import { NextApiRequest } from "next";
import handler from "@/pages/api/user/create";
import { Model as JobModel } from "@/backend/database/ODM/User";
import Database from "@/backend/database";

describe("Save to Favorites API", () => {

	afterAll( async() => {
		await JobModel.findOneAndDelete({ user: {
			name: "Lorenz Castillo",
			email: "000444602@student.vcc.ca",
			password: "Letmein01!",
			favorites: [
				{
					jobPosting: {
						companyImage: "TestImage",
						companyName: "Openlane",
						companyAbout: "Openlane is a company where you will work with large datasets and use statistical and computational techniques to develop models that can make predictions or decisions",
						companyLocation: [
							{
								companyLocation: {
									address: "1171 Harvey Ave",
									city: "1171 Harvey Ave",
									province: "BC",
									postalCode: "V1Y 6E8"
								}
							}
						],
						companyContact: "Openlane@gmail.com",
						jobTitle: "Technical Writer",
						jobType: "Full-Time",
						employment: "On Site",
						jobDescription: "This is a Job Description",
						tags: [
							"Python"
						]
					}
				},
			]
		} });
		Database.disconnect();
	});

	// 1st test will...
	it("What am I testing here...", async () => {
		const req = {
			method: "POST",
			body: {
				user: {
					name: "Lorenz Castillo",
					email: "000444602@student.vcc.ca",
					password: "Letmein01!",
					favorites: [
						{
							jobPosting: {
								companyImage: "TestImage",
								companyName: "Openlane",
								companyAbout: "Openlane is a company where you will work with large datasets and use statistical and computational techniques to develop models that can make predictions or decisions",
								companyLocation: [
									{
										companyLocation: {
											address: "1171 Harvey Ave",
											city: "1171 Harvey Ave",
											province: "BC",
											postalCode: "V1Y 6E8"
										}
									}
								],
								companyContact: "Openlane@gmail.com",
								jobTitle: "Technical Writer",
								jobType: "Full-Time",
								employment: "On Site",
								jobDescription: "This is a Job Description",
								tags: [
									"Python"
								]
							}
						},
					]
				},
			},
		} as NextApiRequest;

		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await handler(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: "Invalid something",
		});
	});
});
