export type MainStackParams = {
    AboutUs: undefined;
    AcademyStartups: undefined;
    Announcement: {
      id: number;
    };
    Announcements: undefined;
    Authenticate: undefined;
    BetterFutureCirclesDays: undefined;
    BKYLicense: undefined;
    BKYSuccess: undefined;
    BottomTab: {
      index: number;
      filterModel: any;
      hideTabBar?: boolean;
      myUsers?: boolean;
    };

    CalendarlyScreen: undefined;
    ChangePassword: undefined;
    CheckIn: undefined;
    ClosedDeals: undefined;
    CreateProfile: {
      userId: string;
    };
    DisclosureText: {
      id: number;
    };
    Events: undefined;
    ExternalWeb: {
      url: string;
    };
    FundingRound: {
      id: number;
    };
    FundingSuccess: {
      id: number;
    };
    Inspirations: undefined;
    InvestorTrainings: undefined;
    IPILicense: {
      agreed: boolean;
    };
    Member: {
      id: number;
    };
    Members: {
      filterModel?: Record<string, any>;
      refresh?: boolean;
      myUsers?: boolean;
    } | undefined;
    UserMembers: {
      refresh?: boolean;
      myUsers?: boolean;
    };
    MemberFilter: undefined;
    MemberShip: {
      agreed_agreement: boolean;
      agreed_confidentiality: boolean;
    };
    MemberDiscovery : undefined;
    MembershipForm: undefined;
    Messenger: undefined;
    Notifications: undefined;
    OnBoarding: undefined;
    Profile: undefined;
    Search: undefined;
    SignIn: undefined;
    SignUp: {
      type: number;
      agreed: boolean;
    };
    StartUpForm:undefined;
    SignUpSuccess: {
      userId: string;
    };
    SplashScreen: {
      type: number;
    };
    Startup: {
      id: number;
    };
    Startups: {
      type: number;
      myStartups:boolean;
      filterModel?: Record<string, any>;
    };
    StartupsFilter: undefined;
    PremiumSuccess: undefined;
    Training: {
      id: string;
    };
    Workshop: {
      id: string;
    };
    Workshops: undefined;
    PaymentLocation: undefined;
    StripePayment: undefined;
    MokaPayment: {
      pricingPlanId: string;
    };
    ThreeDSecureScreen: {
      redirectUrl: string;
    };

  };
