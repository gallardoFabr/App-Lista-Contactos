import { Injectable, OnModuleInit, OnModuleDestroy, Global } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        try {
            await this.$connect();
            console.log("Connected to database");
        } catch (error){
            if (error instanceof Error){
                console.log("Error  connecting to database: ", error.message);
            }
        }

        
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}