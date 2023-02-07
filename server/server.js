import fastify from "fastify";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import sensible from "@fastify/sensible";
dotenv.config();

const app = fastify();
const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
    return await commitToDb(prisma.post.findMany({
        select: {
            id: true,
            title: true
        }
    })
    )
});

async function commitToDb(promise) {
    const [error, data] = await app.to(promise)
    if (error) return app.httpErrors.internalServerError(error.message)
    return data
}

app.listen({ port: process.env.PORT });

