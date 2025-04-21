import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { skapi } from "@/main";
import { Countries } from './countries';
import { devLog } from './logger';
import templates from 'rollup-plugin-visualizer/dist/plugin/template-types';

const regions = JSON.parse(import.meta.env.VITE_REG);

type UserProfilePublicSettings = {
  /** User's E-mail is public when true. E-Mail should be verified. */
  email_public?: boolean;
  /** User's phone number is public when true. Phone number should be verified. */
  phone_number_public?: boolean;
  /** User's address is public when true. */
  address_public?: boolean;
  /** User's gender is public when true. */
  gender_public?: boolean;
  /** User's birthdate is public when true. */
  birthdate_public?: boolean;
};

export type UserAttributes = {
  /** User's name */
  name?: string;
  /**
   * User's E-Mail for signin.<br>
   * 64 character max.<br>
   * When E-Mail is changed, E-Mail verified state will be changed to false.
   * E-Mail is only visible to others when set to public.
   * E-Mail should be verified to set to public.
   * */
  email?: string;
  /**
   * User's phone number. Format: "+0012341234"<br>
   * When phone number is changed, phone number verified state will be changed to false.
   * Phone number is only visible to others when set to public.
   * Phone number should be verified to set to public.
   */
  phone_number?: string;
  /** User's address, only visible to others when set to public. */
  address?:
  | string
  | {
    /**
     * Full mailing address, formatted for display or use on a mailing label. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
     * street_address
     * Full street address component, which MAY include house number, street name, Post Office Box, and multi-line extended street address information. This field MAY contain multiple lines, separated by newlines. Newlines can be represented either as a carriage return/line feed pair ("\r\n") or as a single line feed character ("\n").
     */
    formatted: string;
    // City or locality component.
    locality: string;
    // State, province, prefecture, or region component.
    region: string;
    // Zip code or postal code component.
    postal_code: string;
    // Country name component.
    country: string;
  };
  /**
   * User's gender. Can be "female" and "male".
   * Other values may be used when neither of the defined values are applicable.
   * Only visible to others when set to public.
   */
  gender?: string;
  /** User's birthdate. String format: "1969-07-16", only visible to others when set to public.*/
  birthdate?: string;

  /** Additional string value that can be used freely. This is only accessible to the owner of the account and the admins. */
  misc?: string;
  picture?: string;
  profile?: string;
  website?: string;
  nickname?: string;
};

export type PublicUser = {
  services: string[]; // service id list

  /** Service id of the user account. */
  service: string;
  /** User ID of the service owner. */
  owner: string;
  /** Access level of the user's account. */
  access_group: number;
  /** User's ID. */
  user_id: string;
  /** Country code of where user first signed up from. */
  locale: string;
  /** Number of the user's subscribers. */
  subscribers?: number;
  /** Number of the records the user have created. */
  records?: number;
  /** Timestamp of user last signup time. */
  timestamp: number;
} & UserAttributes;

export type UserProfile = {
  /** Service id of the user account. */
  service: string;
  /** User ID of the service owner. */
  owner: string;
  /** Access level of the user's account. */
  access_group: number;
  /** User's ID. */
  user_id: string;
  /** Country code of where user first signed up from. */
  locale: string;
  /** Shows true when user has verified their E-Mail. */
  email_verified?: boolean;
  /** Shows true when user has verified their phone number. */
  phone_number_verified?: boolean;
  /** Shows 'PASS' if the user's account signup was successful. 'MEMBER' if signup confirmation was successful. */
  signup_ticket?: string;
} & UserAttributes &
  UserProfilePublicSettings;

export type ServiceObj = {
  active: number; // 0 = disabled / -1 = suspended / 1 = active
  api_key: string;
  cors: string; // "url, url"
  created_locale: string; // country code ex) KR
  email: string;
  group: number; // 1 = trial / 2 = standard / 3 = premium
  host: string;
  lmt: string; // #users_exceed / #cloud_exceed / #db_exceed / #mail_exceed / #host_exceed ex) "#cloud_exceed#db_exceed#.."
  name: string;
  newsletter_subscribers: number;
  owner: string;
  region: string; // network region ex) ap-northeast-1
  service: string;
  timestamp: number; // service created time in 13 digit timestamp
  users: number;
  subdomain?: string; // + prefixed when subdomain is in transit, * prefixed when subdomain is in removal process
  subs_id?: string;
  suspended?: boolean; // the service is canceled and suspended, if false, the service can be canceled but still running until the end of period
  email_triggers?: {
    template_setters: {
      welcome: string;
      confirmation: string;
      newsletter_subscription: string;
      verification: string;
      invitation: string;
    };
  };
  prevent_inquiry?: boolean;
  freeze_database?: boolean;
  prevent_signup?: boolean;
  client_secret?: { [key: string]: string };
  auth_client_secret?: string[];
  plan: '-' | 'Trial' | 'Standard' | 'Premium' | 'Unlimited' | 'Free Standard' | 'Canceled' | 'Suspended' | string;
  template_welcome: {
    subject: string;
    url: string;
  };
  template_verification: {
    subject: string;
    url: string;
  };
  template_confirmation: {
    subject: string;
    url: string;
  };
  template_invitation: {
    subject: string;
    url: string;
  };
  template_newsletter_subscription: {
    // is newsletter subscription confirmation template
    subject: string;
    url: string;
  };
  email_alias?: string; // has value if email alias is registered
};

