import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";


const handler = NextAuth({
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID, // Use "common" for multi-tenancy
            authorization: { params: { scope: "openid profile email User.Read" } },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
});

// const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
