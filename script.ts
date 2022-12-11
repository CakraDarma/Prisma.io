import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ log: ['query'] });

async function main() {
	// in every execute will delete all user data
	// await prisma.user.deleteMany();
	// const user = await prisma.user.create({ data: { name: 'test' } });

	// const users = await prisma.user.createMany({
	// 	data: [
	// 		{
	// 			name: 'cakra',
	// 			email: 'coba@gmail.com',
	// 			age: 99,
	// 		},
	// 		{
	// 			name: 'cakras',
	// 			email: 'cobas@gmail.com',
	// 			age: 99,
	// 		},
	// 	],
	// });

	// const user = await prisma.user.findUnique({
	// 	where: {
	// 		age_name: {
	// 			age: 99,
	// 			name: 'cakra',
	// 		},
	// 	},
	// });

	const user = await prisma.user.findFirst({
		where: {
			// age: 99,
			// name: { not: 'Sally' },
			// name: { in: ['sally', 'cak'] },
			// age: { lt: 10 },

			// email: { contains: '@test.com' },

			// AND: [{ email: { startsWith: 'sally' } }, { name: 'sally' }],

			// join
			writtenPosts: {
				some: {
					title: 'test',
				},
			},
		},
		take: 2,
		skip: 1,
		orderBy: {
			age: 'desc',
		},
	});

	// const user = await prisma.user.updateMany({
	// 	where: {
	// 		email: 'cakra@gmai.com',
	// 	},
	// 	data: {
	// 		email: 'sally@gmai.com',
	// 	},
	// });

	// const usre = await prisma.user.delete({
	// 	where: {
	// 		email: "cakra@gmail.com"
	// 	}
	// })

	// const users = await prisma.user.findMany();
	// console.log(users);
}

main()
	.catch((e) => {
		console.error(e.message);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