type SubscriptionObj = {
  id: string;
  object: string;
  application: string | null;
  application_fee_percent: number | null;
  automatic_tax: {
    enabled: boolean;
    liability: string | null;
  };
  billing_cycle_anchor: number;
  billing_cycle_anchor_config: object | null;
  billing_thresholds: object | null;
  cancel_at: number | null; // actually cancelled at (10 digit timestamp)
  cancel_at_period_end: boolean;
  canceled_at: number | null; // requested cancel at (10 digit timestamp)
  cancellation_details: {
    comment: string | null;
    feedback: string | null;
    reason: string | null;
  };
  collection_method: string;
  created: number;
  currency: string;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due: number | null;
  default_payment_method: string | null;
  default_source: string | null;
  default_tax_rates: string[];
  description: string | null;
  discount: object | null;
  discounts: object[];
  ended_at: number | null;
  invoice_settings: {
    account_tax_ids: string | null;
    issuer: {
      type: string;
    };
  };
  items: object;
  latest_invoice: string;
  livemode: boolean;
  metadata: object;
  next_pending_invoice_item_invoice: string | null;
  on_behalf_of: string | null;
  pause_collection: object | null;
  payment_settings: object;
  pending_invoice_item_interval: object | null;
  pending_setup_intent: string | null;
  pending_update: object | null;
  plan: object;
  quantity: number;
  schedule: object | null;
  start_date: number;
  status: string;
  test_clock: object | null;
  transfer_data: object | null;
  trial_end: number | null;
  trial_settings: object;
  trial_start: number | null;
};

