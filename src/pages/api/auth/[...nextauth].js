import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const scopes = ['identify', 'guilds']

export default NextAuth({
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
  providers: [
    DiscordProvider({
      
      clientId: "discord_bot_id",
      clientSecret: "discord_bot_secret", // https://discord.com/developers sitesinden botu seçin soldan OAuth2 menüsünü seçin ordan Client Secret kısmından alın ve yapıştırın
      authorization: {params: {scope: scopes.join(' ')}}
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  useSecureCookies: false,
})