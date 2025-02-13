
export type MainStackParams = {
    AboutUs: undefined;
    Authenticate: undefined;
    Announcements: undefined;
    AcademyStartups: undefined;
    BetterFutureCirclesDays: undefined;
    BottomTab: undefined;
    BKYLicense: undefined;
    BKYSuccess: undefined;
    CalendarlyScreen: undefined;
    CheckIn: undefined;
    ChangePassword: undefined;
    ClosedDeals: undefined;
    CreateProfile: {
         userId: string,
    };
    DisclosureText: undefined;
    Events: undefined;
    Inspirations: undefined;
    InvestorTrainings: undefined;
    ForgotPassword: undefined;
    Notifications: undefined;
    OnBoarding: undefined;
    Search: undefined;
    SignIn: undefined;
    SignUp: undefined;
    SignUpSuccess: { userId: string };
    SplashScreen: undefined;
    Startups: undefined;
    StartupsFilter: undefined;
    MemberShip: undefined;
    MemberFilter: undefined;
    Messenger: undefined;
    Profile: undefined;
    Workshops: undefined;
    Announcement: {
        id: string;
    };
    Content: {
        id: string;
    };
    Inspiration: {
        id: string;
    };
    IPILicense: {
        agreed: boolean;
    };
    Member: {
        id: string;
    };
    Workshop: {
        id: string;
    };
    Startup: {
        id: string;
    };
    Training: {
        id: string;
    };
    ExternalWeb: {
        url: string;
    };
};