function randomString(length: number) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default class Service {
  id: string;
  owner: string;
  admin_private_endpoint: string;
  record_private_endpoint: string;
  admin_public_endpoint: string;
  service: ServiceObj;
  dateCreated: string;
  plan: string;
  planCode: { [key: number]: string } = {
    1: 'Trial',
    2: 'Standard',
    3: 'Premium',
    50: 'Unlimited',
    51: 'Standard (Perpetual License)',
    52: 'Premium (Perpetual License)',
  };
  subscription: SubscriptionObj;
  storageInfo: {
    cloud: number;
    database: number;
    email: number;
    host: number;
  } = reactive({
    cloud: null,
    database: null,
    email: null,
    host: null,
  });

  subscriptionFetched = ref(false);
  _orgPlan = '';
  _subsPromise;
  newsletterSender: Promise<string>[] = [];
  reserved_key: string = randomString(16);

  constructor(id: string, service: ServiceObj, endpoints: string[]) {
    this.id = id;
    this.admin_private_endpoint = endpoints[0];
    this.record_private_endpoint = endpoints[1];
    this.admin_public_endpoint = endpoints[2];
    this.owner = service.owner;
    this.dateCreated = typeof service.timestamp === 'string' ? service.timestamp : new Date(service.timestamp).toDateString();
    this.plan = this.planCode[service.group];
    service.plan = this.plan;
    this.service = reactive(service);

    if (this.service?.subdomain) {
      this.getSubdomainInfo(true);
    }

    this._subsPromise = this.getSubscription();
    this.getStorageInfo();
    if (service.group > 1) {
      this.requestNewsletterSender({ group_numb: 0 });
      this.requestNewsletterSender({ group_numb: 1 });
    }
  }

  // async admin_signup(
  //   form: UserAttributes &
  //     UserProfilePublicSettings & { email: String; password?: String; username?: string } & {
  //       access_group?: number;
  //       service?: string;
  //     },
  //   option?: {
  //     signup_confirmation?: boolean | string;
  //     email_subscription?: boolean;
  //   }
  // ): Promise<UserProfile & { email_admin: string }> {
  //   let params: any = form;
  //   params.signup_confirmation = option?.signup_confirmation || false;
  //   params.email_subscription = option?.email_subscription || false;

  //   // cognito signup process below
  //   return await skapi.util.request('admin-signup', Object.assign({ service: this.id, owner: this.owner }, params), { auth: true });
  // }

  async registerSenderEmail(params: {
    email_alias: string;
  }): Promise<"SUCCESS: Sender e-mail has been registered."> {
    let emailAlias: string;

    if (params && 'email_alias' in params) {
      emailAlias = params.email_alias;
    } else {
      emailAlias = '';
    }

    if (!emailAlias) {
      throw 'Email is required.';
    }

    const specialCharPattern = /[!#$%^&*(),?":{}|<>]/g;
    if (specialCharPattern.test(emailAlias)) {
      throw 'Email contains special characters.';
    }

    let res = await skapi.util.request(this.admin_private_endpoint + 'register-sender-email', Object.assign({ service: this.id, owner: this.owner }, { email_alias: emailAlias }), { auth: true });
    this.service.email_alias = emailAlias;
    return res;
  }

  registerOpenIDLogger(params: {
    url: string; // openid token 해석 url
    mthd: string; // GET or POST
    hder: { [key: string]: string }; // header
    prms: { [key: string]: string }; // params
    data: any; // post body data (post 만 해당)
    id: string; // openid logger id
    usr: string; // user id로 사용할 openid profile attribute
    cdtn: {
      key: string; // openid profile attribute
      value: string | boolean | number; // openid profile attribute value
      condition: "=" | ">" | "<" | ">=" | "<=" | "!=" | "ends_with";
      range: string | boolean | number; // value range
    },
    req: 'create' | 'delete' | 'update' | 'list'; // request type
  }) {
    return skapi.util.request(
      this.admin_private_endpoint + 'register-openid',
      Object.assign({ service: this.id, owner: this.owner }, skapi.util.extractFormData(params).data || {}),
      { auth: true }
    );
  }

  async createAccount(
    form: UserAttributes & UserProfilePublicSettings & { email: string; password: string },
    options?: {
      email_subscription?: boolean;
    }
  ): Promise<UserProfile & PublicUser & { email_admin: string; approved: string; log: number; username: string }> {
    return skapi.createAccount(Object.assign({ service: this.id, owner: this.owner }, form), options);
  }

  async inviteUser(
    form: UserAttributes & UserProfilePublicSettings & { email: string },
    options?: {
      confirmation_url?: string;
      email_subscription?: boolean;
    }
  ): Promise<'SUCCESS: Invitation has been sent.'> {
    return skapi.inviteUser(Object.assign({ service: this.id, owner: this.owner }, form), options);
  }

  async updateUserAttribute(
    form: SubmitEvent | UserAttributes & UserProfilePublicSettings & { user_id: string },
  ): Promise<{ [key: string]: any }> {
    let attributes = skapi.util.extractFormData(form).data;

    await skapi.util.request(
      this.admin_private_endpoint + 'admin-edit-profile',
      Object.assign({ service: this.id, owner: this.owner }, attributes),
      { auth: true }
    );

    return attributes;
  }

  async grantAccess(params: { user_id: string; access_group: number }): Promise<'SUCCESS: Access has been granted to the user.'> {
    return skapi.grantAccess(Object.assign({ service: this.id, owner: this.owner }, params));
  }

  // get newsletter mail address
  async requestNewsletterSender(params: { group_numb: number }): Promise<string> {
    if (this.newsletterSender[params.group_numb]) {
      return await this.newsletterSender[params.group_numb];
    }

    let sndr = skapi.util.request(
      this.admin_private_endpoint + 'request-newsletter-sender',
      Object.assign({ service: this.id, owner: this.owner }, skapi.util.extractFormData(params).data || {}),
      { auth: true }
    );
    this.newsletterSender[params.group_numb] = sndr;
    return await sndr;
  }

  async deleteNewsletter(params: { message_id: string; group: number }) {
    return skapi.util.request(
      this.admin_private_endpoint + 'delete-newsletter',
      Object.assign({ service: this.id, owner: this.owner }, skapi.util.extractFormData(params).data || {}),
      { auth: true }
    );
  }

  checkCancel = () => {
    this._orgPlan = this.planCode[this.service.group];
    let currTime = new Date().getTime();
    this.service.suspended = this.subscription?.cancel_at && currTime >= this.subscription?.cancel_at * 1000;

    if (this.subscription?.canceled_at && currTime >= this.subscription.canceled_at * 1000) {
      this.service.plan = 'Canceled';
    } else {
      this.service.plan = this.plan;
    }
    this.subscriptionFetched.value = true;
  };

  async blockAccount(userId: string): Promise<'SUCCESS: The user has been blocked.'> {
    await skapi.blockAccount(Object.assign({ service: this.id, owner: this.owner }, { user_id: userId }));
    return 'SUCCESS: The user has been blocked.';
  }

  async unblockAccount(userId: string): Promise<'SUCCESS: The user has been unblocked.'> {
    await skapi.unblockAccount(Object.assign({ service: this.id, owner: this.owner }, { user_id: userId }));
    return 'SUCCESS: The user has been unblocked.';
  }

  async deleteAccount(userId: string): Promise<'SUCCESS: Account has been deleted.'> {
    await skapi.deleteAccount(Object.assign({ service: this.id, owner: this.owner }, { user_id: userId }));
    return 'SUCCESS: Account has been deleted.';
  }

  //send invitation email, when accepted, user will have their account created, and be redirected
  // async resendInvitation(params: { email: string; redirect: string }): Promise<'SUCCESS: Invitation E-Mail has been sent.'> {
  //   let p: any = skapi.util.extractFormData(params).data;
  //   let resend = await skapi.util.request(
  //     'confirm-signup',
  //     {
  //       service: this.id,
  //       owner: this.owner,
  //       is_invitation: p.email,
  //       redirect: p.redirect,
  //     },
  //     { auth: true }
  //   );

  //   return resend; // 'SUCCESS: Invitation E-Mail has been sent.'
  // }

  async getSubscription(refresh = false): Promise<SubscriptionObj> {
    if (this.subscription && !refresh) {
      return this.subscription;
    }

    if (this.service?.subs_id) {
      let subs_id = this.service?.subs_id.split('#');

      if (subs_id.length < 2) {
        return;
      }

      let SUBSCRIPTION_ID = subs_id[0];

      this.subscription = reactive(
        await skapi.clientSecretRequest({
          clientSecretName: 'stripe_test',
          url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
          method: 'GET',
          headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      );
    }

    this.checkCancel();
    return this.subscription;
  }

  async deleteSubscription(): Promise<SubscriptionObj> {
    await this._subsPromise;

    if (!this.subscription) {
      return null;
    }

    if (this.service?.subs_id) {
      let subs_id = this.service?.subs_id.split('#');

      if (subs_id.length < 2) {
        return;
      }

      let SUBSCRIPTION_ID = subs_id[0];

      this.subscription = reactive(
        await skapi.clientSecretRequest({
          clientSecretName: 'stripe_test',
          url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
          },
          // // data: {
          // //     cancel_at_period_end: true
          // // }
        })
      );
    }

    this.checkCancel();
    return this.subscription;
  }

  async cancelSubscription(): Promise<SubscriptionObj> {
    await this._subsPromise;

    if (!this.subscription) {
      return null;
    }

    if (this.service?.subs_id) {
      let subs_id = this.service?.subs_id.split('#');

      if (subs_id.length < 2) {
        return;
      }

      let SUBSCRIPTION_ID = subs_id[0];

      this.subscription = reactive(
        await skapi.clientSecretRequest({
          clientSecretName: 'stripe_test',
          url: `https://api.stripe.com/v1/subscriptions/${SUBSCRIPTION_ID}`,
          method: 'POST',
          headers: {
            Authorization: 'Bearer $CLIENT_SECRET',
          },
          data: {
            cancel_at_period_end: true,
          },
        })
      );
    }

    this.checkCancel();
    return this.subscription;
  }

  async setServiceOption(opt: {
    prevent_signup?: boolean;
    client_secret?: { [key: string]: string };
    auth_client_secret?: string[]; // client_secret key to be auth required
    prevent_inquiry?: boolean; // true 인 경우 sendInquiry API 사용 불가능
    freeze_database?: boolean; // true 이면 데이터 베이스 구조 고정시키는 기능
  }): Promise<ServiceObj> {
    let old = {
      prevent_signup: this.service.prevent_signup || false,
      client_secret: this.service.client_secret || {},
      auth_client_secret: this.service.auth_client_secret || [],
      prevent_inquiry: this.service.prevent_inquiry || false,
      freeze_database: this.service.freeze_database || false,
    };
    let toUpload = {
      prevent_signup: this.service.prevent_signup || false,
      client_secret: this.service.client_secret || {},
      auth_client_secret: this.service.auth_client_secret || [],
      prevent_inquiry: this.service.prevent_inquiry || false,
      freeze_database: this.service.freeze_database || false,
    };

    Object.assign(toUpload, opt);
    Object.assign(this.service, toUpload);
    try {
      let updated = await skapi.util.request(this.admin_private_endpoint + 'service-opt', { service: this.id, owner: this.owner, opt }, { auth: true });
      return updated;
    } catch (err: any) {
      Object.assign(this.service, old);
      throw err;
    }
  }

  async getEmailTemplate(params: 'invitation' | 'newsletter_subscription' | 'verification' | 'welcome' | 'confirmation'): Promise<{
    subject: string;
    url: string;
  }> {
    let updated = await skapi.util.request(
      this.admin_private_endpoint + 'email-templates',
      { service: this.id, owner: this.owner, template: params },
      { auth: true }
    );
    return updated;
  }

  async getStorageInfo(): Promise<{
    cloud: number; // cloud storage used
    database: number; // database size
    email: number; // email storage used
    host: number; // host storage used
  }> {
    let wait = [];

    if (this.service.subdomain) {
      let subdomain = this.service.subdomain;
      let pendingSubdomain = subdomain[0] === '+' || subdomain[0] === '*';
      if (pendingSubdomain) {
        subdomain = subdomain.slice(1);
      }

      // get host storage info
      wait.push(
        skapi.util
          .request(this.admin_private_endpoint + 'host-directory', { service: this.id, owner: this.owner, info: true, dir: subdomain }, { auth: true })
          .then((r: any) => {
            this.storageInfo.host = r?.size || 0;
          })
      );
    }

    wait.push(
      skapi.util.request(this.record_private_endpoint + 'storage-info', { service: this.id, owner: this.owner }, { auth: true }).then((r) => {
        this.storageInfo.cloud = r.cloud;
        this.storageInfo.database = r.database;
        this.storageInfo.email = r.email;
      })
    );

    await Promise.all(wait);

    return this.storageInfo;
  }

  async enableService(): Promise<ServiceObj> {
    if (this.service.active === 0) {
      this.service.active = 1;
      try {
        await skapi.util.request(
          this.admin_private_endpoint + 'register-service',
          {
            service: this.id,
            owner: this.owner,
            execute: 'enable',
          },
          { auth: true }
        );
      } catch (err: any) {
        this.service.active = 0;
        alert(err.message);
      }
    }

    return this.service;
  }

  async disableService(): Promise<ServiceObj> {
    if (this.service.active > 0) {
      let orgActive = this.service.active;
      this.service.active = 0;

      try {
        await skapi.util.request(
          this.admin_private_endpoint + 'register-service',
          {
            service: this.id,
            owner: this.owner,
            execute: 'disable',
          },
          { auth: true }
        );
      } catch (err: any) {
        this.service.active = orgActive;
        alert(err.message);
      }
    }

    return this.service;
  }

  async deleteService(): Promise<void> {
    try {
      await skapi.util.request(
        this.admin_private_endpoint + 'register-service',
        {
          service: this.id,
          owner: this.owner,
          execute: 'delete',
        },
        { auth: true }
      );
    } catch (err: any) {
      alert(err.message);
    }
    // need servicelist removal from outside
  }

  async updateService(params: { name?: string; cors?: string; api_key?: string }): Promise<ServiceObj> {
    let to_update: { [key: string]: any } = {};

    if ('cors' in params) {
      params.cors = params.cors.trim();
      // if cors have , at the end, remove it
      while (params.cors[params.cors.length - 1] === ',') {
        if (params.cors[params.cors.length - 1] === ',') {
          params.cors = params.cors.slice(0, -1);
          params.cors = params.cors.trim();
        }
      }

      let cors = params.cors.split(',').map((c) => c.trim());
      let service_cors = (this.service.cors || '').split(',').map((c) => c.trim());
      if (cors.length === service_cors.length && cors.every((v, i) => v === service_cors[i])) {
        return this.service;
      }

      to_update.cors = cors;
    }

    if ('name' in params && params.name !== this.service.name) {
      to_update.name = params.name;
    }

    if ('api_key' in params && params.api_key !== this.service.api_key) {
      to_update.api_key = params.api_key;
    }

    if (Object.keys(to_update).length) {
      this.service = reactive(
        await skapi.util.request(
          this.admin_private_endpoint + 'register-service',
          Object.assign({ execute: 'update', service: this.id, owner: this.owner }, to_update),
          { auth: true }
        )
      );
    }

    return this.service;
  }

  async getMailTemplates(
    params?: {
      searchFor: 'message_id' | 'timestamp' | 'read' | 'complaint' | 'subject';
      value: string | number;
      range?: string | number;
      condition?: '>' | '>=' | '=' | '<' | '<=' | 'gt' | 'gte' | 'eq' | 'lt' | 'lte';
      group: 'welcome' | 'confirmation' | 'verification' | 'invitation' | 'newsletter_subscription';
    },
    fetchOptions?: { [key: string]: any }
  ): Promise<any> {
    try {
      let res = await skapi.util.request(
        this.admin_private_endpoint + 'get-templates',
        Object.assign(
          {
            service: this.id,
            owner: this.owner,
          },
          params
        ),
        { auth: true, method: 'get', fetchOptions: fetchOptions || {} }
      );

      res.list = res.list.map((value: any) => {
        return {
          message_id: value.mid,
          timestamp: value.stmp,
          subject: value.subj,
          url: value.url,
        };
      });

      return res;
    } catch (err: any) {
      alert(err.message);
    }
  }

  async deleteTemplate(params?: {
    message_id: string;
    group: 'welcome' | 'confirmation' | 'verification' | 'invitation' | 'newsletter_subscription';
  }): Promise<any> {
    try {
      return skapi.util.request(
        this.admin_private_endpoint + 'delete-template',
        Object.assign(
          {
            service: this.id,
            owner: this.owner,
          },
          params
        ),
        { auth: true }
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  async setTemplate(params?: {
    message_id: string;
    group: 'welcome' | 'confirmation' | 'verification' | 'invitation' | 'newsletter_subscription';
  }): Promise<any> {
    try {
      return skapi.util.request(
        this.admin_private_endpoint + 'set-template',
        Object.assign(
          {
            service: this.id,
            owner: this.owner,
          },
          params
        ),
        { auth: true }
      );
    } catch (err: any) {
      alert(err.message);
    }
  }

  pending: {
    subdomain: false | 'removing' | 'transit' | 'fetching' | string;
    cdn: boolean; // true when cdn refresh is in process
  } = reactive({
    subdomain: false,
    cdn: false,
  });

  subdInfo = reactive({
    srvc: '',
    subd: '',
    ownr: '',
    stat: '',
    ['404']: '...',
  });

  getSubdomainInfoTimer: any = null;

  dirInfo: Ref<{
    cnt: number;
    size: number;
    upl: number;
    path: string;
  }> = reactive({
    cnt: 0,
    size: 0,
    upl: 0,
    path: '',
  });

  async getSubdomainInfo(
    immediate: boolean = false,
    time: number = 1000
  ): Promise<{
    srvc: string;
    subd: string;
    ownr: string;
    stat: 'remove' | 'change:(subdomain to be changed to)' | 'active' | string;
    ['404']?: string;
  } | null> {
    if (!this.pending.subdomain) {
      this.pending.subdomain = 'fetching';
    }

    if (this.getSubdomainInfoTimer) {
      return null;
    }

    let exec = async (time = 1000) => {
      let info = await skapi.util.request(this.admin_private_endpoint + 'subdomain-info', { service: this.id, owner: this.owner }, { auth: true });
      // devLog({ subInfo: info });

      if (typeof info === 'string' || !info || (typeof info === 'object' && Object.keys(info).length === 0)) {
        // subdomain removed
        clearTimeout(this.getSubdomainInfoTimer);
        this.getSubdomainInfoTimer = null;
        this.pending.subdomain = false;
        this.service.subdomain = null;

        Object.assign(this.subdInfo, {
          srvc: '',
          subd: '',
          ownr: '',
          stat: '',
          ['404']: '',
        });

        return this.subdInfo;
      }

      if (info.invid) {
        this.checkCDNStatus(true);
      }

      let pendingStat = info.stat.includes('change:')
        ? 'transit'
        : info.stat.includes('remove')
          ? 'removing'
          : info.stat === 'active' || info.stat === 'tracked'
            ? false
            : info.stat;
      this.pending.subdomain = pendingStat;
      if (pendingStat) {
        time *= 1.2;
        this.subdInfo.stat = info.stat;
        this.getSubdomainInfoTimer = setTimeout(() => exec(time), time);
      } else {
        clearTimeout(this.getSubdomainInfoTimer);
        this.getSubdomainInfoTimer = null;

        this.pending.subdomain = false;
        this.service.subdomain = info.subd;
        if (!info?.['404']) {
          delete this.subdInfo['404'];
        }
        Object.assign(this.subdInfo, info);
        return info;
      }
    };

    if (immediate) {
      exec(time);
    } else {
      this.getSubdomainInfoTimer = setTimeout(() => exec(time), time);
      return null;
    }
  }

  async registerSubdomain(params: { subdomain?: string }): Promise<ServiceObj> {
    let { subdomain = '' } = params || {};
    this.reserved_key = randomString(16);

    if (this.service?.subdomain === subdomain) {
      return this.service;
    }

    if (this.service?.subdomain) {
      if (subdomain && this.service?.subdomain[0] === '*') {
        throw 'Previous subdomain is in removal process.';
      } else if (subdomain && this.service?.subdomain[0] === '+') {
        throw `Previous subdomain is in transit to "${this.service.subdomain.slice(1)}".`;
      }
    }

    this.pending.subdomain = subdomain ? 'pending' : 'removing';
    this.subdInfo.stat = subdomain ? 'pending' : 'removing';
    let resp = await skapi.util
      .request(
        this.admin_private_endpoint + 'register-subdomain',
        { service: this.id, owner: this.owner, subdomain },
        {
          auth: true,
          method: 'post',
        }
      )
      .catch((err) => {
        this.pending.subdomain = false;
        throw err;
      });

    if (typeof resp !== 'string') {
      this.service.subdomain = resp.subdomain;
      this.subdInfo.stat = 'pending';
    }

    this.getSubdomainInfo();
    return this.service;
  }

  async fetchCDNStatus() {
    return await skapi.util.request(
      this.admin_private_endpoint + 'refresh-cdn',
      {
        service: this.id,
        owner: this.owner,
        exec: 'status',
      },
      {
        auth: true,
        method: 'post',
      }
    );
  }

  cdnPendTimer: any = null;
  checkCDNStatus(immediate?: boolean) {
    if (this.cdnPendTimer) {
      return;
    }

    this.pending.cdn = true;
    let callbackInterval = (immediate = false) => {
      let time = immediate ? 1 : 30000;
      setTimeout(() => {
        this.fetchCDNStatus()
          .then((res) => {
            if (res === 'COMPLETE') {
              this.pending.cdn = false;
              clearTimeout(this.cdnPendTimer);
              this.cdnPendTimer = null;
              return;
            }
            this.cdnPendTimer = callbackInterval();
          })
          .catch((err) => {
            this.pending.cdn = false;
            clearTimeout(this.cdnPendTimer);
            this.cdnPendTimer = null;
            return;
          });
      }, time);
    };

    this.cdnPendTimer = callbackInterval(immediate);
  }

  async refreshCDN(): Promise<
    | 'IS_QUEUED' // new cdn refresh is queued
    | 'IN_QUEUE' // the previous cdn refresh is still in queue
    | 'IN_PROCESS' // the cdn refresh is in process
  > {
    if (this.pending.cdn) {
      return 'IN_PROCESS';
    }

    if (!this.service.subdomain || this.service.subdomain[0] === '*') {
      throw 'Subdomain does not exists.';
    }

    try {
      this.pending.cdn = true;
      await skapi.util.request(
        this.admin_private_endpoint + 'refresh-cdn',
        {
          service: this.id,
          owner: this.owner,
          exec: 'refresh',
        },
        {
          auth: true,
          method: 'post',
        }
      );

      this.checkCDNStatus();
      return 'IS_QUEUED';
    } catch (err: any) {
      if (err.message === 'Previous cdn refresh is still in queue.') {
        return 'IN_QUEUE';
      }
      if (err.message === 'Previous cdn refresh is in process.') {
        return 'IN_PROCESS';
      } else {
        this.pending.cdn = false;
        if (this.cdnPendTimer) {
          clearTimeout(this.cdnPendTimer);
          this.cdnPendTimer = null;
        }
        throw err;
      }
    }
  }

  async set404(params: {
    path: string; // Set path to file of 404 page. ex) folder/file.html
  }): Promise<'SUCCESS: Removed 404 page'> {
    return await skapi.util.request(this.admin_private_endpoint + 'set-404', { service: this.id, owner: this.owner, page404: params.path }, { auth: true });
  }

  async uploadHostFiles(
    fileList: FormData | HTMLFormElement | SubmitEvent,
    params: {
      contentTypeMapping?: { [fileName: string]: string };
      prefix?: string;
      progress?: (p: {
        status: string; // 'loadstart' | 'progress' | 'abort' | 'error' | 'load' | 'timeout' | 'loadend',
        progress: number;
        currentFile: File;
        completed: File[];
        failed: File[];
        loaded: number;
        total: number;
        abort: () => void;
      }) => void;
    }
  ): Promise<{ completed: File[]; failed: File[]; bin_endpoints: string[] }> {
    let progress = params?.progress || ((p: any) => p);

    if (fileList instanceof SubmitEvent) {
      fileList = fileList.target as HTMLFormElement;
    }

    if (fileList instanceof HTMLFormElement) {
      fileList = new FormData(fileList);
    }

    let reserved_key = this.reserved_key;

    let getSignedParams: Record<string, any> = {
      reserved_key,
      service: this.id,
      owner: this.owner,
      request: 'host',
      id: this.service.subdomain,
    };

    let xhr: any;
    let fetchProgress = (url: string, body: FormData, progressCallback: (p: ProgressEvent) => void) => {
      return new Promise((res, rej) => {
        xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.onload = () => {
          let result = xhr.responseText;
          try {
            result = JSON.parse(result);
          } catch (err) { }
          if (xhr.status >= 200 && xhr.status < 300) {
            res(result);
          } else {
            rej(result);
          }
        };
        xhr.onerror = () => rej('Network error');
        xhr.onabort = () => rej('Aborted');
        xhr.ontimeout = () => rej('Timeout');

        // xhr.addEventListener('error', rej);
        if (xhr.upload && typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        xhr.onprogress = progressCallback;

        xhr.send(body);
      });
    };

    let completed = [];
    let failed = [];
    let bin_endpoints = [];
    let prefix = params.prefix ? params.prefix : '';
    prefix = prefix && prefix[prefix.length - 1] === '/' ? prefix : prefix + '/';

    for (let [key, f] of (fileList as any).entries()) {
      if (!(f instanceof File)) {
        continue;
      }

      let fn = (f.webkitRelativePath || f.name).split('/');
      let fns = fn[fn.length - 1];
      let ct = params?.contentTypeMapping?.[fns] || null;

      let signedParams = Object.assign(
        {
          key: prefix + (f.webkitRelativePath || f.name),
          size: f.size || 0,
          contentType: f.type || ct,
        },
        getSignedParams
      );

      let { fields = null, url } = await skapi.util.request(this.record_private_endpoint + 'get-signed-url', signedParams, { auth: true });

      bin_endpoints.push(url);

      let form = new FormData();

      for (let name in fields) {
        form.append(name, fields[name]);
      }

      form.append('file', f);

      try {
        await fetchProgress(url, form, (p: ProgressEvent) =>
          progress({
            status: p.type,
            progress: (p.loaded / p.total) * 100,
            currentFile: f,
            completed,
            failed,
            loaded: p.loaded,
            total: p.total,
            abort: () => xhr.abort(),
          })
        );
        completed.push(f);
      } catch (err) {
        failed.push(f);
      }
    }

    return { completed, failed, bin_endpoints };
  }

  async deleteHostFiles(params: {
    paths: string[]; // path without subdomain ex) folder/file.html
  }): Promise<string> {
    if (!params.paths || !params.paths.length) return;
    return skapi.util.request(
      this.record_private_endpoint + 'del-files',
      {
        service: this.id,
        owner: this.owner,
        endpoints: params.paths,
        reserved_key: this.reserved_key,
        storage: 'host',
      },
      { auth: true, method: 'post' }
    );
  }

  async getDirInfo(): Promise<{
    name: string; // !
    path: string; // subdomain
    size: number;
    upl: number;
    cnt: number;
  }> {
    let dirInfo = await skapi.util.request(
      this.admin_private_endpoint + 'host-directory',
      Object.assign({ service: this.id, owner: this.owner }, { dir: '', info: true }),
      {
        fetchOptions: {
          limit: 1,
          fetchMore: false,
          ascending: true,
        },
        method: 'post',
        auth: true,
      }
    );
    // devLog({ dirInfo });
    if (dirInfo) {
      Object.assign(this.dirInfo, dirInfo);
    }
    return dirInfo;
  }

  async listHostDirectory(
    params: {
      dir: string; // unix style dir with subdomain. ex) subdomain/folder/subfolder
    },
    fetchMore: boolean = false
  ): Promise<{
    [key: string]: any;
    list: {
      name: string; // file name file.txt | #folder
      path: string; // file path ex) subdomain/folder/subfolder
      size: number;
      upl: number;
      cnt: number;
    }[];
  }> {
    let _subd = this.service.subdomain;
    if (_subd[0] === '*' || _subd[0] === '+') {
      _subd = _subd.slice(1);
    }

    let dirList = await skapi.util.request(this.admin_private_endpoint + 'host-directory', Object.assign({ service: this.id, owner: this.owner }, params), {
      fetchOptions: {
        limit: 100,
        fetchMore: !!fetchMore,
        ascending: true,
      },
      method: 'post',
      auth: true,
    });
    // devLog({ dirList });
    return dirList;
  }

  //////////////////////////////////////////////////////////////////////////////
  static async create(params: { name: string }) {
    if (!params?.name) throw new Error('Invalid service name.');

    let endpoints = await Promise.all([skapi.admin_endpoint, skapi.record_endpoint]);
    let admin_private_endpoint = endpoints[0].admin_private; // https://.../
    let admin_public_endpoint = endpoints[0].admin_public; // https://.../
    let record_private_endpoint = endpoints[1].record_private; // https://.../

    let currentLocale = skapi.connection.locale;
    let serviceRegion = '';

    if (regions?.[currentLocale]) {
      serviceRegion = regions[currentLocale];
    } else {
      const calculateDistance = (locale: any, region: any) => {
        const R = 6371e3; // metres
        const φ1 = (locale.latitude * Math.PI) / 180; // φ, λ in radians
        const φ2 = (region.latitude * Math.PI) / 180;
        const Δφ = ((region.latitude - locale.latitude) * Math.PI) / 180;
        const Δλ = ((region.longitude - locale.longitude) * Math.PI) / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres

        return d;
      };

      let difference = null;
      for (let region in regions) {
        let distance = calculateDistance(Countries[currentLocale], Countries[region]);
        if (difference == null || distance < difference) {
          difference = distance;
          serviceRegion = regions[region];
        }
      }
    }

    let service = await skapi.util.request(
      admin_private_endpoint + 'register-service',
      Object.assign(params, { service: skapi.service, owner: skapi.owner, execute: 'create', region: serviceRegion }),
      { auth: true }
    );
    return new Service(service.service, service, [admin_private_endpoint, record_private_endpoint, admin_public_endpoint]);
  }

  async refresh() {
    let service = await skapi.util.request(
      this.admin_private_endpoint + 'get-services',
      { service: skapi.service, owner: skapi.owner, service_id: this.id, bypass_cached_service: true },
      { auth: true }
    );
    for (let region in service) {
      if (service[region][0]) {
        this.service = reactive(service[region][0]);
        break;
      }
    }

    let pendingStat = this.service.subdomain[0] === '+' ? 'transit' : this.service.subdomain[0] === '*' ? 'removing' : false;
    this.pending.subdomain = pendingStat;

    if (this.service?.subdomain) {
      this.getSubdomainInfo(true);
    }

    this._subsPromise = this.getSubscription();
    this.getStorageInfo();
    if (service.group > 1) {
      this.requestNewsletterSender({ group_numb: 0 });
      this.requestNewsletterSender({ group_numb: 1 });
    }

    return this.service;
  }

  static async load(id: string): Promise<Service> {
    if (!id) throw new Error('Invalid service id.');

    let endpoints = await Promise.all([skapi.admin_endpoint, skapi.record_endpoint]);
    let admin_private_endpoint = endpoints[0].admin_private; // https://.../
    let admin_public_endpoint = endpoints[0].admin_public; // https://.../
    let record_private_endpoint = endpoints[1].record_private; // https://.../

    if (typeof id === 'string') {
      let service = await skapi.util.request(
        admin_private_endpoint + 'get-services',
        { service: skapi.service, owner: skapi.owner, service_id: id, bypass_cached_service: true },
        { auth: true }
      );
      for (let region in service) {
        if (service[region][0]) {
          let serviceClass = new Service(id, service[region][0], [admin_private_endpoint, record_private_endpoint, admin_public_endpoint]);
          await serviceClass._subsPromise;
          return serviceClass;
        }
      }
    }
  }
}
