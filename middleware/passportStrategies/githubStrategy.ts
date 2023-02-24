import { userInfo } from 'os';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "1b536bf68fe0ff6ea55e",
        clientSecret: "868bebc26253acf9a916db5b908b28c14b706332",
        callbackURL: "http://localhost:8001/auth/login/github/callback",
    },
    /* FIX ME 😭 */


    async (req: any, accessToken: any, refreshToken: any, profile: string, done: any,) => {
        console.log(profile); 
        done (null, profile);

    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
