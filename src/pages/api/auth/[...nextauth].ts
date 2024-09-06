import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

// Cria uma instância do Prisma Client
const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Verifica se o usuário já existe no banco de dados
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // Se o usuário não for encontrado, impede o login
        if (!existingUser) {
          return false;  // Bloqueia o login
        }

        // Se o usuário for encontrado, permite o login
        return true;
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
        return false; // Bloqueia o login em caso de erro
      }
    },
  },
});
