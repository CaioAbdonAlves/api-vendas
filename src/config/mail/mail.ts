interface IMailConfig {
  driver: "etheral" | "ses";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "etheral",
  defaults: {
    from: {
      email: "contato@opentag.cf",
      name: "Caio Abdon",
    },
  },
} as IMailConfig;
